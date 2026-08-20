---
title: OAuth Connections
description: How a cell authorizes Claude and ChatGPT connectors over OAuth.
---

# OAuth connections

Claude and ChatGPT connector screens use OAuth where remote MCP authentication is required. A Voe cell can expose its own OAuth MCP path, so connecting is a URL and a browser approval, no key to copy.

## An OAuth token is a projection of a connection

The token a connector receives is not a second kind of workspace relationship. Approving the consent screen creates an `agent:` connection for one grant, one principal, and one workspace. Calls are resolved against the live grant. Three properties follow:

- **Read by default.** Consent grants read. Write stays a deliberate act - an owner attaches a write grant from Sharing afterward, never the connector screen.
- **Audience-bound.** An access token is honored at the cell's MCP URL and refused elsewhere.
- **Revoked at Sharing.** Removing the connection ends its tokens at the next call, the same revocation every assistant already has.

## Voe is the provider, not a client

This is Voe issuing OAuth for its own memory. It is not Voe logging into anything of the user's - no mailbox OAuth, no account custody. Voe [holds no logins](/start/what-is-voe); becoming an authorization server for connecting agents does not change that.

## What the connector discovers

The hosted cell publishes the authorization service and MCP resource through standard OAuth discovery. The MCP URL shown on the Voe Connect page is the value a user pastes into the connector.

OAuth discovery and consent must remain reachable through any network service in front of the cell.

## How a user connects

1. In the connector screen, paste the cell's MCP URL (`https://mcp.your-voe-cell.example/`). Leave authentication on OAuth; there is no client secret to enter.
2. The connector opens Voe's consent screen. The user signs in with an email code - the same login the dashboard uses - and picks a workspace they own.
3. Approve. The connector receives its tokens and lists the tools. The connection appears in Sharing, named for the client, revocable like any other.

## Start using the connection

Enable Voe for a conversation and ask in ordinary language. For example: "Search my Voe memory for the latest Loci discussion" or "Use Voe's cited synthesis to prepare me for my next meeting."

The client chooses the matching tool and may ask for approval before the call. See the [MCP tool reference](/mcp/tool-reference) for all nine tools and examples that name each one directly.

Bearer over [HTTP MCP](/mcp/http-mcp) and stdio remain supported. OAuth is an added door for clients that require browser sign-in.
