---
title: Capture
description: The ways information enters Voe — email, SMS, voice, calendar feeds, and app capture.
---

# Capture

Information enters Voe through **addressed** or **deliberately subscribed** sources. Nothing is scraped, polled from a mailbox, or fetched with a stored login.

| Channel | How it arrives |
|---|---|
| Email | The user forwards mail to a provisioned Voe address (`name@in.yourdomain`), or senders write to it directly |
| SMS | A provisioned number receives texts |
| Voice | The same number takes calls; a missed call becomes a stub, a voicemail becomes a transcript page that supersedes it |
| Calendar | A private read-only ICS/iCal URL, synced on a schedule and on demand |
| App capture | `POST /ingest` with markdown, or the MCP `capture` tool — for events, notes, incidents, tool output |

## What capture guarantees

1. **Raw first.** The original bytes are stored and fsynced before any parsing. If everything downstream burned down, the evidence survives.
2. **Mechanical extraction before models.** Parsing is deterministic where possible. When a message is too mangled to read mechanically, a bounded repair lane may use a model — and its output is verified against the original before it can land.
3. **Suspicion is held, not filtered.** A lookalike sender domain or a failed policy puts the message in review, visibly, instead of silently dropping or silently admitting it.

## What capture never does

Capture never sends. There are no read receipts, no auto-replies, no bounces authored by Voe. A workspace address is a place mail arrives, not an account that acts.

Next: [The Record](/concepts/the-record) · guides for [email](/guides/route-email-into-voe), [SMS and voice](/guides/add-sms-and-voice), [calendar feeds](/guides/subscribe-a-calendar-feed), [app events](/guides/capture-app-events)
