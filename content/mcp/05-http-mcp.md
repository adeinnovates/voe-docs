---
title: HTTP MCP
description: The bearer-token HTTP transport and its session rules.
---

# HTTP MCP

Where the deployment exposes it (`GET /v1/config` publishes the URL as `mcpHttpUrl`), clients connect over streamable HTTP with a bearer header. A deployed cell might publish:

```
https://mcp.your-voe-cell.example/
Authorization: Bearer tok_…
```

This endpoint serves any client that can attach that header itself: Claude Code (`claude mcp add --transport http --header`), SDK agents, and gateways. The two big chat apps do not attach a bearer — their connector screens take an OAuth server or nothing — so they reach this same endpoint over [OAuth](/mcp/oauth-connections), where an access token is a projection of the same connection a bearer would open. Claude Desktop can also bridge to it through [`mcp-remote`](/mcp/claude-desktop). The [compatibility matrix](/mcp/compatibility-matrix) carries the current state per client.

## Session rules

- The `initialize` request opens a session; the response's `mcp-session-id` accompanies subsequent calls.
- **A session belongs to the exact key that opened it.** A different key — even an equally valid one for the same principal — is refused with `401` and must open its own session. Tool authorization runs against the opening key's live grant, so this rule is what prevents a lower-scoped key from riding a higher-scoped session.
- Every request re-authenticates; every tool call revalidates against the live grant. Revocation lands mid-session.

## Failure shapes

| Response | Meaning |
|---|---|
| `401` "not valid here" | Unknown or revoked key |
| `401` "no longer connected" | Key resolves but its grant is gone |
| `401` "different key" | Session id presented with a different bearer |

An [OAuth](/mcp/oauth-connections) session binds to the connection rather than the exact token, so a rotated access token continues the same session while another connection's token is refused. Bearer is the shipped header flow; OAuth is the connector flow.
