---
title: Search The Memory
description: GET /v1/search — filters, includeDerived, explain, and per-hit evidence.
---

# Search the memory

**For:** ranked hits with proof. **Scope:** `read`.

:::api GET /v1/search
Hybrid search over the workspace

`q` (required), `limit` (default 20), `explain=true` for scoring breakdowns, `includeDerived=true` to include OCR/transcript text, `tier=all` to include suspicious senders and full-weight unknowns.
:::

```bash
curl -s "$VOE/v1/search?q=meridian+wire+details&limit=5&explain=true" \
  -H "Authorization: Bearer $TOKEN"
```

## Response shape

```json
{
  "results": [{
    "slug": "messages/2026/08/15/email-9637e986",
    "type": "message",
    "snippet": "…the account we are using for the wire…",
    "score": 0.041,
    "evidence": {
      "vector": 3, "keyword": 1,
      "senderTier": "known", "graphBoost": 2, "titleBoost": 0.18,
      "grade": "record", "sourceKind": "page", "sourceRef": "messages/2026/08/15/email-9637e986",
      "chunkIndex": 0, "charStart": 0, "charEnd": 214,
      "proof": { "rawRef": "sha256:…", "attachmentHash": null, "recordingHash": null }
    }
  }]
}
```

How ranking works: vector and keyword ranks fuse; graph adjacency (hits connected to other hits) and title similarity boost; sender tier gates. A page and each of its readable attachments are **separate hits** — the attachment cites itself.

## Gaps and failures

Search returns hits or an empty list — it does not fabricate. An empty result on a fresh workspace is the true answer. For "what's missing" as a first-class report, use [context](/guides/build-a-context-bundle) or [think](/guides/ask-with-think).

**Next:** [Build a context bundle](/guides/build-a-context-bundle)
