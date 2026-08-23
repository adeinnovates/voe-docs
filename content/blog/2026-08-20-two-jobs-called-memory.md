---
title: "Two Jobs Called Memory"
description: Most memory tools give an AI application fast recall. Voe keeps an evidence-backed record of a person's world. The difference matters when an answer has consequences.
date: 2026-08-20
author: Voe team
tags:
  - memory
  - evidence
  - positioning
excerpt: One approach helps an application remember what it was told. The other keeps a record of what reached a person, with the receipts still attached.
pinned: false
---

# Two jobs called memory

Memory for AI now names two different jobs.

The first helps an application remember its users. It keeps useful details from conversations and documents so the next interaction can start with context instead of starting again.

The second keeps a record of a person's world. It holds what arrived, preserves the evidence, records the relationships and decisions that matter, and gives any authorized assistant a grounded place to begin.

Both are useful. Voe is built for the second job.

## The short version

Most memory infrastructure sits behind an application. The application writes what it learns, and later asks for the most relevant memories.

Voe sits with the person. Mail, messages, calls, calendar events, files, and authorized records can enter one workspace. The source remains available as evidence. What the record can support becomes usable context. What it cannot support stays named as a gap.

That difference matters when the question is not just, "What does this user prefer?" but, "What did I promise, what changed, and where did that come from?"

## What application memory does well

Application memory is a strong fit for products that need continuity across sessions. It can extract useful details from conversations, build a profile, and return relevant context quickly. Modern systems combine semantic, keyword, and graph retrieval, often behind a small add-and-search API.

That is the right shape when the product owns the interaction and needs to remember what happened inside it.

Voe starts from a different question: what should an assistant know about the person using it, even when the evidence came from somewhere else?

## The source stays, and the record grows around it

Voe does not reduce an email, call, or file to a fact and throw away the route back.

The captured source remains evidence. Alongside it, the workspace can hold durable records of people, events, relationships, assertions, decisions, and known gaps. Some enter through capture. Some are written by an authorized person or agent. Some are derived for retrieval and synthesis. Those roles stay distinct.

This is the important point: evidence is not replaced by structure, and structure is not treated as evidence merely because it is useful. The record keeps both, with a route from a supported reading back to what supports it.

Months later, an answer can return more than a remembered sentence. It can return the reading, the source, and the state of the record around it.

## An answer should carry its receipts

Fast recall is necessary. It is not enough when the answer affects a meeting, a commitment, a payment, or a decision.

Voe's answer path is built around grounded context. Supported statements carry citations to records in the workspace. A strict answer withholds a statement it cannot ground. An annotated answer marks the unsupported part where it appears. The answer also names material gaps in plain language.

When the call itself never entered the workspace, the answer should not reconstruct it from a voicemail and confidence alone:

> I do not hold the call itself. I only hold the voicemail before it.

That is not weaker intelligence. It is a clearer account of what the record can bear.

## New evidence does not silently rewrite old evidence

A person's world changes. A title changes. A payment settles. A plan is replaced. Two sources may disagree.

Voe keeps those changes as record history. An explicit lifecycle decision can supersede an earlier reading without erasing it. When a structured observation conflicts with a standing relationship, the new observation can remain proposed until an authorized decision settles what should stand. Order of arrival does not decide what is true.

The result is current context with history still attached. An assistant can work from what stands now without pretending the earlier record never existed.

Redaction is explicit too. Content selected for destruction leaves an audit record of the action, while the removed material is no longer available as evidence.

## Adding to the record is a permission

A connected assistant can read only the workspace it has been granted. Writing is a separate authority.

An owner can allow an agent to add particular kinds of records, under particular vocabularies and paths. A separate resolution authority is required to settle a relationship conflict. Agent-authored material remains marked as agent-authored.

This lets an assistant contribute useful structure without quietly redefining what happened. The record can grow, but the authority to change its meaning remains visible and revocable.

## Different scoreboards

Recall quality still matters. Voe tests whether the right record surfaces from deliberately confusing material, including exact identifiers, aliases, broad questions, multi-hop questions, and dilution by similar records.

The scoreboard continues past retrieval. Other checks cover evidence references, invented citations, capture fidelity, source admission, graph paths, and whether held material stays out of answer context.

The goal is not to trade recall for provenance. It is to require both.

## Side by side

| | Application memory | Voe |
| --- | --- | --- |
| Built to | Give an application continuity with its users | Keep an evidence-backed record of a person's world |
| Primary input | What the application sees or chooses to add | What reaches the workspace through capture or an authorized write |
| What remains | Useful memories and profile context | Source evidence, durable records, state, decisions, and named gaps |
| Answer posture | Return relevant memory to the application | Return grounded context with citations and gaps |
| Change over time | Product-specific update and retention behavior | Appended state, explicit decisions, visible supersession, explicit redaction |
| Agent writes | Controlled by the host application's design | Narrow owner-granted authority; authorship remains visible |
| Portability | Product-specific | The workspace record can be kept and moved with its canonical artifacts |

## When each one fits

If you are building a product that needs to remember preferences and conversation history inside that product, application memory is the natural fit.

If you need an assistant to know the person's real world across mail, messages, calls, calendar, files, and domain records, and you need the answer to show where it came from, Voe is built for that job.

The difference is ownership and purpose. One helps an application remember what it was told. The other keeps what reached a person, with the receipts still attached.

## Where Voe stops

Voe knows only what entered the workspace and what authorized contributors recorded there. A missing call remains missing. A source still being processed is not silently presented as readable. A conflict still awaiting a decision does not become an established reading because it arrived last.

Voe also does not act in the outside world. A permitted write changes the record. It does not send the email, move the money, or accept the contract.

That is the product posture: capture what happened, keep the evidence, make the record useful, and leave the final action to the person or system that owns it.

## A note on the comparison

Memory products differ, and the category is moving quickly. This article compares two product jobs, not every implementation. Many systems now support files, graphs, profiles, lifecycle updates, and source connectors in different combinations.

The Voe distinction is not that those capabilities cannot exist elsewhere. It is that the evidence-backed record is the product itself, shared across authorized assistants rather than kept as a feature inside one application.

The [examples](/examples) show that record in use: captured sources, structured context, cited answers, and gaps that remain visible when the evidence stops.
