---
title: Build A Context Bundle
description: GET /v1/context - entities, query, token budget, dropped candidates, gaps.
---

# Build a context bundle

**For:** feeding your own model cited, budgeted context. **Scope:** `read`.

:::api GET /v1/context
Token-budgeted context bundle

`query` and/or `entities` (comma-separated slugs); `tokens` budget (default 8000); `includeDerived`, `tier` as in search.
:::

```bash
curl -s "$VOE/v1/context?entities=people/amara-obi&query=wire+details&tokens=3000" \
  -H "Authorization: Bearer $TOKEN"
```

## Response shape

```json
{
  "sections": [{
    "slug": "people/amara-obi", "type": "person", "reason": "entity",
    "content": "…page body…", "estimatedTokens": 310, "grade": "record",
    "citation": { "slug": "people/amara-obi", "sourceKind": "page", "proof": { "rawRef": null } }
  }],
  "tokenBudget": 3000, "estimatedTokensUsed": 2731,
  "truncated": true,
  "droppedCandidates": [{ "slug": "messages/…", "reason": "budget" }],
  "gaps": {
    "missingEntities": [], "staleEntities": [],
    "staleSyntheses": [], "unreadableAttachments": []
  }
}
```

The bundle favors directly requested records and the strongest supporting material for the query. Candidates that do not fit are **dropped whole, never truncated mid-passage**, and named in `droppedCandidates`.

Some bundles can include a maintained summary. Its section carries `recordCitations`, a list of the live records beneath it. Your model may read the summary, but its final citations should come from those records.

## Using it well

Pass `sections[].content` to your model with the citations; render `gaps` to the user. If `truncated` is true, a larger `tokens` budget can return more material. The bundle never silently under-fills without saying so.

**Next:** [Ask with think](/guides/ask-with-think)
