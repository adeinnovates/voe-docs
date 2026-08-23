---
title: Privacy and Data Use
description: How Voe handles workspace material, limits access, uses external services, and supports hosted or self-hosted operation.
---

# Privacy and data use

Voe holds the material a workspace receives so it can build and serve that workspace's record. It does not need access to a person's mailbox, calendar account, social accounts, or the passwords for those services.

The same product can run as the hosted Voe service or as a self-hosted Voe cell. The product behavior described here applies to the dashboard, API, and MCP. Storage region, infrastructure encryption, retention periods, subprocessors, and deletion timing depend on how Voe is deployed.

## Where Voe runs

**Hosted Voe.** Voe operates the application, storage, background processing, dashboard, API, and MCP service. Account terms must state the applicable processing region, infrastructure providers, retention periods, backup expiry, and deletion timing.

**Self-hosted Voe.** A Voe cell can run in an environment controlled by the deploying organization. That organization controls its network, storage, encryption, backups, service credentials, model providers, transcription provider, retention policy, and who can administer the deployment. It is also responsible for updates, monitoring, recovery, and HTTPS termination.

Self-hosting changes who operates the infrastructure. The same workspace grants, evidence model, redaction behavior, and API and MCP access checks ship in both deployment modes.

## What Voe receives

Voe receives material through an explicit route:

- mail sent or forwarded to a provisioned Voe address
- texts and calls sent to a provisioned Voe number
- calendar events fetched from a read-only ICS or iCal feed the workspace owner subscribes
- authenticated captures submitted by an app, script, or agent
- files attached to captured material
- account and access records needed for sign-in, invitations, grants, and connected assistants

Voe does not hold mailbox passwords, mailbox OAuth tokens, social account sessions, or calendar account passwords. A calendar feed address is itself a credential: Voe stores it encrypted, uses it only to read that feed, and stops fetching when the feed is removed. The calendar provider can also revoke it by rotating the address.

## Protections built into Voe

Voe makes privacy controls part of ordinary product behavior rather than an optional mode.

**Named workspace access.** Every person, assistant, app, and service reads through its own identity and live workspace grant. A request cannot read another workspace simply because it reaches the same deployment.

**Revocation on the next request.** Removing a grant or disconnecting an assistant invalidates its Voe access. An existing MCP or API session does not preserve access that the workspace owner has removed.

**Protected credentials.** Calendar feed addresses and workspace-supplied model credentials are encrypted before storage. API tokens, setup links, invitation links, and similar one-time access values are stored in non-recoverable form where Voe only needs to compare them. They are shown in full only when the product must hand them to their owner.

**Encrypted connections.** Hosted dashboard, API, and remote MCP traffic use HTTPS. A self-hosted deployment publishes its own HTTPS endpoints and controls encryption for its storage volumes, snapshots, and backups.

**Held material and checked writes.** Capture rules can hold material before it enters the record. Agent writes pass through their grant and content checks, and a write containing a detected credential is refused.

**Evidence stays attached.** Voe keeps the original source and the record derived from it in the same workspace. Answers and search results can point back to the material that supports them. Derived material does not silently become original evidence.

**Recorded redaction.** An authorized redaction immediately removes the selected content from active reads, search, and derived relationships. Removal from Voe-managed record history then completes in the background. Voe preserves a signed record of who ordered the redaction, when it happened, and its stated basis, without preserving the removed content.

**Content-free operations data.** Health and throughput metrics do not contain captured workspace material. Administrative changes and refusals are recorded so access and removal decisions can be reviewed.

Voe also supports a workspace-controlled repository mirror where configured. This gives the workspace a portable copy of its record without making the assistant the system of record.

## What can leave Voe

Voe does not broadcast a workspace or copy it into every connected service. Material leaves through a request or connection someone has invoked or configured.

