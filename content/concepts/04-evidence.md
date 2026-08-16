---
title: Evidence
description: Source slugs, raw references, attachment hashes, derived-grade text, and the citation check.
---

# Evidence

Evidence is not output formatting. It is the part of every read that lets a person or an agent check the answer.

## The evidence chain

Every search hit and context section carries:

- **A source slug** — the page it came from (`messages/2026/08/15/email-9637e986`).
- **A source kind and ref** — the page body, or one specific attachment on it.
- **A proof block** — `rawRef` (the original bytes), `attachmentHash`, `recordingHash` where they apply.
- **A grade** — `record` for mechanically captured text, `derived` for OCR, transcription, or synthesis. Worst wins: content built from any derived source is derived.
- **Position** — chunk index and character range, so a citation lands on the passage, not just the document.

A page and its readable attachments surface as **separate hits with separate citations** — a twenty-page PDF is its own evidence, not a snippet of its parent email.

## The citation check

`think` instructs the model to cite, then verifies mechanically — no model checks itself. After synthesis, every factual sentence is checked for a citation naming a source actually in the bundle:

- **Annotate mode** (API default): the text streams live; sentences that fail arrive with a `citation-warning` event naming them exactly.
- **Strict mode** (MCP default): failing sentences are withheld and replaced with `[withheld: ungrounded sentence]`; an invented citation riding a grounded sentence is scrubbed. Machine callers get no unmarked fabrication.

A derived-grade source stated as unhedged fact is caught the same way.

## What this buys a builder

You can render every claim with a tap-through to its source, distinguish read text from derived text, and show fabricated citations as dead — because the API hands you the material to do it. See [Build an evidence UI](/guides/build-an-evidence-ui).
