---
title: Context, Think, Search
description: The read side as one mental model — retrieve, pack, synthesize.
---

# Context, think, search

One engine, three read surfaces. Choose by who does the reasoning.

| Surface | Use when | You get |
|---|---|---|
| `search` | You need ranked hits | Hits with per-hit evidence and scores |
| `context` | **Your** model answers | Token-budgeted cited sections + gaps |
| `think` | **Voe** synthesizes | Streamed cited prose + mandatory gap report |

## search

Hybrid retrieval: vector similarity and keyword rank fused, then boosted by graph adjacency (results connected to other results rank up) and title match. Tier-aware by default — suspicious senders are excluded, unknown senders downweighted — with explicit overrides. `explain=true` returns the full scoring breakdown per hit.

## context

`context` runs retrieval, then packs sections into a token budget you set: entity pages first, then timeline highlights, then search results — dropping (never truncating mid-passage) what does not fit, and saying so in `droppedCandidates`. The bundle ends with a gap report for the question asked. Feed the sections to your own model and keep the citations.

## think

`think` builds the same bundle, streams model synthesis over it, and enforces the [citation check](/concepts/evidence). Events arrive in order: `sources`, then `text` chunks, then `citation-warning` (annotate) or `withheld` (strict), then always `gaps` — the gap report is not optional garnish.

An empty memory answers honestly: *"I do not hold a record that answers that yet."*

## Defaults that matter

- `includeDerived=false` everywhere by default; opt in to OCR/transcript text.
- Tier-aware reads by default; `tier=all` opts into suspicious and full-weight unknown.
- Strict mode for machine callers; annotate with in-place warnings for human surfaces.

Guides: [Search](/guides/search-the-memory) · [Context](/guides/build-a-context-bundle) · [Think](/guides/ask-with-think)
