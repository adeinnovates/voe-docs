---
title: Tool Reference
description: The nine tools, their arguments, and what they return.
---

# Tool reference

All tools are workspace-scoped by the session's token. Read tools need a live grant; write tools additionally need live write authority.

| Tool | Does | Key arguments |
|---|---|---|
| `search` | Ranked search with evidence | `query`, `limit`, `explain`, `includeDerived`, tier overrides |
| `get_context` | Token-budgeted cited bundle + gaps | `query`, `entities[]`, `tokens`, `includeDerived` |
| `think` | Cited synthesis + mandatory gap report | `query`, `mode` (default **strict**) |
| `graph_query` | Bounded graph walk | `start[]`, `edgeTypes[]`, `depth`, `direction` |
| `entity_timeline` | One entity's connected history | `slug` |
| `get_page` | One page with body and provenance | `slug` |
| `capture` | Generic markdown capture | `markdown` |
| `create_page` | Checked create under write authority | `slug`, `type`, `body`, `frontmatter`, `requestedTier` |
| `patch_page` | Checked amend with body-hash precondition | `slug`, `body`, current body hash |

## Return discipline

Tools return raw JSON data, not prose. `think` returns `{ answer, sources, citationWarning, withheld, gaps }` - `sources` is the citation allowlist; verify every bracketed slug in `answer` against it before treating the bracket as evidence.

## Denials

Write tools answer with the authority decision's reason (no grant, scope mismatch, expired, secret detected, stale precondition). A read tool on a revoked connection answers that the key is no longer connected; that is a non-retryable state.
