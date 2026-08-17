---
title: Statements
description: A monthly account of a workspace's memory - live while the month is open, immutable once it seals.
---

# Statements

A statement is a bank statement for a workspace's memory: a plain monthly account of what the memory did, where every number opens to its evidence like everything else.

## Live, then sealed

The current month runs live and reconciles against the record as it fills. When the month ends it seals: it becomes immutable and joins the archive, a record in its own right. A sealed statement is the kind of thing a renewal answer, an owner's monthly account, or a diligence exhibit is made of, so it does not get to change after the fact.

Two reads, both `read` scope:

- `GET /v1/statements/current` returns the open month, computed live (`sealed: false`).
- `GET /v1/statements/sealed` returns every sealed month, immutable (`sealed: true`, with `sealedAt`).

## What a month counts

Each statement names the human unit, never the system unit, and keeps two kinds of activity distinct because they are different claims:

- **Heard** - messages a sender actually sent into the workspace.
- **Captured** - things authored or subscribed rather than sent: calendar events, notes captured directly.
- **Questions answered** - reads that produced a cited answer.
- **Commitments surfaced** - a derived count. These are interpretation, not record-grade fact, and the statement counts them honestly as such rather than promoting them.
- **Gaps opened and closed** - what the memory admitted it was missing this month, and what evidence later resolved.

Every figure reconciles against the record, and every figure opens to the evidence beneath it. A number that cannot show its receipts does not appear.

## Pull-only

Voe never sends a statement to anyone. It is there to be read - by an owner, an admin over their org's workspaces, or your application on the `read` scope - and nothing about a statement notifies, mails, or nudges. As with the rest of Voe, the memory reports; acting on the report is your product's to do.
