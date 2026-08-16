---
title: Workspace Sharing Flow
description: Invite a colleague, a time-boxed guest, and an assistant — three doors, three mechanisms.
---

# Workspace sharing flow

**The scenario:** an owner shares one memory with a colleague (member), an outside counsel (guest, three weeks), and their own assistant.

**Colleague:** `POST /v1/grant-invitations {role: "member"}` → send the link yourself → they accept with a verified email → the grant exists from that moment, not before. A typo'd address produces a pending invitation nobody accepts — never a live grant.

**Counsel:** same door with `role: "guest"` and `grantExpiresAt` — refusal without an end date is the API working. Access ends on its own; no cleanup task.

**Assistant:** never invited — connected. `POST /v1/agent-connections` writes grant and key together; disconnecting removes both plus any write authority.

**What the owner sees:** Sharing lists people with access, pending invitations (separately — offered is not granted), and connected assistants, each with its capability in plain words and a revoke that lands at the next request.

**What this proves:** the access model runs on three invariants — people accept, assistants connect, support is operator-by-name — and every path to membership enforces its own rules.
