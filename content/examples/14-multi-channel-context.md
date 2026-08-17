---
title: Multi-Channel Context Assembly
description: Records from mail, voice, calendar, and app events become one bounded, cited context.
---

# Multi-channel context assembly

**The lesson:** the model does not want a channel; it wants one bounded, cited context. Mail, voicemail, calendar events, and your app's own events become a single bundle packed to a token budget, provenance intact.

**Flows in:** a calendar feed, forwarded mail, a voicemail transcript, and application events - four channels, one entity.

**You call:** one `context` bundle per subject:

```bash
curl -s "$VOE/v1/context?entities=people/amara-obi,companies/meridian&query=meridian+open+items&tokens=3000" \
  -H "Authorization: Bearer $TOKEN"
```

**What the bundle holds, in order:** entity pages first, then timeline highlights, then the freshest matching messages - each with its grade, so a voicemail transcript reads as derived and a calendar event reads as captured, not heard. The bundle is packed to your token budget and drops what will not fit rather than truncating mid-claim.

**The user can inspect:** every section's citation resolves to its page, and onward to the original mail or recording hash.

**The gap rides along:** an unreadable attachment or a stale entity is named in the bundle, so the model reasons over an honest limit instead of a silent one.

The work you are not doing here is the assembling: four channels, one context, every claim still able to name where it came from. That last part is what makes it safe to hand a model.
