---
title: Evidence-Grade Propagation
description: Possessing a document and knowing what it says are different claims - grade carries the difference.
---

# Evidence-grade propagation

**The lesson:** possessing a document and knowing what it says are two different claims. Voe can be certain a scanned agreement exists and where it came from, while what it says is available only through uncertain interpretation. The grade carries that difference all the way into the answer.

**Flows in:** a scanned settlement agreement - stored original bytes, known provenance, and text available only through OCR.

**You call:** `search` with `includeDerived=true` to reach the interpreted text; the answer keeps the two claims apart:

```bash
curl -s "$VOE/v1/search?q=settlement+figure&includeDerived=true" \
  -H "Authorization: Bearer $TOKEN"
```

**What the grades say:**

- **The document, record-grade.** That the agreement exists, its filename, size, and hash, and which message carried it - all certain.
- **The reading, derived-grade.** Any figure or clause pulled from the scan is marked derived and points at the original. It never launders into record-grade, and worst-grade wins: an answer resting on the reading inherits the reading's grade.

**The user can inspect:** the original bytes by hash, and the interpretation beside them, so a person can check the reading against the page.

"We have the signed agreement" and "the agreement says £198k" are not the same sentence. A memory that grades them apart lets a reader trust the first without being asked to trust the second.
