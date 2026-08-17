---
title: Meeting Prep Agent
description: Calendar feed + mail in, a cited brief out before every meeting.
---

# Meeting prep agent

**Flows in:** the user's calendar feed and forwarded mail.
**You call:** upcoming events from search, then one `context` bundle per meeting.

```bash
curl -s "$VOE/v1/context?entities=people/amara-obi&query=meridian+terms+open+items&tokens=3000" \
  -H "Authorization: Bearer $TOKEN"
```

Your model turns sections into a brief: who's in the room, the thread so far, open commitments - every line traceable to a section citation.

**The agent sees:** entity pages first, then timeline highlights, then the freshest matching messages - with grades, so a voicemail transcript reads as derived.

**The user can inspect:** each brief line's citation resolves to the page and onward to the original mail or recording hash.

**Gaps surfaced:** an unreadable attachment on the key thread appears by filename; a stale counterpart page is named. Render both under the brief - "prepared from what the memory holds; here is what it lacks."
