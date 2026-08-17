---
title: Provision A Workspace Per User
description: Workspace bootstrap, invitation claim handoff, and plan realities.
---

# Provision a workspace per user

**For:** builders giving each end user their own memory. **Before you start:** provisioning is an operator-plane act - you need a provision-scoped operator session on your cell.

## The flow

1. **Account and plan.** An account (tenant) holds workspaces and one active plan - the allowance provisioning and intake draw from (email routes, numbers, storage, repair budget). Create or reuse one: `POST /v1/operator/accounts`.
2. **Workspace + setup link.** `POST /v1/invitations` creates the workspace and returns a single-use setup link bound to the invited email. **You send the link - Voe never emails anyone.**
3. **The user claims it.** At `/setup` they prove control of the invited address and mint their own admin token. The operator never holds the user's key.
4. **First-run.** The claimed session walks address provisioning, first capture, and assistant connection.

```bash
curl -s -X POST "$VOE/v1/invitations" \
  -H "x-voe-operator-session: $OPS" -H "Content-Type: application/json" \
  -d '{"invitedEmail":"person@example.com","slug":"acme","name":"Acme","tenantName":"Acme"}'
```

**Response shape:** `{ invitation, setupToken }`. The token appears once and is stored in non-recoverable form.

## Server-side alternative

Automated flows can call `POST /v1/workspaces` directly (operator session, provision scope) and receive the workspace plus owner token in-band - appropriate when your backend custodies the relationship.

:::warning
A workspace refuses intake without an active plan, and provisioning refuses under an archived account. Quota is enforced at provisioning and capture, not at read.
:::

**Next:** [Route email in](/guides/route-email-into-voe) · [Share a workspace](/guides/share-a-workspace)
