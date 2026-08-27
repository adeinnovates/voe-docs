---
title: Checked Writes
description: Write grants, create, patch, preconditions, decisions, and rejection modes.
---

# Checked writes

The record's integrity never depends on which model is writing. Every agent write, including the owner's own assistant, goes through the same checks.

## Write grants

A write grant is a scoped, expiring permission slip:

```json
{
  "principal": "agent:claude-desktop",
  "pageTypes": ["note"],
  "prefixes": ["agent/"],
  "tier": "known",
  "mode": "both",
  "expiresInSeconds": 3600
}
```

- **Scope**: which page types, under which slug prefixes, at which source tier.
- **Mode**: `create`, `annotate`, or `both`.
- **Expiry**: mandatory. Authority ends on its own.
- **Attachment**: only a *connected* assistant can receive one - a write grant never conjures an agent into existence.

A live grant covers repeated writes within its scope until it expires. It is not a request for a person to approve each write.

## Write decisions

`POST /v1/pages` (create) and `PATCH /v1/pages/:slug` (amend), plus the MCP `create_page` / `patch_page` tools, enforce the same contract:

1. **Authority** - a live grant must cover the principal, type, prefix, tier, and mode. The decision is recorded either way.
2. **Secrets** - a body carrying credentials is rejected before it lands.
3. **Precondition** - a patch must present the page's current body hash; a stale hash is refused, so two writers cannot silently clobber each other.
4. **Commit** - accepted writes land in the record and query surfaces together; a failed write leaves neither half behind.

## Rejection modes

Rejections come back with the decision's reason: no live grant, scope mismatch (type, prefix, tier, or mode), expired authority, secret detected, stale precondition. These are facts about authority, not transient errors. Retrying an authority denial without a new grant will not succeed.

Guide: [Let an agent write](/guides/let-an-agent-write)
