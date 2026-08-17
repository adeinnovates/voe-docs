---
title: Search The Memory
description: GET /v1/search - filters, includeDerived, explain, and per-hit evidence.
---

# Search the memory

**For:** ranked hits with proof. **Scope:** `read`.

:::api GET /v1/search
Search over the workspace

`q` (required), `limit` (default 20), `explain=true` for diagnostic match data, `includeDerived=true` to include OCR/transcript text, `tier=all` to include suspicious senders and full-weight unknowns.
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
    "snippet": "...the account used for the wire...",
    "score": 0.041,
    "evidence": {
      "senderTier": "known",
      "grade": "record", "sourceKind": "page", "sourceRef": "messages/2026/08/15/email-9637e986",
      "proof": { "rawRef": "sha256:…" }
    }
  }]
}
```

Readable attachments appear as separate hits with their own evidence. When `explain=true` is set, each hit includes diagnostic match data.

## Gaps and failures

Search returns hits or an empty list - it does not fabricate. An empty result on a fresh workspace is the true answer. For "what's missing" as a first-class report, use [context](/guides/build-a-context-bundle) or [think](/guides/ask-with-think).

**Next:** [Build a context bundle](/guides/build-a-context-bundle)
