---
title: Observability
description: Health states, traceability, and structured logs.
---

# Observability

## `/healthz`

Three states, honestly separated:

- `ok` - everything passes.
- `attention` - a **person** is owed a decision, or a repairable condition needs review. HTTP 200; nothing is broken.
- `degraded` - the cell cannot serve one or more required duties. HTTP 503.

Checks cover serving readiness, workspace access, capture health, source review load, delivery lag, and storage headroom without exposing workspace content.

## `/metrics`

Deployment metrics expose health and throughput counters for authorized monitoring. They never include captured content.

## Trace one message

`GET /v1/trace/:ref` reconstructs a captured item's journey through the cell. Use it when a user asks where a captured item went.

## Logs

Structured JSON throughout, request-scoped, with refusals logged as the rules they enforced. Administrative changes are recorded.
