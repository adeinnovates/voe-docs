---
title: Status And Compatibility
description: Assistant client compatibility, bearer-token MCP, deployment notes, and known limits.
---

# Status and compatibility

## MCP transports

- **stdio** - works with any client that can spawn a local process and pass an environment variable. This is the current path for Claude Desktop and Claude Code.
- **HTTP** - bearer-token authenticated, session-bound. Works where the deployment exposes the MCP HTTP endpoint and the client supports custom headers. A session belongs to the exact key that opened it; a different key must open its own session.
- **OAuth / browser sign-in** - the path for Claude and ChatGPT connector flows where the deployment exposes the Voe OAuth MCP path. A connector token maps back to an agent connection. See [OAuth connections](/mcp/oauth-connections).

## Client notes

Client support varies. The API path works anywhere that can make authenticated HTTPS requests. MCP is a convenience layer for assistant clients.

## Known limits

- Memory starts at capture. There is no historical import in v1; the record grows from the first routed message.
- Number availability is regional. SMS and voice depend on provider coverage per country.
- `think` requires a configured model provider on the cell; `search` and `context` do not.
- Strict mode buffers. `think` in strict mode returns after checking, so it does not stream token-by-token.

## Health

Every cell answers `GET /healthz` with `ok`, `attention` (something needs a person - for example held mail), or `degraded` (a real fault). Only faults degrade the service.
