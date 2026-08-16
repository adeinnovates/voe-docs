---
title: Observability
description: healthz semantics, operator metrics, tracing one message, structured logs.
---

# Observability

## `/healthz`

Three states, honestly separated:

- `ok` — everything passes.
- `attention` — a **person** is owed a decision (held mail, partition strays). HTTP 200; nothing is broken.
- `degraded` — a real fault (database unreachable, RLS self-test failing, raw store unwritable). HTTP 503.

Checks include: DB reachability, an RLS self-test (an ungranted principal must read zero rows), raw-store writability, embedding-dimension declaration, disk headroom, outbox lag and dead letters, calendar feed failures, parser calibration drift, lookalike queue depth, partition strays.

## `/metrics`

Cross-workspace platform numbers (workspaces, pages, ingest rates), gated by an operator session — Prometheus text or JSON by `Accept`.

## Trace one message

`GET /v1/trace/:ref` reconstructs a captured item's journey — raw ref, page, chunks, edges, outbox events, jobs — the first tool to reach for when "where did my email go" comes up.

## Logs

Structured JSON throughout, request-scoped, with refusals logged as the rules they enforced. The operator audit trail records every operator mutation, signed.
