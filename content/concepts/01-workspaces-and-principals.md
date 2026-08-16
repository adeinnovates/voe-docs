---
title: Workspaces And Principals
description: One workspace is one memory. Principals get access through grants, on two distinct planes.
---

# Workspaces and principals

**One workspace is one memory.** Everything captured for a user lands in their workspace: its own raw store, its own page repository, its own index, its own grants. Nothing crosses workspaces; row-level security enforces that at the database, not in application code.

A **principal** is whoever is asking: a person (`email:dele@example.com`), a connected assistant (`agent:claude-desktop`), or the internal service principal. Principals hold **grants**, and a bearer token is only ever as capable as the live grant behind it — capability is re-derived from the grant on every request, so revocation and expiry take effect at the next call, not the next login.

## The two access planes

**Workspace plane.** Roles in `workspace_grants` define what a principal can do inside one workspace:

| Role | Reads | Writes | Administers |
|---|---|---|---|
| owner | everything | through checked paths | grants, channels, plan, settings |
| member | everything | nothing directly | nothing |
| guest | everything, until an end date | nothing | nothing |
| agent | what its person reads | only under a live write grant | nothing |
| support | tenant content only under an explicit, time-boxed grant | nothing | nothing |

**Operator plane.** Operator principals administer platform shape — tenants, plans, cells — and hold no workspace grants and no read path into tenant content, by construction. The only bridge is `support`: an operator principal enters one workspace only when that tenant explicitly grants it, time-boxed and logged like any other grant.

## How principals arrive

- **People are invited.** An owner creates an invitation; the grant is written when the person accepts with a verified email — never when an address is typed. See [Share a workspace](/guides/share-a-workspace).
- **Assistants are connected.** A connection writes the agent's grant and key together, so an assistant can never exist as a bare token that reads nothing. See [Connect over MCP](/guides/connect-over-mcp).
- **Support is granted by name.** Only an enabled operator principal can hold it, and only with an end date.

Next: [Grants](/concepts/grants) · [Checked writes](/concepts/checked-writes)
