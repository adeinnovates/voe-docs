---
title: Database And Migrations
description: Database roles, migration safety, and rebuild checks.
---

# Database and migrations

## Two roles

- **`voe_migrator`** applies schema changes and is never used by request paths.
- **`voe_app`** serves requests. It owns no tenant data, and every read and write is scoped to the caller's workspace grants. Internal workers act through a real `service` grant, not a bypass.

## Migrations

Numbered SQL files are applied in order and checked before reuse. An applied file is immutable: editing one is an error, not a re-run. The migrator runs at every boot and is idempotent.

Large repair work runs in recorded steps, so a crash resumes cleanly.

## The standing reconcile

Every migrate run also checks derived database shape and repairs known drift. Between deploys, repairable drift surfaces through `/healthz` as attention: visible, never silent.

## Rebuildability

The index is derived. `reindex` rebuilds the query surfaces from the file record and reports disagreement; the recovery path is also the audit.
