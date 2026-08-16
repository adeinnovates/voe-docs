---
title: Compatibility Matrix
description: What works where, today.
---

# Compatibility matrix

Checked against both vendors' client documentation in August 2026.

| Client / path | Transport | Status |
|---|---|---|
| Claude Desktop | stdio | Works — config block, `VOE_TOKEN` env |
| Claude Desktop → hosted endpoint | stdio bridge (`mcp-remote`) | Works — [bridge JSON](/mcp/claude-desktop) carrying the bearer header |
| Claude Code | stdio or HTTP | Works — `claude mcp add`, HTTP with `--header` |
| Claude custom connectors (Desktop, web, mobile) | HTTP + [OAuth](/mcp/oauth-connections) | Built, pending final client acceptance — the cell runs the OAuth flow; until it is verified against the live client, the [config-file path](/mcp/claude-desktop) is the proven route |
| ChatGPT (custom connectors, developer mode) | HTTP + [OAuth](/mcp/oauth-connections) | Built, pending final client acceptance — OAuth is the only path for ChatGPT, which takes no token or local server; the cell implements it end to end |
| Any MCP client with stdio | stdio | Works — spawn the server with the env var |
| Any MCP client that can set an `Authorization` header | HTTP bearer | Works where the cell exposes HTTP MCP |
| Anything that can make HTTPS requests | [HTTP API](/api/authentication) | Always works — MCP is a convenience layer, not the only door |

Bearer is the shipped flow for clients that can attach a header; [OAuth](/mcp/oauth-connections) is built for the two connector rows and awaits only acceptance against the live clients.

Two rules that hold everywhere: one token is one assistant in one workspace, and revocation lands at the next call on every transport.
