---
title: Relationship Briefing Agent
description: One person's whole history — timeline, graph, and a think answer.
---

# Relationship briefing agent

**Flows in:** mail, texts, voicemail — the channels this person actually uses.
**You call:**

```bash
curl -s "$VOE/v1/entities/people%2Famara-obi/timeline" -H "Authorization: Bearer $TOKEN"
curl -s -N -X POST "$VOE/v1/think" -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"Where do things stand with Amara Obi? Anything owed either way?"}'
```

**The agent sees:** the timeline (every connected page in time order) and think's cited synthesis over the same record.

**The user can inspect:** citations per sentence; the sender's tier on each source (a `verified` contact reads differently than an `unknown`).

**Gaps surfaced:** a thread whose earlier message was never forwarded in shows up as a missing-thread gap — the brief says "a reply references mail the memory never received" instead of guessing.
