---
title: Data Perimeter
description: What enters, what never leaves, and who can see what.
---

# Data perimeter

These are deployment guarantees, not positioning claims.

**What enters.** Only addressed traffic (mail to provisioned addresses, texts and calls to provisioned numbers), deliberately subscribed calendar feeds, and authenticated captures. There are no provider logins to leak because none are held; calendar URLs are stored encrypted and are revocable at the provider.

**What never leaves.** Voe originates no outbound messages on any channel. Model providers receive retrieval content only when a workspace uses `think` or repair; a workspace's provider config keeps that traffic on keys the tenant chose.

**Who sees what.** Every read is resolved against live workspace grants. Operators hold no read path into tenant content; the single bridge is a tenant-granted, time-boxed `support` grant, logged like any grant. `/healthz` reports access-control drift.

**Secrets.** Bodies are scanned before write; a credential-bearing agent write is rejected. Tokens, invitation links, and setup links are stored in non-recoverable form. Recovery flows prove control of an inbox before minting anything.

**Deletion and redaction.** Nothing deletes on its own. Redaction is an explicit, recorded act that tombstones the page and removes derived material - provenance of the act is preserved.
