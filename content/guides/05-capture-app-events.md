---
title: Capture App Events
description: Markdown capture through API or MCP for events, incidents, notes, and tool output.
---

# Capture app events

**For:** putting your application's own signal - events, incidents, decisions, tool output - into the same cited memory. **Scope:** `write`.

## Minimal example

```bash
curl -s -X POST "$VOE/ingest" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: text/markdown" \
  --data-binary $'# Deploy 2026-08-16\nRolled out v41. Error rate flat. [[services/checkout]] unaffected.'
```

The body becomes a page; the first heading becomes its title; `[[wikilinks]]` become relationships in the workspace. Unresolved references stay visible until later evidence enriches them. Over MCP, the `capture` tool does the same.

**Response shape:** the capture result with the new page's slug for citation in your own UI.

## Structured envelopes

`POST /ingest` with `Content-Type: application/json` accepts a full envelope (channel, sender, thread, attachments by raw ref) - the path adapters use. For app events, markdown is usually enough.

## Evidence behavior

App-captured pages are record-grade (you asserted them), carry the raw input as their proof, and rank in search like any other page.

:::warning
Ingest is rate-limited per workspace and size-capped per request. A burst past the ceiling queues honestly with `429`, and capture counts draw on the plan.
:::

**Next:** [Search the memory](/guides/search-the-memory)
