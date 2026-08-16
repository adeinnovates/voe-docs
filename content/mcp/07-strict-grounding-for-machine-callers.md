---
title: Strict Grounding For Machine Callers
description: Why MCP think withholds by default, and what your agent should do with it.
---

# Strict grounding for machine callers

A human surface can mark a doubtful sentence in place. An agent consuming `think` output has no such marks — whatever text arrives is what it will treat as true. So over MCP, `think` runs **strict** by default:

- A factual sentence with no citation from the answer's own source list is **withheld**, replaced by `[withheld: ungrounded sentence]`.
- A derived-grade source stated as unhedged fact is withheld the same way.
- A grounded sentence carrying an *extra invented* bracket has that bracket scrubbed to `[citation removed: not among this answer's sources]`.
- The result includes `withheld` (a count) and the full `sources` allowlist.

## What your agent should do

1. Treat `[withheld: …]` markers as holes, not noise — the memory had no proof for something the model wanted to say.
2. Verify brackets against `sources` anyway — defense in depth is cheap.
3. Read `gaps` before deciding the answer is complete; "the record does not hold this" is an actionable state.
4. Pass `mode: "annotate"` only when a human will see the output with the warnings rendered.

Strict buffers: the check runs over the full text, so strict responses return whole rather than streaming.
