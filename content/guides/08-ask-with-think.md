---
title: Ask With Think
description: POST /v1/think — streaming events, sources, citation warnings, the gap report, strict mode.
---

# Ask with think

**For:** letting Voe synthesize a cited answer. **Scope:** `read`. **Requires:** a model provider configured on the cell.

:::api POST /v1/think
Streamed cited synthesis

Body: `{"query": "…", "mode": "annotate" | "strict"}`. Default `annotate`. Server-sent events.
:::

```bash
curl -s -N -X POST "$VOE/v1/think" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"query":"Where does Meridian stand?"}'
```

## Event order

| Event | Payload |
|---|---|
| `sources` | The answer's allowlist: every source it may cite, with slug, label, grade, kind |
| `text` | Prose chunks as generated (annotate mode) |
| `citation-warning` | The exact sentences the mechanical check could not tie to a source (annotate) |
| `withheld` | Count of sentences withheld (strict) |
| `gaps` | Always last, always present: what the memory lacks for this question |

## Annotate vs strict

- **Annotate** streams live and names failing sentences afterward — right for human surfaces that can mark text in place.
- **Strict** buffers, withholds every ungrounded sentence (`[withheld: ungrounded sentence]`), scrubs invented co-citations, and only then returns. Right for machine callers; it is the MCP default. Strict does not stream.

## Evidence behavior

Citations are bracketed slugs in the prose, and only slugs from the `sources` event count — render anything else as dead, never as a link. Derived-grade sources stated as unhedged fact are flagged the same way as uncited claims.

An empty memory answers: *"I do not hold a record that answers that yet."* — followed by the gap report. Render both.

**Next:** [Connect over MCP](/guides/connect-over-mcp) · [Build an evidence UI](/guides/build-an-evidence-ui)
