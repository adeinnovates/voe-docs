---
title: The Record
description: Original bytes first; pages, edges, chunks, attachments, and gaps are built from them.
---

# The record

The record is what Voe holds, in three strictly ordered layers. Each layer can be rebuilt from the one before it; nothing above the raw layer is load-bearing for truth.

## 1. Raw

Every captured item's original bytes land in a content-addressed store (`sha256`), fsynced at write. Attachments are stored the same way. This layer is append-only in spirit: redaction is an explicit, recorded act, never a side effect.

## 2. Pages

From the raw material Voe writes **pages** — plain markdown files with frontmatter, one per captured message, event, voicemail, or note, in a per-workspace git repository. Frontmatter carries provenance: the `raw_ref` pointing back at the bytes, sender identity, extraction method and confidence. Wikilinks in page bodies become graph edges.

The files are canonical. You can read the whole memory with `cat`.

## 3. Index

Postgres holds what queries need: page rows, **edges** (the graph), **chunks** (embedded and keyword-indexed passages, partitioned per workspace), **gaps**, and review state. The index is fully derived: `reindex` rebuilds it from the files and reports `driftDetected` if the result disagrees with what was there — the record audits its own index.

## Why this shape

- **Citations resolve.** A citation points at a page; a page points at raw bytes. There is no answer whose provenance dead-ends in a database row.
- **Rebuildable means recoverable.** Losing the index loses nothing. Losing the files still leaves the raw material to replay.
- **Plain files mean no lock-in.** The memory is legible without Voe.

Next: [Evidence](/concepts/evidence) · [Gaps](/concepts/gaps)
