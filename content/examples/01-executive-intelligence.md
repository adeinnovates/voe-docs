---
title: Executive Intelligence
description: A chief-of-staff product that walks into every meeting already caught up.
---

# Executive intelligence

A chief-of-staff or executive-intelligence product that walks into every meeting already caught up, because the catching-up happened on its own.

## What you're building

A product that briefs a founder or operator before each meeting from the correspondence, calls, and calendar they already live in, with no one filing anything first.

## The scenario

Amara Obi's team has a call with Meridian this afternoon. Over the past month, mail with Meridian, a forwarded voicemail, a revised terms document, and the calendar invite have all landed in the workspace. Nobody tagged or filed any of it.

## What Voe remembers

The Meridian thread with its transport checks and sender tiers; the voicemail's recording behind its transcript; the terms document as stored original; and the calendar event, captured from the feed. Heard and captured stay distinct: mail Meridian sent is heard, the calendar event is captured.

## What the product can do

Before the call, the product asks the memory what the room needs:

> **"Prepare me for Meridian. What changed, what have I promised, and what still needs resolution?"**
>
> Terms moved to net-45 `source ↗`, you committed to send the revised MSA by Friday `source ↗`, and one thing is open: no captured confirmation that Meridian accepted the new date.
>
> **WHAT I DON'T KNOW** - an attachment on the latest thread could not be read; it is named, not summarized.

Every line of the brief resolves to its record, and the gap rides underneath in the same breath: prepared from what the memory holds, honest about what it lacks.

## What Voe handles underneath

Passive capture across channels; the people and companies and how they connect; a timeline per entity; a bounded, cited context bundle; evidence carrying its grade, so a voicemail transcript reads as derived; and named gaps for the unread attachment and the missing confirmation.

## What you own

The chief-of-staff experience, the meeting workflow, the reasoning that turns sections into a brief, the recommendations, and any action: scheduling, sending, nudging a colleague. Voe assembles the record and answers over it. It never joins the meeting or moves the calendar.

## Build it

One context call per meeting is usually enough:

```bash
curl -s "$VOE/v1/context?entities=people/amara-obi,companies/meridian&query=meridian+terms+open+items&tokens=3000" \
  -H "Authorization: Bearer $TOKEN"
```

The bundle returns entity pages first, then timeline highlights, then the freshest matching messages, each with its grade and citation. Your model turns those sections into the brief; the citations are already there to carry into it. For a morning sweep rather than a single meeting, scope `search` to the day's event pages and let `think` narrate across them.

The brief is only ever as caught-up as the memory is. What it can prepare you for grows on its own; what it cannot, it says out loud.
