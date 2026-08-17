/**
 * =============================================================================
 * F0 - GITHUB WEBHOOK HANDLER
 * =============================================================================
 * 
 * POST /api/webhook
 * 
 * Handles GitHub webhook events for content updates. When content is pushed
 * to the repository, this endpoint:
 * 1. Validates the webhook signature
 * 2. Invalidates the navigation cache
 * 3. Optionally triggers a git pull (if configured)
 * 
 * SETUP:
 * 1. In GitHub repo settings, add webhook:
 *    - URL: https://your-domain.com/api/webhook
 *    - Content type: application/json
 *    - Secret: (set GITHUB_WEBHOOK_SECRET env var)
 *    - Events: Push events
 * 
 * SECURITY:
 * - Validates X-Hub-Signature-256 header
 * - Only processes push events
 * - Logs all webhook attempts
 */

import { createHmac, timingSafeEqual } from 'crypto'
import { invalidateNavigationCache } from '../utils/navigation'
import { invalidateContentCache } from '../utils/cache'
import { invalidateConfigCache } from '../utils/config'
import { invalidateLlmsCache } from '../utils/llms-cache'
import { invalidateBrandCache } from '../utils/brand'
import { logger } from '../utils/logger'

// =============================================================================
// SIGNATURE VERIFICATION
// =============================================================================

/**
 * Verify GitHub webhook signature
 * Uses HMAC SHA-256 with timing-safe comparison
 */
function verifySignature(
  payload: string,
  signature: string | undefined,
  secret: string
): boolean {
  if (!signature || !secret) {
    return false
  }
  
  // GitHub sends signature as "sha256=<hash>"
  const parts = signature.split('=')
  if (parts.length !== 2 || parts[0] !== 'sha256') {
    return false
  }
  
  const expectedSignature = parts[1]
  const computedSignature = createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
  
  // Use timing-safe comparison to prevent timing attacks
  try {
    return timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(computedSignature)
    )
  } catch {
    return false
  }
}

// =============================================================================
// HANDLER
// =============================================================================

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // Get webhook secret from config
  const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET
  
  // Get GitHub headers
  const signature = getHeader(event, 'x-hub-signature-256')
  const githubEvent = getHeader(event, 'x-github-event')
  const deliveryId = getHeader(event, 'x-github-delivery')
  
  logger.info('Webhook received', { event: githubEvent, delivery: deliveryId })
  
  // Get raw body for signature verification
  const rawBody = await readRawBody(event)
  
  // Fail closed: without a configured secret we cannot authenticate the caller,
  // so we must reject rather than process an unauthenticated request. This
  // endpoint invalidates every content cache, so leaving it open would let
  // anyone trigger cache-busting.
  if (!webhookSecret) {
    logger.error('Webhook rejected: GITHUB_WEBHOOK_SECRET is not configured')
    throw createError({
      statusCode: 503,
      statusMessage: 'Service Unavailable',
      data: { message: 'Webhook is not configured' },
    })
  }

  // Verify signature
  if (!verifySignature(rawBody || '', signature, webhookSecret)) {
    logger.warn('Invalid webhook signature', { delivery: deliveryId })
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      data: { message: 'Invalid webhook signature' },
    })
  }

  // Parse body - reject malformed JSON with a 400 rather than an uncaught 500.
  let body: Record<string, unknown> & {
    ref?: string
    pusher?: { name?: string }
    head_commit?: { id?: string }
  }
  try {
    body = JSON.parse(rawBody || '{}')
  } catch {
    logger.warn('Webhook rejected: malformed JSON body', { delivery: deliveryId })
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: { message: 'Invalid JSON payload' },
    })
  }
  
  // Handle different event types
  switch (githubEvent) {
    case 'push':
      // Push event - content may have changed
      logger.info('Webhook push event', { ref: body.ref, pusher: body.pusher?.name })
      
      // Only process pushes to main/master branch
      const branch = body.ref?.replace('refs/heads/', '')
      if (branch === 'main' || branch === 'master') {
        // Invalidate all caches
        invalidateNavigationCache()
        invalidateContentCache()
        invalidateConfigCache()
        invalidateLlmsCache()
        invalidateBrandCache()
        
        logger.info('All caches invalidated via webhook')
        
        // Note: In a full implementation, you might:
        // 1. Run `git pull` to update content
        // 2. Trigger a rebuild if using static generation
        // 3. Notify connected clients via WebSocket
        
        return {
          success: true,
          message: 'Content cache invalidated',
          branch,
          commit: body.head_commit?.id,
        }
      }
      
      return {
        success: true,
        message: 'Ignored - not main branch',
        branch,
      }
    
    case 'ping':
      // GitHub sends ping when webhook is first set up
      logger.info('Webhook ping received')
      return {
        success: true,
        message: 'Pong! Webhook configured successfully.',
      }
    
    default:
      // Ignore other events
      logger.debug('Webhook event ignored', { event: githubEvent })
      return {
        success: true,
        message: `Event type '${githubEvent}' ignored`,
      }
  }
})
