---
title: Calendar-Aware Briefing Agent
description: A morning brief grounded in events the memory actually holds.
---

# Calendar-aware briefing agent

**Flows in:** a private read-only calendar feed, synced on schedule; mail for the people involved.

**You call:** `search` scoped to event pages for today's window, then `think`:

```bash
curl -s -N -X POST "$VOE/v1/think" -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"Brief me for today: meetings, who is involved, anything unresolved with them."}'
```

**The agent sees:** captured events (calendar-sourced pages are "captured", distinct from mail "heard") joined by the graph to the people and threads around them.

**The user can inspect:** each brief item cites the event page and the correspondence behind the "unresolved" claims.

**Gaps surfaced:** if the feed has gone unreachable, the feed row says so and briefs degrade visibly — never silently stale. Voe never writes to the calendar; scheduling actions belong to tools you connect.
