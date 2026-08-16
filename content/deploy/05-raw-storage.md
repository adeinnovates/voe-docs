---
title: Raw Storage
description: The /data volume — content-addressed bytes, page repositories, WAL archive.
---

# Raw storage

Everything durable outside Postgres lives on the `/data` volume:

| Path | Holds |
|---|---|
| `/data/raw/<2-char>/<sha256>` | Original bytes of every captured item and attachment, content-addressed, fsynced at write |
| `/data/repos/<workspace>/` | The page record: plain markdown files in a git repository per workspace |
| `/data/wal-archive/` | Postgres WAL segments for point-in-time recovery |

## Properties to preserve

- **Raw first.** The pipeline stores bytes before parsing; a crash after the raw write loses nothing that arrived.
- **Content addressing** deduplicates and makes every hash in evidence directly resolvable to a file.
- **Snapshot-friendly.** A filesystem snapshot of `/data` plus the WAL archive is a consistent recovery basis — see [Backup and restore](/deploy/backup-and-restore).

Size for raw mail plus attachments plus recordings; the plan's storage quota gates intake per account, and a full quota queues honestly rather than deleting — nothing here ever deletes on its own.
