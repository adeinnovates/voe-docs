---
title: Backup And Restore
description: What to back up, and the two recovery paths.
---

# Backup and restore

## What to back up

1. **`/data`** — raw store, page repositories, WAL archive. This is the evidence and the record.
2. **Postgres** — base backups plus the archived WAL for point-in-time recovery (`archive_mode=on` ships enabled, segments land in `/data/wal-archive`).

The CLI's backup command packages both consistently; restore rehearsals should use it rather than ad-hoc copies.

## Two recovery paths

- **Database lost, files intact:** restore Postgres to the nearest point, then `reindex` — the index rebuilds from the files and reports drift. Worst case with no database at all: replay from raw material; the record is designed to be reproducible.
- **Full restore:** `/data` snapshot + PITR to a chosen moment.

## What makes this credible

The layering is the guarantee: raw bytes are the truth, files are the record, the index is derived. Every layer above raw can be rebuilt from below, and the rebuild audits itself (`driftDetected`). Test restores on a schedule; a backup that has never restored is a hope, not a backup.
