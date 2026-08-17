---
title: Customer Intelligence & Support
description: Support that remembers the customer across tickets, calls, voicemail, and account events.
---

# Customer intelligence and support

Support that remembers the customer across tickets, correspondence, calls, voicemail, and account events, so the person picking up the case is not starting cold.

## What you're building

A support product whose context is the customer's whole history with you, not just the ticket in front of the agent.

## The scenario

Northbank calls about an outage and leaves a voicemail. The same account had a similar incident in the spring, upgraded their plan in June, and was promised a follow-up review that no one has confirmed happened.

## What Voe remembers

The provisioned support number's texts, missed calls, and voicemails with transcripts; mail with the account; and your application's own account events. A transcript is kept as derived over the recording it came from, never mistaken for the customer's exact words.

## What the product can do

> **"Brief me on Northbank before I call back."**
>
> Current: an outage report, from this morning's voicemail `source ↗` (transcript, derived). Prior: a similar incident in March, resolved `source ↗`. The account upgraded in June `source ↗`.
>
> **WHAT I DON'T KNOW** - a follow-up review was promised in April `source ↗`; the record holds the promise, not a confirmation it was done.

The unresolved promise is the one that matters. A queue that surfaces it is doing the job a queue sorted by ticket age cannot.

## What Voe handles underneath

The customer's multi-channel history as one entity; capture across text, voice, and mail; a cited context bundle; evidence with grade, so the transcript reads as derived and carries its recording hash; and named gaps like the follow-up with no confirmation.

## What you own

The support assistant or agent, the ticketing workflow, prioritization and escalation, and any external action: replying, scheduling the review, closing the ticket. Voe holds what the account said and what was promised; acting on it is your product's.

## Build it

Transcripts are derived-grade and excluded by default, so ask for them explicitly:

```bash
curl -s "$VOE/v1/search?q=northbank+outage+refund&includeDerived=true&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

Voicemail hits come back with `grade: "derived"` and a `recordingHash` in their proof: the reading, and the proof of what was read. A missed call becomes a page even with no recording, superseded the moment a voicemail lands, so a call is one page and not two. Triage decisions your agent makes can go back in as app events for the next reader.

The gap between a promise made and a promise kept is where support quietly loses trust. A memory that keeps the two apart, and says which is which, is the reason to put one underneath.
