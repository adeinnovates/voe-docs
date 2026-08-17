---
title: Temporal "What Changed?"
description: Chronology, supersession, and current-state reconstruction - memory is not document retrieval.
---

# Temporal "what changed?"

**The lesson:** useful memory is not document retrieval. When a fact changes across channels over time, the memory reconstructs the current state and keeps the old one as prior, so "what changed" has an answer.

**Flows in:** a sequence that moves - a Northbank close date proposed in mail, revised in a voicemail, confirmed in a document, moved again on the calendar.

**You call:** `POST /v1/think`, or `context` if you narrate yourself:

```bash
curl -s -N -X POST "$VOE/v1/think" -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"What changed with the Northbank close, and what is still unresolved?"}'
```

**What the answer shows:**

- **Current state, reconstructed.** The close date now reads the 20th, not the 12th. The latest evidence wins, and the answer says which evidence.
- **The prior, still there.** Each superseded value is kept and marked as prior, one tap away, because "what changed" needs both halves.
- **Multi-channel evidence.** The date's history spans mail, a transcript (derived), a document, and the calendar - one timeline, each step cited.
- **The gap.** If the confirming signature was never captured, the answer says the date moved but the acceptance is unconfirmed.

**The user can inspect:** the current value, its evidence, and every prior value behind it.

A pile of documents can tell you what was said. Only a memory that orders them can tell you what is true now, and admit the one step it never received.
