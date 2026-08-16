---
title: Compatibility Matrix
description: What works where, today.
---

# Compatibility matrix

Verified against both vendors' client documentation in August 2026.

| Client / path | Transport | Status |
|---|---|---|
| Claude Desktop | stdio | Works — config block, `VOE_TOKEN` env |
| Claude Desktop → hosted endpoint | stdio bridge (`mcp-remote`) | Works — [bridge JSON](/mcp/claude-desktop) carrying the bearer header |
| Claude Code | stdio or HTTP | Works — `claude mcp add`, HTTP with `--header` |
| Claude custom connectors (Desktop, web, mobile) | HTTP | Not yet, for most — the connector screen speaks OAuth or authless; fixed-header auth is a slow-rollout beta where an org admin enters the bearer as a request header |
| ChatGPT (custom connectors, developer mode) | HTTP | Not yet — ChatGPT accepts OAuth or authless servers only, with no token or header field, and no local-server option. Connecting ChatGPT requires Voe's OAuth sign-in, which is later |
| Any MCP client with stdio | stdio | Works — spawn the server with the env var |
| Any MCP client that can set an `Authorization` header | HTTP bearer | Works where exposed — `https://mcp-uat.runvoe.com/` on the hosted UAT cell |
| Anything that can make HTTPS requests | [HTTP API](/api/authentication) | Always works — MCP is a convenience layer, not the only door |

Bearer is the shipped flow; OAuth sign-in is later, and it is what gates the two rows marked "not yet."

Two rules that hold everywhere: one token is one assistant in one workspace, and revocation lands at the next call on every transport.
