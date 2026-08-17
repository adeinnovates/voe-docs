---
title: Evidence-Backed Answers
description: Provenance travels the whole stack, so a generated claim resolves back to inspectable evidence.
---

# Evidence-backed answers

**The lesson:** evidence is not stapled to the final answer. Provenance travels through retrieval and context, so a generated claim resolves backward to the record it came from, warnings and gaps included.

**Flows in:** anything already captured; this pattern is read-side UI.

**You call:** `POST /v1/think` in annotate mode, and render the event stream.

**The pattern:**

1. **Chips from the allowlist.** A bracket in the prose becomes a tappable chip only when its slug is in the `sources` event. Anything else renders struck and dead: a fabricated citation must look like nothing, never like a link that 404s.
2. **Panels that bottom out.** Chip to source panel (page or attachment, with grade and tier) to the original reference. Every layer one tap.
3. **Warnings in place.** The `citation-warning` event names exact sentences; mark them where they stand, and count any you could not match.
4. **Gaps as content.** Render the `gaps` event with the answer. Missing, stale, unreadable, and the answer's own limits are part of the answer, not a footnote.

**The user can inspect:** every claim, source, warning, and gap.

An answer whose sources you cannot open is a claim. An answer whose every line opens is a record you can argue with. Only one of those is safe to act on.
