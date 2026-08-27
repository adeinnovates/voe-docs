---
title: "Voe as World Memory"
description: Voe gives people and organizations an evidence-backed memory of the world around them, independent of the assistants they choose.
date: 2026-08-24
author: Voe team
tags:
  - memory
  - architecture
  - privacy
excerpt: Voe keeps what reached a person or organization, gives it meaning, and prepares cited context for every authorized assistant.
pinned: true
---

# Voe as World Memory

## The Core Idea

An assistant can be highly intelligent and still know almost nothing about your world.

It knows what appears in the current conversation. It may remember facts extracted from earlier chats. But the email that arrived this morning, the commitment made by text, the document attached to a forwarded message, and the meeting that moved may never reach it.

Voe gives intelligence a memory beyond the chat.

Addressed email, SMS, voicemail, calendar feeds, documents, and application events enter a workspace as life and work unfold. Voe keeps the source, connects the material to the people and subjects it concerns, preserves how the record changes, and prepares cited context for any authorized assistant.

You do not have to explain the same world again each time you change models, open a new chat, or introduce a specialist agent.

The intelligence can change. The memory remains.

## What World Memory Means

World memory is not a database abstraction, a document repository, or a replacement for the software where work happens.

It is a longitudinal memory of what a person, team, or organization has encountered.

A CRM may hold the current stage of a deal. An inbox holds messages. A calendar holds scheduled events. A payment system holds transactions. Each application knows the part of the world that passed through it.

Voe remembers across those fragments.

It can connect a person mentioned in an email to a meeting, a document, an earlier promise, a later correction, and an open question. It retains the evidence behind those connections and prepares the relevant part of that history when an assistant needs it.

World memory also does not mean knowing everything. Voe knows only what has been addressed, forwarded, subscribed, or submitted to a workspace. What never arrived remains unknown, and the record says so.

## The Mental Model

The architecture follows a clear order.

### 1. The world comes in

Material enters through addressed capture.

Email can be forwarded to a workspace without giving Voe access to an entire mailbox. SMS and voicemail arrive through an assigned number. Calendar information comes from feeds selected by the workspace owner. Applications submit events through authenticated, workspace-scoped capture endpoints.

Nothing has to pass through a conversation first.

### 2. Evidence comes first

Original material is written before extraction, summarization, or model use.

That material remains the evidence for what follows. Interpretation may improve how the memory can be searched and understood, but it does not replace the source.

### 3. The record acquires meaning

A collection of messages and files is not yet useful memory.

Voe resolves identities, threads, events, timelines, assertions, relationships, conflicts, and open questions. A later observation can amend or challenge an earlier reading without silently erasing it.

The result is an evidence-backed account of:

- what arrived
- who and what it concerns
- how events and records relate
- what changed over time
- what the evidence supports
- what remains unresolved or missing

### 4. Context prepares the memory for intelligence

A model cannot read an entire workspace for every question.

Search locates relevant material. Graph and timeline reads recover connected history. Context assembles the useful parts into a bounded, cited bundle. Think reasons over that bundle and names what the available record cannot establish.

The assistant receives the part of the memory that matters now, with the sources needed to inspect it.

### 5. Intelligence remains replaceable

The memory does not belong to one model or assistant.

Claude, ChatGPT, specialist agents, internal applications, and future models can read from the same workspace through their own authority. Replacing an assistant does not require rebuilding the history it relied on.

### 6. Agents act elsewhere

Voe has no hands.

It does not independently reply to messages, move money, schedule meetings, or operate external systems. It remembers and answers. External agents decide what to do with the context they receive, within the authority granted to them.

This separation does not limit what intelligence may consider. An assistant can compare sources, synthesize across records, form inferences, and propose changes. Voe preserves the difference between observation, interpretation, and authorized change.

## A Vocabulary For Each World

Memory needs the language of the world it describes.

Voe includes a shared core vocabulary for common records such as messages, people, organizations, events, files, relationships, assertions, and gaps. That common language allows different capture and reading surfaces to understand the same workspace.

