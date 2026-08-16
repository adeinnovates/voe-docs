---
title: "Quickstart: Give An Agent Real-World Memory"
description: Capture a seed record, search it, build context, ask with think, then connect an assistant over MCP.
---

# Quickstart: give an agent real-world memory

**What this is for.** Run the whole loop once — capture, search, context, think, MCP — before learning every concept.

**Before you start.** You need an owner or admin workspace token (`tok_…`). Get one from whoever runs your Voe cell: an operator provisions a workspace and sends a setup link, and claiming that link mints your token. Export it:

```bash
export VOE=https://your-voe-cell.example
export TOKEN=tok_your_workspace_token
```

## 1. Capture a seed record

```bash
curl -s -X POST "$VOE/ingest" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: text/markdown" \
  --data-binary $'# Kickoff with Meridian\nAgreed to send revised terms by Friday. Dele owns the redline.'
```

The body becomes a page. The raw input is kept first; the page, its links, and its search index are built from it.

## 2. Search for it

```bash
curl -s "$VOE/v1/search?q=meridian+terms" -H "Authorization: Bearer $TOKEN"
```

Each hit carries evidence: how it ranked (vector and keyword), its source grade, and a proof block pointing at the original material.

## 3. Build a context bundle

```bash
curl -s "$VOE/v1/context?query=meridian+terms&tokens=2000" -H "Authorization: Bearer $TOKEN"
```

Sections come back token-budgeted with citations, plus a gap report naming what the memory does not hold for this question.

## 4. Ask with think

```bash
curl -s -N -X POST "$VOE/v1/think" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"query":"What did Meridian agree to?"}'
```

Server-sent events stream back: `sources` first, then `text`, then a mandatory `gaps` report. Every factual sentence cites a source from the `sources` list; a sentence the mechanical checker cannot tie to one arrives with a `citation-warning`.

## 5. Connect the same workspace over MCP

Create an assistant connection. This writes the assistant's grant and key together; the returned key is shown once.

```bash
curl -s -X POST "$VOE/v1/agent-connections" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"label":"Quickstart Assistant"}'
```

Put the returned assistant token, not the owner token, into the MCP client:

```json
{
  "mcpServers": {
    "voe": {
      "command": "bun",
      "args": ["run", "apps/mcp/src/stdio.ts"],
      "env": { "VOE_TOKEN": "tok_your_assistant_token" }
    }
  }
}
```

Your assistant now holds the same memory through its own `agent:` principal: `search`, `get_context`, `think`, and the rest of the [tool list](/mcp/tool-reference). Over MCP, `think` defaults to strict grounding — ungrounded sentences are withheld, not delivered.

## 6. Inspect citations and gaps

Ask something the memory cannot answer and read the `gaps` event: this honesty is the product working, not an error. Then open the dashboard and tap any citation — it resolves to the record, and the record resolves to the original bytes.

**Next:** route a real channel in — [email](/guides/route-email-into-voe), [SMS and voice](/guides/add-sms-and-voice), or a [calendar feed](/guides/subscribe-a-calendar-feed).
