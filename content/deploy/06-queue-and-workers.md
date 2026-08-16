---
title: Queue And Workers
description: Jobs, the outbox, and the mail sidecar.
---

# Queue and workers

## Jobs

Background work — attachment extraction, calendar sync, enrichment, voice transcription — runs through a Postgres-backed job table: no external queue, at-least-once, per-workspace scoping. Failed jobs record their error and retry policy; attachment reading exposes an explicit user-facing retry.

## The outbox

Events (page created, quarantine held, and the rest) are written in the **same transaction** as the change they describe, then dispatched to webhook subscriptions. A subscriber never learns of a change that rolled back, and a committed change never fails to notify. Dead letters are kept and replayable.

## The mail sidecar

Inbound SMTP lands in an encrypted on-disk queue (`VOE_MAIL_SIDECAR_QUEUE_KEY`) between the receiver and the capture pipeline — mail survives a pipeline restart without living in plaintext spool files.

## Observing it

The doctor (`/healthz` checks) covers outbox lag, dead letters, calendar feed failures, and parser calibration drift. Worker failures are visible states, not silent stalls.