A workspace can also install versioned domain vocabularies.

An exhibition workspace may need artworks, loans, movements, condition reports, and installation dates. A hiring workspace may need candidates, interviews, offers, and start dates. A property workspace may need buildings, leases, inspections, and repairs.

Domain vocabularies allow those records to carry their proper types, relationships, assertions, and meaningful dates without losing their route back to evidence.

Voe does not force every part of the world into one fixed ontology. The core vocabulary supplies a common foundation. Domain vocabularies express the language required by a particular field, team, or project.

This is what lets Voe remember more than documents. It can remember what those documents mean within the world that produced them.

## One Memory, Several Authorized Readers

A workspace can serve several people and assistants without creating several inconsistent copies of its history.

Authorized readers may include:

- the workspace owner
- invited members or guests
- Claude or ChatGPT
- specialist agents
- internal applications
- builder integrations

Each principal receives its own workspace access. Separate, scoped write authority determines whether an agent may contribute records.

Access can be ended for one principal without disconnecting everyone else or rebuilding the memory.

One workspace can therefore support several brains while preserving one shared record.

## Several Workspaces, Separate Worlds

Voe does not combine every part of a person's or organization's life into one pool.

An individual might keep separate workspaces for personal life, a company, a household, a private project, or a shared venture.

An organization might maintain different workspaces for teams, clients, investigations, functions, or projects.

Each workspace is its own memory and access perimeter. Its record, sources, grants, connected assistants, vocabulary, and open questions remain separate from those of other workspaces.

A person can belong to several workspaces without those memories being merged. An organization can operate many workspaces while deciding who and what may enter each one.

## Privacy Is Part Of The Memory Design

A useful memory may contain sensitive material. Privacy cannot be added after capture.

Voe limits collection to material intentionally routed into a workspace. It does not require broad access to a mailbox or personal account. Each person, assistant, and application receives separate authority, scoped to the workspace it is allowed to read.

Original evidence, derived readings, and model output remain distinct. Sensitive content can be redacted through a recorded decision. Removing access takes effect without requiring the workspace to be reconstructed.

Model choice is also separate from memory ownership. A workspace can use different intelligence providers without moving its entire history into an assistant's private memory.

## Hosted, Self-Hosted, Or On-Premises

Voe can run as a hosted service, on infrastructure controlled by an individual, or inside an organization's own environment.

The deployment choice does not change the memory contract. Capture, evidence, workspace separation, access, context, and provenance follow the same model.

Self-hosted and on-premises deployments allow the record to remain within infrastructure controlled by the person or organization. Model use follows the deployment's configuration, so local and external intelligence can be chosen according to the needs of the workspace.

The memory is not tied to one assistant vendor or hosting arrangement.

## What Keeps The Record Honest

### Evidence remains reachable

Records, relationships, assertions, and cited answers retain a route to their supporting material. Derived text does not become evidence simply because a model produced it.

### Unknowns remain visible

Missing information is not replaced with a plausible guess. Gap reports name what the available record cannot establish.

### Conflicts remain part of the history

A new observation does not automatically erase an earlier one. Contradicting readings can remain visible for review, with their evidence and state recorded separately.

### Writes are checked

Agents can create or amend records only through scoped, expiring write authority. Amendments must identify the version being changed, preventing silent replacement of a record that has since moved on.

### Interpretation stays distinct from evidence

Summaries, extracted readings, and synthesis can help intelligence use the record. They do not quietly overwrite the material from which they were derived.

## Why It Matters

Better models improve reasoning. They do not recover an email that was never captured, identify a relationship the record never connected, or prove a promise from a summary with no receipt.

Voe moves that work before the question.

It captures what arrived, preserves the evidence, organizes the history, expresses the language of the domain, names uncertainty, and prepares cited context for whichever intelligence the workspace owner chooses.

A person can separate different parts of life and work. An organization can establish memories for different teams and projects. Several people and assistants can read from one workspace without fragmenting its history. The deployment can remain hosted or move onto infrastructure the owner controls.

Voe is the memory their intelligence stands on.
