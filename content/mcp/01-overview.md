---
title: MCP Overview
description: The same engine as the API, exposed as tools - one token, one principal, one workspace.
---

# MCP overview

Voe's MCP server exposes the same product contract as the HTTP API: search, context, think, graph, timeline, capture, and checked writes as tools an assistant calls directly.

**One token maps to one principal and one workspace.** The assistant is a connected `agent:` principal; its capability is its live grant's, re-checked on every tool call. Revoke the connection and the assistant stops mid-session.

## Transports

- **OAuth** - the hosted connection for Claude and ChatGPT. Paste the Voe MCP URL, approve the workspace in a browser, and return to the client.
- **HTTP** - bearer-token authenticated, where the deployment exposes it. Sessions are bound to the exact key that opened them.
- **stdio** - a local subprocess with `VOE_TOKEN` in its environment. Available for local Claude Desktop and Claude Code setups.

## Grounding posture

Over MCP, `think` defaults to **strict**: sentences the citation check cannot tie to a real source are withheld, and invented co-citations are scrubbed. An agent has no eyes on a UI's warning marks, so the text it receives is already checked.

Start: [OAuth connections](/mcp/oauth-connections) · [Tool reference](/mcp/tool-reference)
