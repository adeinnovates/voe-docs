---
title: Voicemail-Aware Support Triage
description: Calls and texts triaged with transcripts as labeled derived evidence.
---

# Voicemail-aware support triage

**Flows in:** a provisioned support number - texts, missed calls, voicemails with transcripts.

**You call:**

```bash
curl -s "$VOE/v1/search?q=outage+refund&includeDerived=true&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

`includeDerived=true` matters: transcripts are derived-grade and excluded by default.

**The agent sees:** voicemail hits with `grade: "derived"` and a `recordingHash` in proof; missed-call stubs superseded once a voicemail lands (exactly one page per call).

**The user can inspect:** the transcript and the recording hash - the reading and the proof of what was read.

**Gaps surfaced:** a transcription still in progress appears as an unreadable-attachment gap rather than a silent hole in the queue. Triage decisions your agent makes can be captured back as app events for the next reader.
