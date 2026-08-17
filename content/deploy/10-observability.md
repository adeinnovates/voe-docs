---
title: Observability
description: Health states, operator metrics, traceability, and structured logs.
---

# Observability

## `/healthz`

Three states, honestly separated:

- `ok` - everything passes.
- `attention` - a **person** is owed a decision, or a repairable condition needs review. HTTP 200; nothing is broken.
- `degraded` - a real fault (database unreachable, access-control self-test failing, raw store unwritable). HTTP 503.

Checks include: DB reachability, a workspace-access self-test, raw-store writability, disk headroom, outbox lag and dead letters, calendar feed failures, held-source queue depth, and derived-index health.

## `/metrics`

Cross-workspace platform numbers (workspaces, pages, ingest rates), gated by an operator session - Prometheus text or JSON by `Accept`.

## Trace one message

`GET /v1/trace/:ref` reconstructs a captured item's journey across raw material, record, index, events, and jobs. Use it when a user asks where a captured item went.

## Logs

Structured JSON throughout, request-scoped, with refusals logged as the rules they enforced. The operator audit trail records every operator mutation, signed.
