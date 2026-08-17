---
title: Workspaces And Principals
description: One workspace is one memory. Principals get access through live grants.
---

# Workspaces and principals

**One workspace is one memory.** Everything captured for a user lands in their workspace: its own raw store, its own page record, its own index, its own grants. Nothing crosses workspaces; workspace access controls enforce that on every read and write.

A **principal** is whoever is asking: a person (`email:dele@example.com`), a connected assistant (`agent:claude-desktop`), or a service integration. Principals hold **grants**, and a bearer token is only ever as capable as the live grant behind it. Revocation and expiry take effect at the next call, not the next login.

## Workspace access

Roles define what a principal can do inside one workspace:

| Role | Reads | Writes | Administers |
|---|---|---|---|
| owner | everything | through checked paths | grants, channels, plan, settings |
| member | everything | nothing directly | nothing |
| guest | everything, until an end date | nothing | nothing |
| agent | what its person reads | only under a live write grant | nothing |

## How principals arrive

- **People are invited.** An owner creates an invitation; the grant is written when the person accepts with a verified email - never when an address is typed. See [Share a workspace](/guides/share-a-workspace).
- **Assistants are connected.** A connection writes the agent's grant and key together, so an assistant can never exist as a bare token that reads nothing. See [Connect over MCP](/guides/connect-over-mcp).
- **Service integrations use issued credentials.** Service access is scoped to the workspace and remains bounded by the live grant.

Next: [Grants](/concepts/grants) · [Checked writes](/concepts/checked-writes)
