---
title: Provision A Workspace Per User
description: Workspace bootstrap and setup-link handoff.
---

# Provision a workspace per user

**For:** builders giving each end user their own memory.

## The flow

1. **Workspace created.** A workspace is created for the user and attached to an active plan.
2. **Setup link issued.** The setup link is single-use, bound to the invited email, and shown once. **You send the link - Voe never emails anyone.**
3. **The user claims it.** At `/setup` they prove control of the invited address and mint their own owner token.
4. **First-run.** The claimed session walks address provisioning, first capture, and assistant connection.

## Public contract

- A workspace has one memory, its own grants, and its own channel addresses.
- A setup link grants nothing until the invited person claims it with the invited email.
- The owner token appears once and is stored in non-recoverable form.
- Intake refuses when the workspace has no active plan.

## Server-side alternative

Server-side bootstrap can return the workspace and owner credential to a backend that already owns the customer relationship. The same grant and plan checks apply.

**Next:** [Route email in](/guides/route-email-into-voe) · [Share a workspace](/guides/share-a-workspace)
