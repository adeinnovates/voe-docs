---
title: Checked Writeback Workflow
description: An agent that files meeting notes — under authority, with preconditions.
---

# Checked writeback workflow

**Flows in:** meetings and mail; the agent synthesizes notes.

**Setup once:** connect the assistant, then grant narrow authority:

```bash
curl -s -X POST "$VOE/v1/write-grants" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"principal":"agent:notes-writer","pageTypes":["note"],"prefixes":["notes/meetings/"],"tier":"known","mode":"both","expiresInSeconds":86400}'
```

**The loop:** the agent builds context, drafts, then `create_page` under `notes/meetings/…`; amendments go through `patch_page` with the current body hash — a stale hash means someone else edited, so re-fetch and re-derive.

**What the record shows:** the note page, its provenance naming the agent, and the authority decision that admitted it. Secret-bearing drafts are rejected before landing.

**When authority lapses:** the agent keeps reading; writes stop with "write authority has ended." Re-granting is a human act — which is the point: the record's integrity never depends on which model is writing.
