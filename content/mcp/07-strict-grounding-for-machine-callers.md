---
title: Strict Grounding For Machine Callers
description: Why MCP think withholds by default, and how clients handle it.
---

# Strict grounding for machine callers

A human surface can mark a doubtful sentence in place. An agent consuming `think` output has no such marks - whatever text arrives is what it will treat as true. So over MCP, `think` runs **strict** by default:

- A factual sentence with no citation from the answer's own source list is **withheld**, replaced by `[withheld: ungrounded sentence]`.
- A derived-grade source stated as unhedged fact is withheld the same way.
- A grounded sentence carrying an *extra invented* bracket has that bracket scrubbed to `[citation removed: not among this answer's sources]`.
- The result includes the structured `sources` allowlist, `withheld`, and `gaps` beside the completed answer.

## Client handling

1. `[withheld: …]` markers are holes, not noise. The memory had no proof for something the model wanted to say.
2. Citation slugs in the answer must appear in `sources`. Each source identifies the record or attachment used as evidence.
3. `gaps` is part of answer completeness. "The record does not hold this" is an actionable state.
4. `mode: "annotate"` is for human surfaces where warnings are rendered.

Strict buffers: the check runs over the full text, so strict responses return whole rather than streaming.
