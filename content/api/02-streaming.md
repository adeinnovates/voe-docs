---
title: Streaming
description: Server-sent events on /v1/think - framing, event order, client handling.
---

# Streaming

`POST /v1/think` streams **server-sent events**: frames separated by a blank line, each with `event:` and `data:` (JSON) lines.

```
event: sources
data: {"sources":[{"slug":"messages/…","label":"…","grade":"record","sourceKind":"page"}]}

event: text
data: {"text":"Meridian's revised terms arrived Friday "}

event: gaps
data: {"gaps":{"missingEntities":[],"unreadableAttachments":[]}}
```

## Order and guarantees

1. `sources` first - the citation allowlist for everything that follows.
2. `text` events (annotate mode only; strict buffers and sends the checked text at the end).
3. `citation-warning` (annotate) with the exact unverifiable sentences, or `withheld` (strict) with the count.
4. `gaps` - always emitted, even when empty, even on the empty-memory reply.

`error` events carry the same JSON error shape as non-streaming routes.

## Client notes

Use `curl -N` or any SSE/fetch-reader client; buffer on the blank-line frame separator, not on partial reads. Do not resolve citations against anything but this response's `sources`. That allowlist is what makes a bracketed slug evidence rather than decoration.
