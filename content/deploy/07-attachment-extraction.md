---
title: Attachment Extraction
description: The reading pipeline — document text, OCR, transcripts, and its failure modes.
---

# Attachment extraction

Attachments are read out-of-band by workers, never inline with capture:

1. Capture stores the bytes and records the attachment as **stored**.
2. A job queues it: **reading**.
3. The extractor produces text — document parsing for PDFs and office formats, OCR for images, transcription for audio — all marked **derived** grade.
4. The text is embedded and indexed under the attachment's own citation: **readable**.

## Failure modes

| State | Cause | Recovery |
|---|---|---|
| failed reading | Extractor error | `POST /v1/attachments/:id/retry` or the dashboard's retry |
| not readable | Unsupported format | The original stays available raw; the gap report names it |
| held | Parent message in review | Resolves with the review decision |

## Limits

Extraction output is capped per attachment; oversized results fail explicitly rather than flooding the index. Transcription draws on the account's repair budget.
