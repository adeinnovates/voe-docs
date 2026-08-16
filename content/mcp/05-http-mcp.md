---
title: HTTP MCP
description: The bearer-token HTTP transport and its session rules.
---

# HTTP MCP

Where the deployment exposes it (`GET /v1/config` publishes the URL as `mcpHttpUrl`), clients connect over streamable HTTP with a bearer header. On the hosted UAT cell that URL is:

```
https://mcp-uat.runvoe.com/
Authorization: Bearer tok_…
```

This is the endpoint Claude Desktop's remote-server support and ChatGPT's custom connectors point at.

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

OAuth/browser sign-in is later; bearer is the shipped flow.
