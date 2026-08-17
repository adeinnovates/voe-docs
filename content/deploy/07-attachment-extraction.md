---
title: Attachment Extraction
description: Attachment reading states, readable text, and recovery.
---

# Attachment extraction

Attachments are read after capture, never inline with capture. The parent message can land while files move through their own states: **stored**, **reading**, **readable**, **failed reading**, or **not readable**.

Readable files can contribute derived-grade text to search, context, and think. A readable attachment is cited as itself, not as a hidden part of its parent email.

## Failure modes

| State | Cause | Recovery |
|---|---|---|
| failed reading | Extractor error | `POST /v1/attachments/:id/retry` or the dashboard's retry |
| not readable | Unsupported format | The original stays available raw; the gap report names it |
| held | Parent message in review | Resolves with the review decision |

## Limits

Extraction output is capped per attachment; oversized results fail explicitly rather than flooding search. Transcription availability follows the workspace's model settings.
