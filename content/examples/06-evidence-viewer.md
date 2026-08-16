---
title: Evidence Viewer
description: The UI pattern that makes answers checkable — chips, panels, grades, gaps.
---

# Evidence viewer

**Flows in:** anything — this example is pure read-side UI.

**You call:** `POST /v1/think` (annotate mode) and render the event stream.

**Build:**

1. **Chips from the allowlist.** Brackets in prose become tappable chips **only** when the slug is in the `sources` event; anything else renders struck and dead. A fabricated citation must look like nothing, not like a link that 404s.
2. **Panels that bottom out.** Chip → source panel (page or attachment, with grade and tier) → raw ref / attachment hash. Every layer one tap.
3. **Warnings in place.** `citation-warning` names exact sentences; mark them where they stand and count any you could not match.
4. **Gaps as content.** Render the `gaps` event with the answer — missing, stale, unreadable, and answer limits are part of the answer.

**The user can inspect:** everything — that is the product.

**What this proves:** grounding is not a model behavior here; it is API material (`sources`, warnings, gaps, proofs) your UI renders. The dashboard's own ask panel is built from exactly these events.
