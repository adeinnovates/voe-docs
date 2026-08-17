---
title: Raw Storage
description: The /data volume, original bytes, page record, and recovery material.
---

# Raw storage

Everything durable outside the database lives on the `/data` volume:

| Path | Holds |
|---|---|
| Raw material | Original bytes of every captured item and attachment |
| Page record | Plain files for captured messages, events, voicemails, notes, and derived pages |
| Recovery material | Database recovery files used by backup and restore |

## Properties to preserve

- **Raw first.** The pipeline stores bytes before parsing; a crash after the raw write loses nothing that arrived.
- **Content-addressed evidence.** Evidence references resolve back to the original stored material.
- **Snapshot-friendly.** A filesystem snapshot of `/data` plus the recovery archive is a consistent recovery basis. See [Backup and restore](/deploy/backup-and-restore).

Size for raw mail plus attachments plus recordings; the plan's storage quota gates intake per account, and a full quota queues honestly rather than deleting - nothing here ever deletes on its own.
