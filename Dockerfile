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

# Health check — a REAL, passing probe (not omitted, not a comment).
# Two things this gets right, both learned the hard way:
#  1. IPv4, not `localhost`. The server binds IPv4 (HOST=0.0.0.0); inside the
#     container `localhost` resolves to the IPv6 loopback [::1], where nothing
#     listens, so a `localhost` probe gets "connection refused". Hit 127.0.0.1.
#  2. It must actually exist and pass. A container with no HEALTHCHECK has no
#     `.State.Health`, and Coolify's post-deploy `docker inspect
#     '{{.State.Health.Status}}'` then fails with "map has no entry for key
#     Health" and rolls the deploy back. (Merely *commenting out* the directive
#     didn't help — Coolify greps the Dockerfile for the word HEALTHCHECK and
#     tried to read a status that wasn't there.) A real, green probe gives it a
#     status to read.
# /_health is auth-exempt and answers in <5ms. Uses GET (-O /dev/null) rather
# than --spider so a HEAD-averse route still returns 200.
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/_health || exit 1

# Start the application
CMD ["node", ".output/server/index.mjs"]
