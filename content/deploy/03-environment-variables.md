---
title: Environment Variables
description: The variables a cell reads, grouped by what they configure.
---

# Environment variables

## Identity and URLs

| Variable | Purpose |
|---|---|
| `VOE_PUBLIC_BASE_URL` | The cell's public origin — links, setup URLs |
| `VOE_INBOUND_EMAIL_DOMAIN` | The domain provisioned addresses live under |
| `VOE_MCP_HTTP_URL` | Published to clients via `/v1/config` (e.g. `https://mcp.your-voe-cell.example/`) |

## Database

`DATABASE_URL`-style pairs for the two roles: the migrator (owns tables, applies migrations) and the app role (row-level security applies). The app role's password is managed by the migrator at boot — never stored in a migration.

## Capture

| Variable | Purpose |
|---|---|
| `VOE_MAIL_SIDECAR_QUEUE_KEY` | 32-byte key (hex/base64) for the mail queue — **required in production** |
| Twilio credentials | Number provisioning and webhook validation, if telephony is on |

## Models

`ANTHROPIC_API_KEY` for the platform default; per-workspace provider config (Anthropic, OpenAI, OpenAI-compatible base URLs) is stored encrypted and overrides it.

## Operator access

| Variable | Purpose |
|---|---|
| `VOE_OPERATOR_SECRET` / `VOE_OPERATOR_TOTP_SECRET` | Bootstrap operator factors (named principals with per-principal credentials supersede them) |
| `VOE_OPERATOR_SESSION_TTL_SECONDS` | Session length, default 900 |
| `VOE_SETUP_INVITE_EXPIRES_HOURS` | Setup-link life, default 72 |

## Postgres tuning

`POSTGRES_SHARED_BUFFERS`, `POSTGRES_MAX_CONNECTIONS`, `POSTGRES_WORK_MEM`, `POSTGRES_MAINTENANCE_WORK_MEM`, `POSTGRES_MAX_LOCKS_PER_TRANSACTION` (default 4096 — sized for the per-workspace partitioned chunks table), `POSTGRES_ARCHIVE_TIMEOUT`.
