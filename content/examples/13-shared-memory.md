---
title: Shared Memory, Multiple Principals
description: One memory, several principals - shared evidence without shared credentials.
---

# Shared memory, multiple principals

**The lesson:** one memory can serve several people and assistants at once, each a separate principal with its own grant, sharing the evidence without ever sharing a credential.

**The scenario:** an owner shares one memory with a colleague (member), an outside counsel (guest, three weeks), and their own assistant.

**Colleague:** `POST /v1/grant-invitations {role: "member"}`, then send the link yourself; they accept with a verified email, and the grant exists from that moment, not before. A typo'd address produces a pending invitation nobody accepts, never a live grant.

**Counsel:** the same door with `role: "guest"` and an expiry. A guest grant without an end date is refused, and that refusal is the API working. Access ends on its own; there is no cleanup task.

**Assistant:** never invited, connected. `POST /v1/agent-connections` creates the connection and its key together; disconnecting removes workspace access and any write authority in one act.

**What the owner sees:** Sharing lists people with access, pending invitations separately, and connected assistants, each with its capability in plain words and a revoke that lands at the next request.

**Enforced, not promised:** every principal is scoped by the database, not by application code remembering to check. Three people and one assistant read the same evidence; none of them holds anyone else's key.

Sharing a memory is usually where credentials start leaking. Here the thing shared is the evidence, and the thing never shared is the key, which is the only version of shared access worth building on.
