---
title: Attachments
description: Stored, reading, readable, failed, held - plus preview, download, retry, and derived text.
---

# Attachments

Attachments arrive with messages and follow the same raw-first rule: bytes stored and hashed before anything reads them.

## States

| State | Meaning |
|---|---|
| stored / pending | Bytes kept; not yet queued for reading |
| reading / queued | Extraction in progress |
| readable | Text extracted and indexed for search |
| failed reading | Extraction errored - retry available |
| not readable | Format unsupported by extraction |
| held | The parent message is in review; the attachment waits with it |

## Derived text

Document text, OCR, and transcripts are **derived-grade**: they enter the index marked `derived`, excluded from retrieval unless `includeDerived=true`, and always labeled in evidence. The original file remains the proof; the derived text is a reading of it.

A readable attachment is **its own evidence source**: it surfaces as its own search hit and its own context section, cited by attachment - not flattened into its parent email's snippet.

## Operations

- `GET /v1/attachments` - list with states per page.
- `GET /v1/attachments/:id/raw` - the original bytes, workspace-scoped, for preview or download.
- `POST /v1/attachments/:id/retry` - requeue a failed extraction.

Unreadable attachments that are relevant to a question appear in the [gap report](/concepts/gaps) by name and state, so an answer never silently ignores a document it could not read.

Guide: [Handle attachments](/guides/handle-attachments)
