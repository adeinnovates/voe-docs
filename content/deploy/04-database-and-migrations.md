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

Heavy reconcile work runs **outside** the single migration transaction, in short recorded steps — so a crash resumes instead of wedging.

## The standing reconcile

Every migrate run also checks derived database shape and repairs known drift. Between deploys, repairable drift surfaces through `/healthz` as attention — visible, never silent.

## Rebuildability

The index is derived. `reindex` rebuilds pages, edges, and searchable passages from the file record and reports disagreement — the recovery path is also the audit.
