---
title: Let An Agent Write
description: Create a write grant, call create_page and patch_page, handle denials.
---

# Let an agent write

**For:** agents that add or amend memory. **Precondition:** the agent is a [connected assistant](/guides/connect-over-mcp).

## 1. Grant authority

```bash
curl -s -X POST "$VOE/v1/write-grants" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"principal":"agent:claude-desktop","pageTypes":["note"],"prefixes":["agent/"],"tier":"known","mode":"both","expiresInSeconds":3600}'
```

Narrow on purpose: types, slug prefixes, tier, mode, and a mandatory expiry. `GET /v1/write-grants` lists; `DELETE /v1/write-grants/:id` revokes early.

## 2. Create

`POST /v1/pages` (or MCP `create_page`) with `slug`, `type`, `body`, and optional `frontmatter`. The slug must fall under a granted prefix, and the type must be covered by the grant.

## 3. Patch

`PATCH /v1/pages/:slug` (or MCP `patch_page`) must present the page's **current body hash** as its precondition. A stale hash is refused. Two writers cannot silently clobber each other.

## Handling denials

| Rejection | Meaning | Do |
|---|---|---|
| No live grant / expired | Authority lapsed | A person re-grants; do not retry |
| Scope mismatch | Type, prefix, tier, or mode outside the grant | Write within scope or request wider authority |
| Secret detected | Body carries credentials | Remove the secret; it will never land |
| Stale precondition | Page changed underneath | Re-fetch and re-patch |

Every allow or deny decision is recorded. When the write authority expires, the agent keeps reading; only the write stops, with a message saying exactly that.

**Next:** [Checked writes](/concepts/checked-writes)
