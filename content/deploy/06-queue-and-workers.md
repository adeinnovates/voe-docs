---
title: Queue And Workers
description: Jobs, the outbox, and the inbound mail sidecar.
---

# Queue and workers

## Jobs

Background work covers attachment extraction, calendar sync, enrichment, and voice transcription. Jobs are workspace-scoped, failures are recorded, and attachment reading exposes an explicit user-facing retry.

## The outbox

Events such as page creation and held-source review are dispatched to webhook subscriptions only after the underlying change commits. A subscriber never learns of a change that rolled back, and a committed change remains replayable if delivery fails.

## The inbound mail sidecar

Inbound SMTP lands in an encrypted local queue (`VOE_MAIL_SIDECAR_QUEUE_KEY`) between the receiver and the capture pipeline. Mail survives a pipeline restart without living in plaintext spool files.

## Observing it

The doctor (`/healthz` checks) covers outbox lag, dead letters, calendar feed failures, and worker health. Worker failures are visible states, not silent stalls.
