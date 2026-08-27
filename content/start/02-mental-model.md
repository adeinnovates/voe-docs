---
title: Mental Model
description: How Voe separates the user's world, the record, memory, context, and the agent that reads it.
---

# Mental model

Voe is a memory of the user's world, independent of the agent or model that reads from it.

Most agent products start with a conversation: the user tells the agent something, the agent stores a note, and later it recalls that note. Voe starts earlier. It asks what reached the user in the first place: the mail, text, voicemail, event, document, app event, attachment, and thread that make up the work itself.

::mermaid
flowchart LR
  W["User's world<br/>email, texts, voicemail<br/>calendar, app events"] --> C["Capture<br/>addressed or subscribed sources"]
  C --> R["The record<br/>original material first"]
  R --> M["Memory<br/>people, threads, timeline<br/>gaps, evidence"]
  M --> Q["Read side<br/>search, context, think"]
  Q --> A["Chosen intelligence<br/>assistant, agent, app"]
::

The order matters: the world comes in, Voe keeps the record, memory is derived from the record, and agents read from that memory.

## Four rules

These rules carry through the API, MCP, and dashboard:

1. **Raw first.** Original material precedes interpretation.
2. **Evidence travels.** What Voe says can resolve back toward what arrived.
3. **Gaps stay visible.** Missing, unreadable, stale, or uncertain material is named.
4. **Reading does not imply writing.** Workspace access and write authority are separate.

## 1. The world comes in

Material enters through addressed or deliberately subscribed sources: mail to provisioned addresses, texts and calls to provisioned numbers, provider-issued read-only calendar feeds, and authenticated capture from apps. Voe does not need mailbox OAuth or account scraping to hear what is addressed to it.

This makes capture part of the product, not a pre-step. An agent cannot retrieve a message that never entered the memory.

## 2. The record comes first

Original material is kept before extraction. Pages, relationships, attachment text, summaries, and searchable passages are derived from that record.

That gives builders a simple rule: memory is useful only when a reader can inspect why it believes a thing. Voe answers with citations because the original material remains available as evidence.

## 3. Memory is organized record

Memory is not just similarity search over stored text. Voe keeps people, organizations, threads, timelines, attachments, source state, and gaps as part of the workspace's state.

That is why a useful answer can say more than "here are five nearby passages." It can say what the record contains, what source supports it, and what the record does not yet hold.

## 4. Context is the bridge

`search` finds matching records. `context` packs records for an agent. `think` produces a cited answer from that packed context.

The important primitive for builders is `context`: it turns the larger memory into a bounded, source-carrying bundle that any model or agent can use.

## 5. Agents act elsewhere

Voe has no hands. It does not send, reply, book, post, remind, or notify. Tools and agents built above Voe can act, but Voe stays the memory they read from.

That split keeps the system legible: memory answers what happened; intelligence reasons over it; authority decides whether an action or write is allowed.

These are separate decisions: whether material may enter the record, what intelligence may infer from it, what may be written back, and what an external agent may do. Evidence rules discipline shared memory without narrowing the assistant's reasoning.

## 6. Writes return through checks

An agent can add or amend records only through a write grant. The write carries authority, preconditions, evidence, and a recorded decision. Workspace access is not write authority.

The result is a record that can grow from both the user's world and authorized agents, without letting generated conclusions silently redefine what happened.

## Builder takeaway

Use Voe when the hard part is not the model prompt, but the living memory underneath it. Route sources into a workspace, call `search`, `context`, or `think`, and let the agent you choose read from a record that can cite itself and name its gaps.

Next: [Quickstart](/start/quickstart) or [Architecture in five minutes](/start/architecture-in-five-minutes).
