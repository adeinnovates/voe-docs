---
title: Grants
description: Workspace access and write authority are different things. Roles, tokens, and the ceiling rule.
---

# Grants

Two separate questions, two separate mechanisms:

1. **Who may reach this workspace, and as what?** → workspace grants (roles).
2. **What may an agent write?** → write grants (authority). Having the first never implies the second.

## Roles and their ceilings

A token carries a scope (`read`, `write`, `admin`), but scope is a request, not a fact. On every call, effective capability is the **lower** of the token's scope and the live grant's ceiling:

| Role | Ceiling |
|---|---|
| owner | admin |
| member | read |
| guest | read, until its end date |
| agent | read — write only while a live write grant exists |
| support | read, operator principals only, time-boxed |

Revoke a grant and its tokens are refused at the next request. Let an agent's write grant lapse and the agent keeps reading — its role always promised that — but writes stop with a distinct message. A key carrying more than its role allows is refused as the anomaly it is.

## How each principal type gets a grant

- **People**: invitations. The grant is written on acceptance with a verified email, not when an address is typed. Guests require an end date — a guest is a member with an expiry, not a partial view.
- **Assistants**: connections. `POST /v1/agent-connections` writes the grant and mints the key in one transaction; revoking removes both plus any write authority. An assistant is always listed, always disconnectable.
- **Support**: the one direct grant. `POST /v1/grants` serves only `role: support`, only for enabled operator principals, only with an expiry.

## The two planes

Workspace roles govern life inside one workspace. Operator principals govern platform shape (tenants, plans, cells) and hold **no read path into tenant content** — the planes meet only at `support`, and only by the tenant's explicit, temporary grant. See [Workspaces and principals](/concepts/workspaces-and-principals).

Next: [Checked writes](/concepts/checked-writes) · [Share a workspace](/guides/share-a-workspace)
