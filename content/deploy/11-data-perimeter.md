---
title: Data Perimeter
description: What enters, what never leaves, and who can see what — as mechanisms.
---

# Data perimeter

Each claim below is a mechanism, not a policy statement.

**What enters.** Only addressed traffic (mail to provisioned addresses, texts and calls to provisioned numbers), deliberately subscribed calendar feeds, and authenticated captures. There are no provider logins to leak because none are held; calendar URLs are stored encrypted and are revocable at the provider.

**What never leaves.** Voe originates no outbound messages on any channel — there is no send path in the codebase. Model providers receive retrieval content for synthesis when a workspace uses `think` or repair; a workspace's own provider config keeps that traffic on keys the tenant chose.

**Who sees what.** Row-level security resolves every query against live workspace grants — enforcement in the database, not the application. Operators hold no read path into tenant content; the single bridge is a tenant-granted, time-boxed `support` grant, logged like any grant. The RLS self-test runs in `/healthz` continuously.

**Secrets.** Bodies are scanned before write; a credential-bearing agent write is rejected. Tokens are stored as hashes; invitation and setup links are single-use, expiring, hash-stored. Recovery flows prove control of an inbox before minting anything.

**Deletion and redaction.** Nothing deletes on its own. Redaction is an explicit, recorded act that tombstones the page and removes derived material — provenance of the act is preserved.
