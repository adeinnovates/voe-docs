---
title: Trust-Aware Retrieval
description: Semantic relevance does not earn admission - tier policy decides what enters retrieval at all.
---

# Trust-aware retrieval

**The lesson:** semantic relevance does not earn admission. A message can be a perfect match for the query and still not enter retrieval, because trust, not similarity, decides what is admitted. Ranking happens only after admission, never before.

**Flows in:** two messages on the same topic - one from a `verified` contact, one from a lookalike domain that resembles a real one. Both are highly relevant to the query.

**You call:** `search`, `context`, or `think` as usual. The default already does the right thing:

```bash
curl -s "$VOE/v1/search?q=wire+the+deposit+today" -H "Authorization: Bearer $TOKEN"
```

**What happens:**

- The verified message is admitted and ranked.
- The lookalike is **held**, not merely ranked lower. Its relevance never gets a vote, because it never enters the candidate set. Suspicious and lookalike material is excluded by default and surfaced for review instead.
- Admitting it is a deliberate act: a per-read `tier=all`, or the owner promoting the sender after seeing the two domains side by side. See [Source tiers and review](/concepts/source-tiers-and-review).

**Why it is not "ranked lower":** a relevance system that lets a convincing lookalike in and trusts the score to bury it has already lost. The score is exactly what a good spoof optimizes. Gating admission by trust is the point; ranking is downstream of it.

The most relevant message in the store is sometimes the one you most need to keep out. Sorting by trust before similarity is the difference between retrieval and a way in.
