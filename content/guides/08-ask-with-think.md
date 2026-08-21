---
title: Ask With Think
description: POST /v1/think - streaming events, sources, citation warnings, the gap report, strict mode.
---

# Ask with think

**For:** letting Voe synthesize a cited answer. **Scope:** `read`. **Requires:** model-backed synthesis on the cell.

:::api POST /v1/think
Streamed cited synthesis

Body: `{"query": "...", "mode": "annotate" | "strict", "entities": [], "conversation": []}`. Only `query` is required. Default `annotate`. Server-sent events.
:::

```bash
curl -s -N -X POST "$VOE/v1/think" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"query":"Where does Meridian stand?"}'
```

## Scope a question

Use `entities` when the caller already knows which people, companies, or records the question concerns. Pass page slugs, up to eight. Think still searches for supporting records, but the named pages anchor the context.

```json
{
  "query": "What changed since our last conversation?",
  "entities": ["people/amara", "companies/meridian"]
}
```

## Continue a conversation

Use `conversation` for a follow-up that depends on prior wording. Send up to eight prior turns. Each turn has a `role` of `user` or `assistant` and a `content` string.

```json
{
  "query": "What did she promise next?",
  "conversation": [
    { "role": "user", "content": "What did Amara say about the launch?" },
    { "role": "assistant", "content": "She moved the launch review to Friday." }
  ]
}
```

Conversation text preserves continuity. It is not evidence and cannot support a citation. Every factual answer must still stand on a source listed in the `sources` event.

## Event order

| Event | Payload |
|---|---|
| `sources` | The answer's allowlist: every record or attachment it may cite, with slug, parent page, label, grade, kind, and source reference |
| `text` | Prose events as generated (annotate mode) |
| `citation-warning` | The exact sentences the citation check could not tie to a source (annotate) |
| `withheld` | Count of sentences withheld (strict) |
| `gaps` | Always last, always present: what the memory lacks for this question |

## Annotate vs strict

- **Annotate** streams live and names failing sentences afterward; right for human surfaces that can mark text in place.
- **Strict** buffers, withholds every ungrounded sentence (`[withheld: ungrounded sentence]`), scrubs invented co-citations, and only then returns. Right for machine callers; it is the MCP default. Strict does not stream.

## Evidence behavior

Citations are bracketed slugs in the prose, and only slugs from the `sources` event count. Render anything else as dead, never as a link. Derived-grade sources stated as unhedged fact are flagged the same way as uncited claims.

`think` includes readable attachments and transcripts automatically and keeps their derived grade in the source list. A maintained summary may help compose the answer, but its slug is not final evidence. The `sources` event exposes the records that support it.

Over MCP, `think` returns the same list as a structured `sources` array beside the completed `answer`, `citationWarning`, `withheld`, and `gaps` fields.

An empty memory answers: *"I do not hold a record that answers that yet."* The gap report follows it. Render both.

**Next:** [Connect over MCP](/guides/connect-over-mcp) · [Build an evidence UI](/guides/build-an-evidence-ui)
