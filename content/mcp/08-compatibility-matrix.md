---
title: Compatibility Matrix
description: What works where, today.
---

# Compatibility matrix

Client behavior changes over time. Treat this matrix as the current integration surface for a deployed Voe cell.

| Client / path | Transport | Status |
|---|---|---|
| Claude Desktop | stdio | Works - config block, `VOE_TOKEN` env |
| Claude Desktop → hosted endpoint | stdio bridge (`mcp-remote`) | Works - [bridge JSON](/mcp/claude-desktop) carrying the bearer header |
| Claude Code | stdio or HTTP | Works - `claude mcp add`, HTTP with `--header` |
| Claude custom connectors (Desktop, web, mobile) | HTTP + [OAuth](/mcp/oauth-connections) | Works where the client accepts the cell's OAuth MCP endpoint |
| ChatGPT (custom connectors, developer mode) | HTTP + [OAuth](/mcp/oauth-connections) | Works where the client accepts the cell's OAuth MCP endpoint |
| Any MCP client with stdio | stdio | Works - spawn the server with the env var |
| Any MCP client that can set an `Authorization` header | HTTP bearer | Works where the cell exposes HTTP MCP |
| Anything that can make HTTPS requests | [HTTP API](/api/authentication) | Always works - MCP is a convenience layer, not the only door |

Bearer is the shipped flow for clients that can attach a header; [OAuth](/mcp/oauth-connections) is the browser sign-in path for connector clients.

Two rules that hold everywhere: one token is one assistant in one workspace, and revocation lands at the next call on every transport.
