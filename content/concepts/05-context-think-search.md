---
title: Context, Think, Search
description: The read side as one mental model - retrieve, pack, synthesize.
---

# Context, think, search

One engine, three read surfaces. Choose by who does the reasoning.

| Surface | Use when | You get |
|---|---|---|
| `search` | You need ranked hits | Hits with per-hit evidence and scores |
| `context` | **Your** model answers | Token-budgeted cited sections + gaps |
| `think` | **Voe** synthesizes | Streamed cited prose + mandatory gap report |

## search

`search` returns ranked hits with evidence for each result. Ranking considers meaning, keywords, titles, source tier, and related records. Suspicious senders are excluded by default, unknown senders are treated cautiously, and explicit options can widen the search. `explain=true` returns a readable reason for each hit.

## context

`context` packs the best supporting sections into a token budget you set. Sections keep their citations, omitted material is named in `droppedCandidates`, and the bundle ends with a gap report for the question asked. Feed the sections to your own model and keep the citations.

## think

`think` builds the same bundle, streams model synthesis over it, and enforces the [citation check](/concepts/evidence). Events arrive in order: `sources`, `text`, grounding events when needed, and always `gaps`. The gap report is part of the answer.

An empty memory answers honestly: *"I do not hold a record that answers that yet."*

## Defaults that matter

- `includeDerived=false` everywhere by default; opt in to OCR/transcript text.
- Tier-aware reads by default; `tier=all` opts into suspicious and full-weight unknown.
- Strict mode for machine callers; annotate with in-place warnings for human surfaces.

Guides: [Search](/guides/search-the-memory) · [Context](/guides/build-a-context-bundle) · [Think](/guides/ask-with-think)
