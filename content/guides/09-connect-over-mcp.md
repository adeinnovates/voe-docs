---
title: Connect Over MCP
description: Connect an assistant with workspace access and a one-time key.
---

# Connect over MCP

**For:** giving an assistant (Claude Desktop, Claude Code, any MCP client) the workspace's memory. **Scope:** `admin` to create connections.

## Connect the assistant

```bash
curl -s -X POST "$VOE/v1/agent-connections" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"label":"Claude Desktop"}'
```

**Response:** the connection with its `agent:` principal and a `tok_…` key, shown once. Workspace access and key issuance are created together, so a connected assistant is always listed, revocable, and scoped to its live grant. The dashboard's Connect page does this in one paste.

Optionally attach write authority at connection time (`writeAuthority: { pageTypes, prefixes, tier, mode, expiresInSeconds }`) so capability is visible from the moment it exists.

## Configure the client

Stdio (Claude Desktop / Claude Code):

```json
{ "mcpServers": { "voe": {
  "command": "bun", "args": ["run", "apps/mcp/src/stdio.ts"],
  "env": { "VOE_TOKEN": "tok_…" } } } }
```

HTTP (where the cell exposes it): point the client at the MCP URL with `Authorization: Bearer tok_…`. A session belongs to the exact key that opened it.

## What the assistant can do

Read tools always; `capture`/`create_page`/`patch_page` only under live write authority. Every tool call revalidates the key against the live grant - revoke the connection and the assistant stops at its next call, mid-session, on both transports.

:::info
Disconnecting (`DELETE /v1/agent-connections/:principal`) removes the grant, the key, and any write authority together.
:::

**Next:** [MCP tool reference](/mcp/tool-reference) · [Let an agent write](/guides/let-an-agent-write)
