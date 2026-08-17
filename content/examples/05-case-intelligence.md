---
title: Case Intelligence
description: Work a case for months without collapsing evidence, interpretation, and conclusions into one memory.
---

# Case intelligence

An application or agent that works a single case - a claim, an investigation, a legal matter, a compliance review, an incident - for months or years, without ever letting recorded evidence, human interpretation, and generated conclusions become the same thing.

This is the shape that exercises the most of Voe at once, and it is where the distinction between what was recorded and what was concluded earns its keep.

## What you're building

An application that carries a case from open to close, keeping what arrived separate from what was decided the whole way.

## The scenario

A claim tied to Meridian runs eight months. Correspondence with Amara Obi, forwarded calls, a scanned settlement agreement, an adjuster's notes, calendar events, and your application's own status posts all accumulate against the case. Positions move: a figure is revised, a settlement date changes twice, and a counterparty's account is later contradicted by a document. An agent working the case draws conclusions along the way.

## What Voe remembers

Every input in the form it arrived: the correspondence with its transport checks and sender tier, the recording behind a transcript, the scanned agreement as stored original bytes, the human notes sent in, and each status event your application posted. Nothing is flattened into a summary. The summary is derived on top, and it points back.

## What the product can do

The case application answers the question a reviewer actually opens the file with:

> **"What changed since the last review, and what is still unresolved?"**
>
> The figure was revised from £240k to £198k `source ↗`, and the settlement date moved from the 12th to the 20th `source ↗`. The earlier figure is still here, marked as prior.
>
> **WHAT I DON'T KNOW** - no captured confirmation that Meridian accepted the revised terms. Dele's note describes a signed agreement; the record holds the request, not the signature.

Every line opens to its record: the revised figure shows the message that carried it, the superseded one is one tap away, and the gap names the missing thing in the terms a reviewer would recognize, not a slug.

## What Voe handles underneath

Chronology and current-state reconstruction; the people and companies and how they connect; original evidence carrying its grade; retrieval and a bounded, cited context; named, query-scoped gaps that close only when evidence resolves the missing state; supersession when a fact or a position changes; [sealed statements](/concepts/statements) as immutable monthly snapshots of the case record; grants for who may read; and controlled writeback for what an agent may record.

One distinction the case depends on:

```text
MEMORY        What happened, and what is it evidence of?
INTELLIGENCE  What does it mean?
AGENCY        What should we do?
AUTHORITY     Are we allowed to write or act?
```

Voe holds the first line only. An agent's conclusion is not memory: it enters through [checked writeback](/examples/checked-writeback), lands marked as derived, names the agent that wrote it, and never becomes record-grade because a model was confident. A reviewer can ask which assertions rest only on derived material and get an answer, because grade travels with every claim and worst-grade wins.

## What you own

Domain reasoning, the case workflow, decisioning, the review interface, and any external action. Voe does not adjudicate the claim, advance the case, or tell anyone anything - the case never moves because Voe touched it. Voe hears, remembers, retrieves, answers, and admits checked writes; deciding and acting are your product's.

## Custody and deployment

The customer hands Voe no password to the source systems. Capture is addressed or explicitly sent in - a case inbox, a forwarded thread, a posted event - so Voe holds no login to anything of the customer's. For a case that cannot leave the building, a Voe cell runs inside the customer's own perimeter, and the record and its evidence stay there.

## Build it

Capture arrives the way every channel does: mail to the case address, transcripts and notes sent to `POST /ingest`, and your own milestones posted as events. Then, per review:

- `context` for a bounded, cited bundle around the case's entities and the question - this is what your model reads.
- `graph_query` from the case entity for the people, companies, and threads it touches.
- `POST /v1/think` when you want cited prose plus the mandatory gap note, rendered as the answer above.
- Agent conclusions land only through a scoped write grant and `create_page` / `patch_page`, so what the agent decides is filed as derived, attributed, and checked - never as record-grade fact. See [checked writeback](/examples/checked-writeback).
- `GET /v1/statements/sealed` for the immutable monthly snapshots a long case accrues, each number opening to its evidence - a periodic account the review can cite without it shifting underfoot.

Months from now, the question that decides the case is rarely what the agent concluded. It is what the record can still show. Voe keeps those two answerable apart, for as long as the case runs.
