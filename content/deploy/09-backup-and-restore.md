---
title: Backup And Restore
description: What to back up, and the two recovery paths.
---

# Backup and restore

## What to back up

1. **`/data`** - raw store, page record, and recovery archive. This is the evidence and the record.
2. **Postgres** - base backups plus the archived recovery stream for point-in-time recovery.

The CLI's backup command packages both consistently.

## Two recovery paths

- **Database lost, files intact:** restore Postgres to the nearest point, then `reindex`. The index rebuilds from the files and reports drift. Worst case with no database at all: replay from raw material; the record is designed to be reproducible.
- **Full restore:** `/data` snapshot + PITR to a chosen moment.

## Recovery guarantee

The layering is the promise: raw bytes are the source, files are the record, the index is derived. Every layer above raw can be rebuilt from below, and the rebuild reports disagreement. Scheduled restore rehearsals prove that a backup can actually restore.
