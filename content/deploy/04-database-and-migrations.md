---
title: Database And Migrations
description: Two roles, immutable migration files, and the standing reconcile.
---

# Database and migrations

## Two roles

- **`voe_migrator`** owns every table and applies migrations. It bypasses row-level security — and is therefore never used by request paths.
- **`voe_app`** serves requests. It owns nothing, and RLS scopes every read and write to the caller's workspace grants. Internal workers act through a real `service` grant, not a bypass.

## Migrations

Numbered SQL files, applied in order, recorded with checksums. An applied file is immutable — editing one is a checksum error, not a re-run. The migrator runs at every boot and is idempotent.

Heavy per-workspace work (like the chunks partition backfill) runs **outside** the single migration transaction, one short transaction per workspace, recorded only when complete — so a crash resumes instead of wedging.

## The standing reconcile

Every migrate run also heals structural drift: any workspace whose chunk rows sit in the default partition gets its own partition created and its rows moved. Between deploys, strays surface as a `/healthz` warn — visible, never silent.

## Rebuildability

The index is derived. `reindex` rebuilds pages, edges, and chunks from the file record and reports drift if the result disagrees — the recovery path is also the audit.
