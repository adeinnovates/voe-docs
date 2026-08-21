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

`search` returns ranked hits with evidence for each result. Ranking uses meaning, keywords, titles, source tier, and related records. Suspicious senders are excluded by default, unknown senders are treated cautiously, and explicit options can widen the search. `explain=true` returns a readable reason for each hit.

## context

`context` packs the best supporting sections into a token budget you set. Sections keep their citations, omitted material is named in `droppedCandidates`, and the bundle ends with a gap report for the question asked. Feed the sections to your own model and keep the citations.

## think

`think` builds a question-shaped bundle, includes readable attachment and transcript text with its grade, and enforces the [citation check](/concepts/evidence). A maintained summary may help Voe read, but the answer's `sources` list names the records beneath it. Events arrive in order: `sources`, `text`, grounding events when needed, and always `gaps`. MCP returns the same source list as a structured array beside the completed answer.

An empty memory answers honestly: *"I do not hold a record that answers that yet."*

## Defaults that matter

- `search` and `context` exclude derived text by default; opt in when you want OCR or transcript text.
- `think` includes readable derived text and keeps its grade visible to the citation check.
- Tier-aware reads by default; `tier=all` opts into suspicious and full-weight unknown.
- Strict mode for machine callers; annotate with in-place warnings for human surfaces.

Guides: [Search](/guides/search-the-memory) · [Context](/guides/build-a-context-bundle) · [Think](/guides/ask-with-think)
