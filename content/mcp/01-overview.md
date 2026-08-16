---
title: MCP Overview
description: The same engine as the API, exposed as tools — one token, one principal, one workspace.
---

# MCP overview

Voe's MCP server exposes the same engine contract as the HTTP API — search, context, think, graph, timeline, capture, and checked writes — as tools an assistant calls directly. Nothing is a separate implementation: a tool call and its API twin hit the same code.

**One token maps to one principal and one workspace.** The assistant is a connected `agent:` principal; its capability is its live grant's, re-checked on every tool call. Revoke the connection and the assistant stops mid-session.

## Transports

- **stdio** — a local subprocess with `VOE_TOKEN` in its environment. The current path for Claude Desktop and Claude Code.
- **HTTP** — bearer-token authenticated, where the deployment exposes it. Sessions are bound to the exact key that opened them.
- **OAuth** — later. Bearer tokens are the shipped flow.

## Grounding posture

Over MCP, `think` defaults to **strict**: sentences the mechanical citation check cannot tie to a real source are withheld, invented co-citations are scrubbed, and the result carries the `sources` allowlist so the calling agent can verify every bracket itself. An agent has no eyes on a UI's warning marks — so the text it receives is already checked.

Start: [Bearer token setup](/mcp/bearer-token-setup) · [Tool reference](/mcp/tool-reference)
