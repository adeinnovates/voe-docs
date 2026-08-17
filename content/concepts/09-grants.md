---
title: Grants
description: Workspace access and write authority are different things. Roles, tokens, and the ceiling rule.
---

# Grants

Two separate questions, two separate answers:

1. **Who may reach this workspace, and as what?** → workspace grants (roles).
2. **What may an agent write?** → write grants (authority). Having the first never implies the second.

Workspace access is not write authority. A reader can search, build context, and ask from memory; it cannot add or amend records unless a live write grant allows that exact kind of write.

## Roles and their ceilings

A token carries a scope (`read`, `write`, `admin`), but scope is a request, not a fact. On every call, effective capability is the **lower** of the token's scope and the live grant's ceiling:

| Role | Ceiling |
|---|---|
| owner | admin |
| member | read |
| guest | read, until its end date |
| agent | read - write only while a live write grant exists |

Revoke a grant and its tokens are refused at the next request. Let an agent's write grant lapse and the agent keeps reading - its role always promised that - but writes stop with a distinct message. A key carrying more than its role allows is refused as the anomaly it is.

## How each principal type gets a grant

- **People**: invitations. The grant is written on acceptance with a verified email, not when an address is typed. Guests require an end date - a guest is a member with an expiry, not a partial view.
- **Assistants**: connections. `POST /v1/agent-connections` creates workspace access and a one-time key together; revoking removes both plus any write authority. An assistant is always listed, always disconnectable.
- **Service integrations**: issued credentials. Service access is scoped to the workspace and checked like any other grant.

Next: [Checked writes](/concepts/checked-writes) · [Share a workspace](/guides/share-a-workspace)
