---
title: The Record
description: Original bytes first; pages, relationships, searchable passages, attachments, and gaps are built from them.
---

# The record

The record is what Voe holds, in three strictly ordered layers. Each layer can be rebuilt from the one before it; nothing above the raw layer carries the truth.

## 1. Raw

Every captured item's original bytes land in durable storage under a content hash. Attachments are stored the same way. This layer is append-only in spirit: redaction is an explicit, recorded act, never a side effect.

## 2. Pages

From the raw material Voe writes **pages**: plain markdown files, one per captured message, event, voicemail, or note. Page metadata carries provenance: the `raw_ref` pointing back at the bytes, sender identity, extraction method, and confidence. Links in page bodies become relationships.

The files are canonical. The memory stays legible outside the application.

## 3. Index

The database holds what queries need: page rows, relationships, searchable passages, gaps, and review state. The index is fully derived: it can be rebuilt from the files, and the rebuild reports if the index no longer matches the record.

## Why this shape

- **Citations resolve.** A citation points at a page; a page points at raw bytes. There is no answer whose provenance dead-ends in a database row.
- **Rebuildable means recoverable.** Losing the index loses nothing. Losing the files still leaves the raw material to replay.
- **Plain files mean no lock-in.** The memory is legible without Voe.

Next: [Evidence](/concepts/evidence) · [Gaps](/concepts/gaps)