| Action | What is sent |
|---|---|
| Search, context, graph, and timeline | Results return to the authenticated caller. These reads do not require a generative model call. |
| Think | The question, a selected context bundle, and recent follow-up turns are sent to the model service configured for the workspace. The whole workspace is not sent. |
| Difficult message extraction | When mechanical parsing cannot produce a supported record, the material needed to repair that extraction may be sent to the configured model service. |
| Audio transcription | The recording is sent to the transcription service configured for the deployment. |
| MCP or API read | The requested result is returned to the calling app or assistant. Its handling after receipt is governed by that service. |
| Event subscription or repository mirror | Workspace material is sent only to the destination explicitly configured for that workspace. |

Voe does not use workspace material to train a Voe model. External model and transcription services process only the material needed for the feature being used. Their retention and data-use commitments are separate from Voe's product behavior. People using hosted Voe should confirm them in their Voe account terms. Self-hosted deployments choose and contract with their own providers.

## One workspace, named access

Each workspace is a separate memory. Every person, assistant, app, or service reads through its own identity and live workspace grant.

- Typing an email address into an invitation does not grant access. Access begins only after the recipient accepts.
- Guest access needs an end date.
- API keys bind one identity to one workspace and one requested scope.
- Effective capability is the lower of the key's scope and the live grant.
- Revocation applies on the next request. An existing session does not preserve removed access.

Voe keeps the original source material and the records derived from it inside the same workspace. Reads do not cross between workspaces.

## What changes when an assistant connects

Connecting Claude, ChatGPT, or another MCP client does not copy the workspace into that client. It creates a named assistant connection with read access to one workspace. The client receives material only when it calls a Voe tool.

The client may ask before each tool call, depending on its own permission setting. That setting does not replace Voe's grant:

- OAuth connections begin with read access.
- Write access is a separate, expiring grant from the workspace owner.
- A write can be limited by record type, path, source tier, mode, and end time.
- Disconnecting the assistant removes its workspace grant, keys, OAuth tokens, pending authorization codes, and write authority together.

Once Voe returns material to an assistant, that assistant provider processes the response under its own account terms. Review those terms before allowing the client to call tools without asking.

## What builders control

The API and MCP expose the same workspace record. Builders decide which consumers receive credentials and which routes they can use.

- Keep bearer tokens on the server or in the client's protected credential store. Do not place them in browser code, URLs, logs, or analytics.
- Issue the lowest scope needed for the job.
- Give each app and assistant its own identity instead of sharing a key.
- Treat API and MCP responses as workspace content in the builder's own logs, caches, prompts, and support tools.
- Revoke a connection when the integration ends. Revocation is enforced on its next call.

Client-side approval prompts are additional consent in the client. They do not widen or narrow the access Voe grants.

## Stopping access and removing material

These actions are different and Voe keeps them distinct:

| Action | Result |
|---|---|
| Remove an address or calendar feed | Stops future capture from that route. Existing records remain. |
| Revoke a person or disconnect an assistant | Ends that identity's access on its next request. Workspace material remains. |
| Redact a record | Immediately removes its content from active reads, search, and derived relationships. Historical removal completes in the background. A signed record of the redaction remains. |
| Archive a workspace | Stops active use. Archiving is not erasure. |

Record redaction is available through the admin-scoped API. Whole-workspace erasure is not currently a self-service dashboard action. People using hosted Voe should confirm retention, backup expiry, workspace closure, and erasure timing in their Voe account terms. Self-hosted deployments set and operate those policies themselves.

## Before production use

A technical integration cannot answer every privacy question. Before a production workspace receives regulated, confidential, or residency-restricted material, confirm:

- where processing and storage occur
- which model, transcription, mail, telephony, and infrastructure providers are enabled
- each provider's retention and training terms
- how logs, snapshots, and backups are encrypted and retained
- how workspace export, closure, and erasure are handled
- the applicable incident notice and data-processing terms

People using hosted Voe should find these commitments in their Voe account terms. Self-hosted organizations set them through their own deployment and provider agreements. The product behavior described on this page remains the same across the dashboard, API, and MCP.
