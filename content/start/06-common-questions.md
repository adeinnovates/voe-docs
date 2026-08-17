---
title: Common Questions
description: Builder answers about capture, evidence, MCP, grants, writes, and deployment.
---

# Common questions

## Is Voe an agent?

No. Voe is the memory an agent reads from. It hears, remembers, searches, packs context, answers when asked, and cites the record. It does not send, reply, book, post, or perform actions.

## What can a builder build on top of Voe?

Build the agent, workflow, app, or assistant experience. Voe supplies intake, memory, retrieval, context packing, cited answers, gaps, grants, and checked writes.

## How does material enter Voe?

Through addressed or deliberately subscribed sources: provisioned email addresses, provisioned SMS and voice numbers, provider-issued read-only calendar feeds, authenticated app capture, and attachments on captured records.

## Does Voe log into user accounts?

No. Voe receives what is addressed to it and fetches calendar feeds the user subscribes. It does not hold mailbox OAuth tokens, social account sessions, or account passwords.

## What is the record?

The record is the source material Voe received, kept before processing. Pages, relationships, searchable passages, summaries, and extracted attachment text are derived from it.

## How is memory different from evidence?

Memory is the organized workspace state: people, threads, timeline, relationships, source state, gaps, and records. Evidence is the material a reader can inspect to check a claim: original bytes, page text, attachment text, transcript text, and citations.

## What happens when Voe does not know?

It says what the memory does not hold. A gap can name a missing person, stale source, missing thread, contradiction, or unreadable attachment. Gaps close when later evidence fills them.

## Can agents write into Voe?

Yes, with write authority. An agent write needs a live grant, an allowed write type, preconditions, and a recorded decision. A read grant never becomes write authority by accident.

## How are roles, grants, and tokens different?

Roles describe the product relationship: owner, member, guest, agent, or support. Grants attach capability to a principal inside a workspace. Tokens are credentials; every request gets the lower capability of the token scope and the live grant.

## What is the support path?

Support is an operator principal with no tenant read path by default. A tenant-granted, expiring support grant is the bridge, and it is logged like any other grant.

## How do Claude and ChatGPT connect today?

Claude Desktop works through config-file MCP or the `mcp-remote` bridge. Claude Code can use stdio or HTTP with an `Authorization` header. Claude and ChatGPT connector screens use OAuth where the deployment exposes the Voe OAuth MCP path: a URL and browser approval, no key to paste. Any app that can make HTTPS requests can use the API today.

## Is MCP required?

No. MCP is a convenience layer for assistant clients. The HTTP API exposes the same memory primitives for apps, services, and agents that can send bearer-token requests.

## What leaves a cell?

Capture, search, context, grants, review, and the graph run without a model provider. Model providers receive retrieval content only for features that use a model, such as `think`, repair, enrichment, or transcription. Per-workspace provider keys keep that traffic on the tenant's chosen provider config.

## Does search require a model provider?

No. `search` and `context` work without a model key. `think` needs a configured model because it synthesizes an answer over the context bundle.

## What happens when an attachment cannot be read?

The attachment remains part of the record, but its readable state is explicit: stored, reading, readable, or failed reading. Context and think can report unreadable relevant attachments instead of pretending the attachment does not exist.

## Can one workspace serve multiple consumers?

Yes. Every consumer is a principal: a person, guest, agent, support principal, or service. Grants decide what each principal can read or write, and revocation applies on the next request.

## Where does a new builder start?

Read [Mental model](/start/mental-model), then run [Quickstart](/start/quickstart). After that, use [What ships today](/start/what-ships-today) and [Status and compatibility](/start/status-and-compatibility) before choosing API or MCP.
