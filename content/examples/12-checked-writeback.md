---
title: Checked Agent Writeback
description: Generation and record are different trust domains - an agent writes only under checked authority.
---

# Checked agent writeback

**The lesson:** generation and record are different trust domains. An agent may write into memory, but only through a checked path - authority, evidence, preconditions, current state - so what a model produced never becomes record merely because it wrote it.

[Checked writes](/concepts/checked-writes) is the model; this is the working shape of it, end to end.

**Flows in:** meetings and mail; the agent synthesizes notes.

**Setup once:** connect the assistant, then grant narrow authority:

```bash
curl -s -X POST "$VOE/v1/write-grants" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"principal":"agent:notes-writer","pageTypes":["note"],"prefixes":["notes/meetings/"],"tier":"known","mode":"both","expiresInSeconds":86400}'
```

**The path a write takes:** agent conclusion to write request to the checks (identity, grant, evidence, precondition, current state) to an authority decision to admitted or rejected. `create_page` files under `notes/meetings/…`; `patch_page` carries the current body hash, and a stale hash means someone else edited, so re-fetch and re-derive. A secret-bearing draft is rejected before it lands.

**What the record shows:** the note page, its provenance naming the agent, and the authority decision that admitted it. Nothing enters unattributed.

**When authority lapses:** the agent keeps reading; writes stop with "write authority has ended." Re-granting is a human act.

The record's integrity never depends on which model is writing. That is exactly why an agent can be trusted to write into it at all.
