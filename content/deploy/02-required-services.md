---
title: Required Services
description: What runs inside the container, and the two external dependencies.
---

# Required services

## Inside the container (supervised)

| Service | Job |
|---|---|
| Postgres 16 + pgvector | Index, grants, review state, and workspace-scoped search |
| API server | HTTP surface + dashboard + SSE |
| MCP stdio/HTTP servers | Assistant transports |
| SMTP receiver | Inbound mail on port 25 |
| Mail sidecar | Encrypted queue between receiver and pipeline (`VOE_MAIL_SIDECAR_QUEUE_KEY` required in production) |
| Job workers | Attachment extraction, calendar sync, enrichment, outbox dispatch |
| Migrator | Runs migrations to completion at boot, then exits |

## External dependencies

- **Twilio** — only if numbers/SMS/voice are enabled: webhook delivery for inbound messages, calls, and recordings.
- **A model provider** — only for `think`, repair, and enrichment. Search, context, capture, and the dashboard run without one. Anthropic by default; per-workspace bring-your-own-key is supported.

Nothing else: no Redis, no object store, no external queue. The filesystem and Postgres carry the state.
