---
title: Bearer Token Setup
description: Connect an assistant and hold exactly one secret.
---

# Bearer token setup

## Get the token

The workspace owner connects the assistant — dashboard Connect page (one paste) or:

```bash
curl -s -X POST "$VOE/v1/agent-connections" \
  -H "Authorization: Bearer $OWNER_TOKEN" -H "Content-Type: application/json" \
  -d '{"label":"Claude Desktop"}'
```

The response carries the assistant's `tok_…` once. The connection wrote the grant and the key together — the token is never a bare credential with nothing behind it.

## Hold it properly

- One token per assistant, named for it — so revocation is per-assistant, not all-or-nothing.
- Environment variable or client keychain; never in prompts, repos, or logs.
- Rotation is disconnect + reconnect: the old key dies with its grant.

## What the token is worth

Read scope by default; write only while a live write grant covers the call. Every tool call revalidates against the live grant, so a revoked assistant stops at its next call — there is no session grace.

Next: [Claude Desktop](/mcp/claude-desktop) · [Claude Code](/mcp/claude-code) · [HTTP MCP](/mcp/http-mcp) — the hosted UAT endpoint is `https://mcp-uat.runvoe.com/`.
