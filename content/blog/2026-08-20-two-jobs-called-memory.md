---
title: "Two Jobs Called Memory: Fast Recall, and a Record You Can Check"
description: Most memory tools give an AI app fast recall. Voe keeps an evidence-first record of your world. Why that difference matters, and when each one fits.
date: 2026-08-20
author: Voe team
tags:
  - memory
  - evidence
  - positioning
excerpt: One approach recalls what an app was told. The other keeps what reached a person, with the receipts.
pinned: false
---

# Two jobs called memory: fast recall, and a record you can check

Memory for AI has become a crowded category, and most of the tools in it are built for one job: give an application a fast, durable recall of its users so it stops forgetting between sessions. They are good at that job. Voe gets filed next to them, and it is built for a different one. The comparison is worth drawing carefully, because almost every difference follows from that split.

Short version: the common approach adds a recall service behind your app. Voe keeps an evidence-first record of a person's world that any assistant can read and that can show its work. Different jobs, and most of what follows comes from that one distinction.

## What the common approach does, fairly

The mainstream design is well understood, and it works. A memory tool takes what an application sees - conversations, documents, and increasingly synced sources like mail and files - and extracts the useful facts from it. Those facts, and the user profiles built from them, become the memory. Retrieval is fast and hybrid, mixing vector similarity with keyword and graph signals, and the whole thing is tuned to score well on the public recall benchmarks the category measures itself on, such as LoCoMo and LongMemEval. Old facts are updated or expired as newer ones arrive, so the profile stays current.

If your job is to give a product a memory of its users, behind a clean add-and-search API, that design is purpose-built for it. Nothing here argues otherwise.

## Where Voe is shaped differently

Four differences matter, and each is a design choice rather than a feature gap.

**The original is the record, not the extraction.** In the common approach, the memory is the fact the system distilled and chose to keep. Voe keeps the original message as the record, and treats every fact, connection, and summary as something derived from it and kept beside it. The difference shows up months later, when an answer matters: a distilled memory hands you the fact it decided to keep, and Voe hands you the fact and the message it came from.

**Every answer can show its work.** The mainstream tools optimize for recall, and their public material centers on how much they recall, how fast, and how cheaply, rather than on tracing an answer back to a source. Voe is built the other way around. Each claim in an answer points to the source it came from, and an answer always ends with a plain statement of what the record does not contain. When the record cannot answer, it says so rather than filling the silence:

> I do not hold the call itself. I only hold the voicemail before it.

**Nothing quietly disappears.** A current-state profile is meant to forget what expired, which keeps it fresh. Voe keeps the trail: a newer message is recorded as superseding an older one, not written over it, and the only way material leaves the record is an explicit, audited removal that leaves proof it happened. One design optimizes for the best answer right now. The other optimizes for being able to show what was known, and when.

**Adding to the record is a permission, not a default.** In the common approach, an application writes to memory freely - it updates, merges, and forgets on its own. In Voe, the record is not something a connected assistant can quietly rewrite. An agent can contribute only through a permission the workspace owner grants, that permission is narrow and recorded, and anything an agent writes stays marked as its own, kept apart from the evidence that arrived. The intelligence can add to the memory; it does not get to silently redefine what happened.

## Different scoreboards

This is grounded in how Voe measures itself. Its evals put retrieval quality on the board through a curated gate that checks whether the right record surfaces from a deliberately confusing set. Other checks examine whether answers retain their evidence references, whether invented citations are caught, and whether material held as suspicious stays out of answer context. Recall is measured and held to a bar; it is simply not the only thing Voe measures.

So the two scoreboards are not better and worse, but different questions. The common one asks how much a system recalls, how fast, and how cheaply. Voe adds questions about evidence: whether an answer traces to its sources, whether an invented citation can pass, and whether held material can enter answer context. Recall quality is table stakes, and Voe keeps it there; the difference is that it goes on keeping score past it.

## Side by side

| | The common memory approach | Voe |
| --- | --- | --- |
| Built to | Give an app fast recall of its users | Keep an evidence-first record of a person's world |
| What it treats as the memory | The extracted fact and the profile built from it | The original message, kept; facts derived from it and cited back |
| Answers trace to a source | Not the focus | Every claim cites its source |
| Old or conflicting material | Updated, or expired and forgotten | Supersession stays visible; removal only by explicit, audited action |
| Missing information | Returned as no result | Named, as part of the answer |
| Who can change the record | The app or agent, on its own | Only by an owner-granted permission; agent writes stay marked as their own |
| Optimized for | Recall, speed, token cost | Provenance and honest gaps, on top of solid recall |

## When each one fits

Building a product that needs to remember its users across sessions, behind a drop-in API, with leading recall? The mainstream memory tools are made for exactly that, and you should reach for one.

Need a provable, portable record of what actually happened in a person's world - mail, texts, calls, calendar - that any assistant can read and that can show its work? That is what Voe is for. It is a different kind of memory: evidence first, cited, and honest about its gaps.

They are less alternatives than different layers. One remembers what an app was told. The other keeps what reached a person, with the receipts.

## Where Voe stops

Voe is not a general document search store, and it does not exist to top a recall leaderboard, though it holds its own retrieval to a hard regression bar. It never sends or acts on your behalf; even a permitted write changes the record, not the outside world. It knows only what has been passed to it, so a call nobody captured stays a call it does not have. These are not gaps waiting to be closed. A memory that tells you where it stops is worth more than one that fills the silence.

## A note on grounding

The behaviors attributed to the common approach - fact extraction, self-updating profiles that forget what expires, and a focus on recall benchmarks like LoCoMo and LongMemEval - are the documented, public design of today's leading memory tools, taken from their own material. The claims about Voe describe what it does, not how it does it. To see the difference rather than read about it, the [examples](/examples) show the same record answering with its sources and naming its gaps.
