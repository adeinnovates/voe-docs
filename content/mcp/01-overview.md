---
title: MCP Overview
description: The same engine as the API, exposed as tools - one token, one principal, one workspace.
---

# MCP overview

Voe's MCP server exposes the same product contract as the HTTP API: search, context, think, graph, timeline, capture, and checked writes as tools an assistant calls directly.

**One token maps to one principal and one workspace.** The assistant is a connected `agent:` principal; its capability is its live grant's, re-checked on every tool call. Revoke the connection and the assistant stops mid-session.

## Transports

- **stdio** - a local subprocess with `VOE_TOKEN` in its environment. The current path for Claude Desktop and Claude Code.
- **HTTP** - bearer-token authenticated, where the deployment exposes it. Sessions are bound to the exact key that opened them.
- **OAuth** - for Claude and ChatGPT connector flows where the deployment exposes the Voe OAuth MCP path. A connector token maps back to an agent connection. See [OAuth connections](/mcp/oauth-connections).

## Grounding posture

Over MCP, `think` defaults to **strict**: sentences the citation check cannot tie to a real source are withheld, invented co-citations are scrubbed, and the result carries the `sources` allowlist for bracket verification. An agent has no eyes on a UI's warning marks, so the text it receives is already checked.

Start: [Bearer token setup](/mcp/bearer-token-setup) · [Tool reference](/mcp/tool-reference)
