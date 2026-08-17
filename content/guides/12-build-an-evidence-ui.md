---
title: Build An Evidence UI
description: Citation chips, source panels, attachment citations, fabricated citations, gap display.
---

# Build an evidence UI

**For:** rendering answers a person can check. The API hands you everything this page describes.

## Citation chips

Parse bracketed slugs in `think` prose. **Build a chip only for slugs present in the `sources` event**; that list is the answer's allowlist. A bracket naming anything else is an invented citation: render it dead, struck, inert, and unmistakably not a link. Never render it as a chip that fails on tap. A 404 reads as an access problem when the truth is fabrication.

Tapping a chip opens the source: the page, or the attachment labeled with the filename, with the passage location supplied by the evidence.

## Grade, always

Show `record` vs `derived` on every section and hit. A quiet mono tag suffices. Derived text stated as fact is a warning the API already raises; give it a visible treatment.

## Warnings in place

In annotate mode, `citation-warning` names the exact failing sentences. Mark those sentences where they stand (dashed underline, faint ink, a short tag) rather than appending a vague footnote. Count what you could not match - never let a partial match silence the rest.

## Gaps as content

Render the `gaps` event as part of the answer: missing entities, stale records, unreadable attachments by name, answer limits. The empty-memory reply, *"I do not hold a record that answers that yet"*, deserves the same dignity as an answer, because it is one.

## Proof depth

Evidence panels bottom out at original material: page → raw ref → attachment or recording ref. One tap per layer.

**Next:** [Evidence](/concepts/evidence) · [Review held sources](/guides/review-held-sources)
