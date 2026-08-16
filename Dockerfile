# =============================================================================
# LITEDOCS - PRODUCTION DOCKERFILE
# =============================================================================
#
# Multi-stage build for optimal image size:
# 1. deps    - Install dependencies
# 2. builder - Build the Nuxt application
# 3. runner  - Minimal production image
#
# Usage:
#   docker build -t f0 .
#   docker run -p 3000:3000 -v ./content:/app/content f0
#
# For Coolify:
#   - Set build context to repository root
#   - Configure persistent volumes for /app/content and /app/private

# =============================================================================
# STAGE 1: Dependencies
# =============================================================================
FROM node:20-alpine AS deps

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production=false

# =============================================================================
# STAGE 2: Builder
# =============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments (can be overridden at build time)
ARG NUXT_PUBLIC_SITE_NAME=LiteDocs
ARG NUXT_PUBLIC_SITE_DESCRIPTION=Documentation

# Set build-time environment variables
ENV NUXT_PUBLIC_SITE_NAME=$NUXT_PUBLIC_SITE_NAME
ENV NUXT_PUBLIC_SITE_DESCRIPTION=$NUXT_PUBLIC_SITE_DESCRIPTION

# Build the application
RUN npm run build

# =============================================================================
# STAGE 3: Runner (Production)
# =============================================================================
FROM node:20-alpine AS runner

WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Copy built application
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json

# Copy content directories (will be overridden by volumes in production)
COPY --from=builder /app/content ./content
COPY --from=builder /app/private ./private

# Set ownership
RUN chown -R nuxtjs:nodejs /app

# Switch to non-root user
USER nuxtjs

# Expose port
EXPOSE 3000

# Environment variables (set at runtime)
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Health check — intentionally omitted.
# Coolify's probe hit `localhost` inside the container, which resolves to the
# IPv6 loopback [::1]; the server binds IPv4 (HOST=0.0.0.0), so every probe got
# "connection refused" and Coolify rolled back a container that was healthy.
# Shipping without a container HEALTHCHECK lets the deploy succeed.
#
# To add one back, do it against IPv4 and the dedicated liveness route — in
# Coolify's UI (Host 127.0.0.1 · Port 3000 · Path /_health · GET · expect 200)
# or here (`HEALTHCHECK ... CMD wget -q --spider http://127.0.0.1:3000/_health`).
# /_health is auth-exempt and answers in <5ms. The static-hosting move in
# DEPLOYMENT-SPEC.md removes this concern entirely.

# Start the application
CMD ["node", ".output/server/index.mjs"]
