---
title: Personal AI
description: An assistant with durable memory of the user's world, independent of the assistant itself.
---

# Personal AI

An assistant with a durable memory of the user's world: one that does not live inside the assistant, and does not leave when the assistant does.

## What you're building

A personal assistant whose memory is a thing the user owns, so the assistant stays replaceable and the memory stays put.

## The scenario

Someone's week runs through mail, a couple of texts, a voicemail from a contractor, and a calendar. They ask their assistant the small, real questions - what is slipping, who owes them a reply - and next year they may use a different assistant entirely.

## What Voe remembers

The channels the person actually uses, accumulating into a longitudinal record: the people they hear from, the threads, the commitments, each with its evidence. The record is theirs; connecting a new assistant does not move it.

## What the product can do

> **"What am I forgetting this week?"**
>
> Dele's reply on the Northbank thread is still owed `source ↗`, and the contractor left a voicemail on Tuesday you have not acted on `source ↗` (transcript, derived).
>
> **WHAT I DON'T KNOW** - nothing new from Amara in nine days; she may have replied somewhere the memory cannot hear.

Simple questions, cited answers, and a gap where the memory's reach runs out. No theater: the assistant asks, the memory answers, the person gets on with their day.

## What Voe handles underneath

The person's channels; the longitudinal record and its entities; search; a cited context bundle; evidence with grade; and named, query-scoped gaps.

## What you own

The assistant's personality and reasoning, its proactive moments, its interface, and any action it takes on the person's behalf. Voe is the memory the assistant reads; being the assistant is your product.

## Build it

Most of it is one call:

```bash
curl -s -N -X POST "$VOE/v1/think" -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"What am I forgetting this week? Anything owed either way?"}'
```

Connect the assistant with its own key, or through a browser sign-in where the deployment offers it, and it reads exactly what the person can. Swap it for another next year: the new one connects the same way and reads the same memory, because the memory was never part of the assistant.

The assistant is the part you will replace. The memory is the part the person keeps, which is the right way round.
