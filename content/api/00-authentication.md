---
title: Authentication
description: Bearer tokens, scopes, roles, and the ceiling rule enforced on every request.
---

# Authentication

Every builder request carries a workspace bearer token:

```
Authorization: Bearer tok_…
```

A token binds one **principal** to one **workspace** at a **scope** (`read`, `write`, `admin`). Route pages state their required scope.

## The ceiling rule

Scope is a request; the live grant is the fact. On every request, effective capability is the **lower** of the token's scope and the ceiling of the principal's live workspace grant:

- owner → `admin` · member → `read` · guest → `read` (until its end date) · agent → `read`, or `write` while a live write grant exists · support → `read`, time-boxed.

Consequences you can rely on:

- A revoked or expired grant refuses the token at the **next request** - sessions are never grandfathered.
- An agent whose write authority lapses **keeps reading** and receives a distinct `403` on writes: the connection survives, the write does not.
- A key carrying more scope than its role allows is refused as an anomaly, not honored.

## Getting tokens

- **People** claim a setup or invite link and mint their own key. `POST /v1/tokens` mints additional keys for granted people, capped at the role's ceiling.
- **Assistants** get their key from `POST /v1/agent-connections`. Workspace access and key issuance happen together. Raw minting for `agent:` principals is refused by design.

## Failure shapes

| Status | Meaning |
|---|---|
| `401` | The key is not valid here - unknown, revoked, or another workspace's |
| `403` | The key is real but its grant is gone, expired, or below the route's scope; the message says which |

Errors are JSON: `{ "status": "error", "message": "…", "error": "…" }` - the message is written for the person holding the key.
