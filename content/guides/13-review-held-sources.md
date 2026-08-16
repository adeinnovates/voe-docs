---
title: Review Held Sources
description: Promote, keep holding, inspect the original — and why material was held.
---

# Review held sources

**For:** the human decision Voe refuses to automate. **Scope:** `read` to list, `write` to act.

## What gets held and why

Genuine suspicion only: lookalike sender domains (including perfect homoglyph clones — shown character-by-character with the differences marked), messages failing their own domain's published policy, detected credentials, and — if the workspace opted in — first contact. Being new is not suspicious by itself.

Held mail enters **nothing**: no pages, no index, no answers, until a person decides.

## Review

```bash
curl -s "$VOE/v1/quarantine" -H "Authorization: Bearer $TOKEN"
```

Each entry: the reason, the detail (for lookalikes: both domains, the edit distance — distance 0 means they render identically), and a reference to the original, viewable rendered-inert.

## Act

- **Promote** — admit the message into the record; for lookalikes this permanently teaches the domain to this workspace.
- **Discard** — decline it; the raw original remains as evidence of what arrived.
- **Keep holding** — no action is a valid action.

Identity-merge proposals (two handles, one person?) work the same way: approve or reject, evidence attached, the decision logged with you as the actor.

:::info
A pending held item surfaces as `attention` on `/healthz` — a person's attention is owed, but nothing is broken. It never degrades the service.
:::

**Next:** [Source tiers and review](/concepts/source-tiers-and-review)
