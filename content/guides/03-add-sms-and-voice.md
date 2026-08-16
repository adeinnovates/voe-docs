---
title: Add SMS And Voice
description: Number regions, SMS capture, missed calls, voicemail.
---

# Add SMS and voice

**For:** texts and voicemail in the same memory as mail. **Scope:** `admin` to provision numbers.

## Provision a number

```bash
curl -s "$VOE/v1/number-regions" -H "Authorization: Bearer $TOKEN"   # what's available where

curl -s -X POST "$VOE/v1/addresses" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"kind":"phone","country":"US","areaCode":"604"}'
```

Availability is regional; `number-regions` is the truth for your cell. The number receives — Voe never texts or calls out.

## What capture looks like

- **SMS** → a message page per text, sender identity resolved like email.
- **Missed call** → a stub page recording that someone called.
- **Voicemail** → the recording is stored raw (hash kept as proof), transcribed as **derived-grade** text, and the voicemail page supersedes the missed-call stub for that call — exactly one page survives per call.

## Test it

Text the number; call it and leave a voicemail. Within moments: `GET /v1/search?q=<something you said>&includeDerived=true` — the transcript is derived, so it needs the flag; the recording hash rides the evidence.

:::warning
Transcripts are readings of the recording, not the recording. They enter retrieval only with `includeDerived=true` and always carry the `derived` grade in evidence.
:::

**Next:** [Subscribe a calendar feed](/guides/subscribe-a-calendar-feed)
