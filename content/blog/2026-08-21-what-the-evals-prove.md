---
title: "What Voe's Evals Prove"
description: A memory should be measured from arrival to answer, not by one recall score. Voe's seven-part suite checks the path from captured source to cited answer.
date: 2026-08-21
author: Voe team
tags:
  - evaluation
  - evidence
  - provenance
excerpt: Seven parts from capture to answer, and the numbers from Voe's latest evaluation run.
pinned: false
---

# What Voe's evals prove

A memory can find the right page and still fail the person asking.

It can lose part of the original. It can detach an answer from its source. It can admit material that should have stayed held. It can return a polished sentence that the record does not support.

Retrieval matters. It is simply not the whole job.

Voe measures the path from arrival to answer. The suite asks whether the source survived capture, whether the expected record can be found, whether an answer can show where it came from, and whether the same rules hold when an assistant reads through the API or MCP.

## Seven parts of one record

The suite is organized around seven parts of the product.

**Capture fidelity.** Did Voe keep what arrived before interpreting it? The fixtures cover email, messaging, calendar events, attachments, voicemail, and relayed events.

**Evidence.** Can a page, relationship, transcript, attachment reading, or answer still lead back to the material that supports it? Derived readings must remain marked as derived.

**Retrieval.** Can Voe find the intended record when nearby material has similar names, language, or connections?

**Answer conduct.** Does Think cite the record, name missing context, and mark unsupported text instead of smoothing over it?

**Freshness.** Does a completed capture become searchable without exposing a half-written record?

**Access and lifecycle.** Do source admission, workspace access, redaction, revocation, and agent write rules behave the same way across product surfaces?

**Workflows.** Can a person or assistant recall a commitment, prepare for a meeting, trace a fact to an attachment, and make a permitted write without stepping outside that permission?

One green retrieval score cannot answer all seven questions. The full suite asks all seven.

## The latest release

Results recorded August 20, 2026:

| Evaluation surface | Result |
|---|---:|
| Product dimensions evaluated | **7** |
| Named behavioral evaluations | **30** |
| Retrieval families above their release floor | **5 of 5** |
| Curated retrieval challenges cleared | **56 of 56** |

The seven-part scorecard:

| Product dimension | Release question | Latest result |
|---|---|---|
| Capture | Did Voe keep what arrived? | Cleared |
| Evidence | Can useful material lead back to its source? | Cleared |
| Retrieval | Did every retrieval family exceed its release floor? | 5 of 5 |
| Answer conduct | Were unsupported text and missing context handled visibly? | Cleared |
| Freshness | Did a completed capture become readable without exposing partial state? | Cleared |
| Access and lifecycle | Did redaction, revocation, and write permissions behave consistently? | Cleared |
| Agent reuse | Did API and MCP return the same sourced answer? | Cleared |

The retrieval detail:

| Retrieval family | Cleared | Release floor |
|---|---:|---:|
| Exact identifier | 20 of 20 | 90% |
| Title alias | 12 of 12 | 90% |
| Generic to specific | 6 of 6 | 80% |
| Multi-hop | 10 of 10 | 90% |
| Dilution | 8 of 8 | 75% |

The 56 challenges form a curated release set, with 6 to 20 queries in each retrieval family. The result means this release cleared that set. It is not a claim of universal answer accuracy.

## What passed

The cases exercise the behavior a person or connected assistant depends on:

- Captured material remains connected to its source.
- The expected record survives five different retrieval challenges.
- Think returns a gap report and handles unsupported answer text visibly.
- A lookalike sender stays held before its claim can reach Search, Context, or Think.
- A failed embedding leaves no partial record available to readers.
- Redaction and revoked access take effect across the tested surfaces.
- Agent writes remain inside the permission the workspace owner granted.
- API and MCP return the same attachment-grounded answer with structured sources.

That last case matters. An assistant should not receive a weaker account of the record than the person using the dashboard. The answer, the attachment filename, and the source list travel together.

## Why this is the scoreboard

Voe is evidence infrastructure. Its job begins before retrieval, when a message or file arrives, and continues after retrieval, when an answer needs to show its work.

That changes what deserves a test. Finding the right record matters. So does keeping the original. So does holding back a questionable source. So does refusing a write after its permission has ended. So does returning the attachment itself as the source, rather than hiding it behind the email that carried it.

A good record names what it holds. A good evaluation names what it measured.

That is what these numbers prove.
