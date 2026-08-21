---
title: "How Voe decides what enters the record"
description: A model can help read and answer from memory. It does not get to turn unsupported prose into the record.
date: 2026-08-22
author: Voe team
tags:
  - architecture
  - evidence
  - provenance
excerpt: Voe keeps the original, identifies derived readings, and admits writes only when the record can support them.
pinned: false
---

# How Voe decides what enters the record

People notice when an agent takes the wrong action. A message reaches the wrong person. A payment has the wrong amount. A meeting appears on the wrong day. The mistake has an immediate consequence, so someone corrects it.

A false claim written into memory is harder to see. It can sit among accurate material for months, then return as context for a later answer. By then, the sentence that introduced the error may look like any other part of the record.

This is why admission to the record matters. Models have a useful role in Voe, but a model's confidence is not enough to establish what happened.

## The original comes first

When material arrives, Voe keeps the original before adding any reading of it. That may be an email, a calendar event, a file, a text, or a voicemail.

The first job is preservation. Later readings can improve. The source they came from should remain available for inspection.

Voe admits connections that the source can support, such as the sender, recipients, thread, named people, or related event. When the material does not support a relationship clearly enough, Voe leaves it unresolved. The record should show uncertainty where uncertainty exists.

This keeps capture deliberately restrained. A sentence such as "she mentioned her cofounder left" may be important, but it does not establish every identity and relationship a model could infer from it. Voe keeps the sentence. It does not turn the model's guess into history.

## Agent writes carry their own provenance

A connected agent can add or amend records when the workspace owner has granted that authority.

The write remains identified as the agent's work. Voe keeps the request that produced it, checks that the authority is still current, and refuses an amendment when the underlying page has changed since the agent read it. Revoking the connection ends that write path.

This matters because captured material and agent-authored material have different origins. Both can be useful. They should never become indistinguishable.

## Readings stay attached to their source

Some material needs help before it becomes useful. A file may need extraction. A voicemail needs transcription. A malformed message may need repair.

Models can help with those readings. Voe keeps them identified as derived material and ties them to the source beneath them. A reading that cannot be supported by the original does not quietly replace it.

This also leaves room for improvement. A better extractor can read an old file again. A better transcription model can produce a clearer transcript. The source remains the same while the reading gets better.

## Answers have to show their work

When Voe answers from a workspace, factual sentences are expected to cite the material supplied to the model. Voe checks the finished answer for missing or invalid source references.

The interactive answer can surface unsupported prose for review. Strict callers can require unsupported sentences to be withheld. The response also states what the record does not contain, so absence is not presented as knowledge.

| Stage | What enters | What remains visible |
| --- | --- | --- |
| Capture | Material and supported connections | The original source |
| Agent write | An authorized addition or amendment | The agent and its request |
| Derived reading | A supported extraction, repair, or transcript | The source it came from |
| Answer | Cited prose, subject to the caller's mode | Citations and named gaps |

## Shared names need a fixed meaning

The same discipline applies to the names used inside the record.

If every writer invents relationship names as it goes, the same relationship can acquire several labels. Retrieval then has to reconcile those labels after the fact, and two versions of the same workspace may interpret them differently.

Voe uses a small, versioned core vocabulary for its own page and relationship types. A released vocabulary is not edited in place. Changes arrive as a new version with an explicit mapping from the earlier one.

The vocabulary is intentionally small. It gives common record types a stable meaning without pretending to describe every business domain. Builders can add domain-specific semantics as that support expands, while the core record remains readable.

## Where models help

Models do real work in Voe. They can help read difficult material, produce transcriptions, and write an answer in natural language.

Their output keeps its status. A transcription is a transcription. An extraction is a reading of a file. An answer is prose assembled from supplied context. None of them silently becomes the original event or message.

That separation means a workspace can adopt a better model without losing track of what arrived and what was later read from it.

## A record that can be inspected

Models belong in memory when their work has a clear place.

What arrived remains available. What Voe or an agent derived from it stays identified. What cannot be supported stays out of the record or appears as a named gap. When an answer matters, the citation leads back to the material behind it.

A better model can improve the reading. The record still shows what happened, who added each part, and what evidence supports it.
