---
title: OAuth Connections
description: How a cell authorizes Claude and ChatGPT connectors over OAuth — a projection of an agent connection.
---

# OAuth connections

The two flagship chat connectors take an OAuth server or nothing. Claude's **Add custom connector** screen authenticates by OAuth or no authentication; ChatGPT's custom connectors offer OAuth or authless, with no token field at all. Neither accepts a pasted bearer. So a cell runs its own OAuth authorization server, and connecting Claude or ChatGPT is a URL and a browser approval — no key to copy.

## An OAuth token is a projection of a connection

The token a connector receives is not a second kind of credential. Approving the consent screen mints the same `agent:` connection the [Connect page](/mcp/bearer-token-setup) mints — one grant, one principal, one workspace — and the access token resolves to that connection with the live grant re-checked on every call, exactly as a bearer key does. Three properties follow:

- **Read by default.** Consent grants read. Write stays a deliberate act — an owner attaches a write grant from Sharing afterward, never the connector screen.
- **Audience-bound.** An access token is honored at the cell's MCP URL and refused everywhere else. A pasted bearer works on any route; an OAuth token does not leave its one door.
- **Revoked at Sharing.** Removing the connection kills its tokens at the next call, the same revocation every assistant already has. Refresh tokens rotate on use, and reusing a rotated one revokes the whole family.

## Voe is the provider, not a client

This is Voe issuing OAuth for its own memory. It is not Voe logging into anything of the user's — no mailbox OAuth, no account custody. Voe [holds no logins](/start/what-is-voe); becoming an authorization server for connecting agents does not change that.

## What a deployer configures

The flow rides configuration the cell already has:

| Variable | Role in OAuth |
|---|---|
| `VOE_PUBLIC_BASE_URL` | The issuer — serves the authorization, token, and registration endpoints and the consent screen |
| `VOE_MCP_HTTP_URL` | The canonical resource every access token is bound to (`/v1/config` publishes it) |

Two discovery documents are served without auth: `GET /.well-known/oauth-authorization-server` on the issuer, and `GET /.well-known/oauth-protected-resource` on the MCP host. An unauthenticated MCP request answers `401` with a `WWW-Authenticate: Bearer resource_metadata=…` header pointing at the second — the handshake a connector follows to find where to sign in. If a CDN or WAF fronts the cell, let the `/.well-known/*` and `/oauth/*` paths through unchallenged.

## How a user connects

1. In the connector screen, paste the cell's MCP URL (`https://mcp.your-voe-cell.example/`). Leave authentication on OAuth; there is no client secret to enter.
2. The connector opens Voe's consent screen. The user signs in with an email code — the same login the dashboard uses — and picks a workspace they own.
3. Approve. The connector receives its tokens and lists the tools. The connection appears in Sharing, named for the client, revocable like any other.

Clients identify themselves by a Client ID Metadata Document or dynamic registration; the cell handles both. PKCE is required.

## Status

The authorization server is built and tested end to end — discovery, consent on the login path, PKCE, audience-bound access tokens, and refresh rotation all run and are covered by the cell's test suite. The remaining step is acceptance against the live Claude and ChatGPT clients on a deployed cell. Until that passes, the [compatibility matrix](/mcp/compatibility-matrix) marks the connector rows *built, pending final client acceptance*, and the proven route for Claude Desktop stays the [config-file path](/mcp/claude-desktop). Bearer over [HTTP MCP](/mcp/http-mcp) and stdio are unchanged and remain supported — OAuth is an added door, not a replacement.
