---
title: Share A Workspace
description: Invite links, pending and accepted grants, and revocation.
---

# Share a workspace

**For:** letting more people read one memory. **Scope:** `admin`.

## Invite, don't grant

Access begins when a person **accepts** - never when an address is typed:

```bash
curl -s -X POST "$VOE/v1/grant-invitations" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"invitedEmail":"dele@example.com","role":"member"}'
```

**Response:** a pending invitation and an invite link token - shown once, stored only as a hash. **You** send the link; Voe never emails anyone. The link works once, is bound to the invited address, and expires in 7 days. Re-inviting replaces the open invitation, so only the newest link works.

Roles: `member` (reads and asks), `guest` (the same, with a required end date), `owner`. Assistants are never invited - they are [connected](/guides/connect-over-mcp). Guests need `grantExpiresAt`.

## Acceptance

The link lands on `/invite`, which names the workspace, role, and end date **before** asking anything. Accepting requires signing in at the invited address - the link proves possession of a URL; the sign-in proves control of the inbox. Then the grant is written, once.

## Lifecycle

`GET /v1/grant-invitations` shows pending / accepted / expired / revoked. Cancel a pending one (`DELETE /v1/grant-invitations/:id`) and the link goes dead having granted nothing. Revoke an accepted person's access with `DELETE /v1/grants/:principal` - effective at their next request.

## Owner control

People are invited. Assistants are connected. Active access is visible to the owner and revocation lands on the next request.

**Next:** [Grants](/concepts/grants)
