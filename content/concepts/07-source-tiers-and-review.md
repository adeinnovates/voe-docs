---
title: Source Tiers And Review
description: Verified, known, unknown, suspicious — held mail, lookalike handling, and review actions.
---

# Source tiers and review

Every sender identity carries a tier, and the tier follows the evidence into retrieval.

| Tier | Meaning | Retrieval default |
|---|---|---|
| `verified` | Confirmed by the owner | Full weight |
| `known` | Seen and accepted in this workspace | Full weight |
| `unknown` | First contact, nothing against it | Included, downweighted |
| `suspicious` | Flagged — lookalike domain, failed policy | Excluded |

Overrides exist per read (`tier=all`), and the owner can set a sender's tier explicitly.

## Held mail

A message is held when something about it is genuinely suspicious — never merely because the sender is new:

- **Lookalike domains.** A sender domain that resembles a verified one, including exact homoglyph clones (Cyrillic characters that render identically to Latin). The evidence panel shows the two domains character-by-character with the differing characters marked — on a perfect clone, that marking is the only visible difference.
- **Policy failures.** A message failing a policy its own domain publishes.
- **Credential detection.** Secrets spotted in the body.
- Optionally, **first contact** — off by default, per-workspace setting.

Held mail enters nothing: no pages, no index, no answers. It waits, visibly, in review.

## Review actions

From the dashboard (or API): **promote** — admit the message and, for lookalikes, permanently teach the domain; **discard**; **inspect the original**, rendered inert. Identity-merge proposals (two handles that look like one person) get **approve** or **reject** with evidence attached.

A held item is a warn on `/healthz`, never a fault: the guard working is not the service failing.

Guide: [Review held sources](/guides/review-held-sources)
