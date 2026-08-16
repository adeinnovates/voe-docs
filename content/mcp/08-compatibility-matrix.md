---
title: Compatibility Matrix
description: What works where, today.
---

# Compatibility matrix

| Client / path | Transport | Status |
|---|---|---|
| Claude Desktop | stdio | Works — config block, `VOE_TOKEN` env |
| Claude Code | stdio | Works — `claude mcp add` or `.mcp.json` |
| Claude Desktop (remote servers) | HTTP bearer | Works — `https://mcp-uat.runvoe.com/` on the hosted UAT cell |
| ChatGPT (custom connectors) | HTTP bearer | Works — same URL, same bearer token |
| Any MCP client with stdio | stdio | Works — spawn the server with the env var |
| Any MCP client with HTTP + custom headers | HTTP bearer | Works where exposed |
| Clients requiring OAuth sign-in | — | Later — bearer is the shipped flow |
| Anything that can make HTTPS requests | [HTTP API](/api/authentication) | Always works — MCP is a convenience layer, not the only door |

Two rules that hold everywhere: one token is one assistant in one workspace, and revocation lands at the next call on every transport.
