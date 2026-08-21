---
title: "Don't Ask AI to Search Your Mess: Why Context Needs Structure Before the Query"
description: Why an assistant needs a resolved, cited record before the question arrives.
date: 2026-08-19
author: Voe team
tags:
  - memory
  - evidence
  - founders
excerpt: AI reasoning is only as good as the record it stands on.
pinned: true
---

# Don't Ask AI to Search Your Mess: Why Context Needs Structure Before the Query

It is Tuesday, and Amara calls in ten minutes about the term sheet. You ask the assistant you already use: what is still open with Amara, and what did I promise Dele this week? The answer comes back clean and immediate, and part of it is true. You are out of time, and you cannot tell which part.

The trouble started before you asked. Amara moved a close date by email. You promised Dele the revised numbers by text. A voicemail came in while you slept. Harbor 12 moved a date in a message from a domain one character off from theirs. The same people keep showing up across channels, one company turns out to use two domains and sit under a parent, and a promise hides inside a sentence that also carries a suggestion, a joke, or a thought said too early. Before anything can answer *what did I promise*, something has to work out who a message concerns, which company it belongs to, and whether the sentence records a commitment at all. Where that work happens is what decides whether you can trust the answer.

## Search finds messages. It does not settle what they mean.

Inbox search will find every message that mentions Amara. What it cannot do on its own is tell you that a text replaced the date in an earlier email, or that a second address belongs to the same person. Handing an assistant raw access does not make that work disappear; it just moves the work into the moment the answer is being written. Now the model is searching, joining identities, guessing relationships, and deciding what counts as a commitment, all at once, all under your deadline. Every question runs the reconstruction again from the beginning, and a slightly different question can hand you a different version of the same week.

There is another place to do the work, which is when the material arrives. Resolve a message to the person and company it concerns, when the source supports the match. Record a commitment when the words actually support one. Tie that record to the exact message and keep the original sitting beside it. Then, when the question comes, the assistant is reading a record that already carries its own evidence rather than assembling one on the spot.

```text
SEARCH AND INFER             RESOLVE AND RECORD
raw messages                 incoming material
     |                             |
  question                      capture
     |                             |
live reconstruction           cited record
```

Voe takes the second path: resolve on the way in, keep the receipt, answer from the record.

## Four ways the first path goes wrong

Consider the same person arriving by email, text, and voicemail. A system that resolves at question time might read them as three strangers, or fuse two different people who happen to share a first name. Search one of a company's domains and you undercount its messages; guess at the parent and you may drag in a subsidiary that has nothing to do with the question. A meeting transcript says "we should introduce Northbank," and whether that was a commitment, a live possibility, or a thought spoken aloud gets decided inside the answer, with no settled reading left behind to check later. And the timeline everyone agreed to was agreed on a call: the record holds the voicemail that came before it and nothing of the call itself, so there is simply no way to recover what was said.

None of these read like database errors. They arrive as ordinary, fluent prose, smooth enough to carry straight into the meeting, which is exactly what makes them dangerous.

## A resolved record answers differently

Voe moves that first decision to capture, where it happens once and stays open to inspection. When the source supports the match, it connects a message to the people and companies it concerns across the channels it can hear. When the match is uncertain, it leaves the uncertainty visible instead of quietly resolving it inside an answer. A commitment the words support becomes part of the record and stays linked to the message it came from, and the original stays beside every reading taken from it.

So *what did I promise Dele* stops being a request to rebuild the week from nothing. The assistant retrieves the promise, the message, and the time, and reasons over them, and every claim can point back to its receipt. When the record does not hold the answer, Voe says so plainly rather than filling the gap:

> I do not hold the call itself. I only hold the voicemail before it.

That one sentence changes your next move. You can go ask for the notes, forward the thread, or walk into the meeting knowing exactly where your memory runs out. None of this makes the model infallible; it can still misread the question, reason poorly, or answer too broadly. What a resolved record removes is a narrower and nastier class of failure, the model inventing identities, relationships, and missing events while it is under pressure to answer. The record is resolved before the answer, and every reading stays tied to what actually arrived.

## What the evidence says

How good an answer can be starts with the record the model is handed. One outside result speaks to this directly, with a limit worth stating.

Sequeda, Allemang, and Jacob tested GPT-4 on zero-shot question answering over an enterprise insurance database. Pointed straight at the SQL tables, it answered 16 percent of the questions correctly. Pointed at a semantic representation built from the same database, with the business meaning expressed through an ontology and mappings, it reached 54 percent. Same model, same underlying facts, different representation.

That was not a Voe evaluation, and it was not run over inboxes, texts, or voicemail, so it does not prove that a resolved record yields a correct answer. What it does show is that the structure you put in front of a model can move accuracy a long way while the model and the facts underneath stay fixed. Reasoning can travel the relationships that were recorded; it cannot recover one the record never made explicit. More compute over an unresolved pile may buy you a better reading of the pile, but it does not turn the pile into a settled record.

### A smaller check inside Voe

Voe also runs a small, curated retrieval regression gate, which asks a narrower question: does the right page surface out of a set built to be confusing? This is not answer accuracy, not a study of production traffic, and not comparable to the benchmark above. In this run it cleared all 56 challenges across five families. The bars are pass rate; the line is the minimum release threshold for each family.

```mermaid
xychart-beta
    x-axis [ExactID, TitleAlias, BroadQuery, MultiHop, Dilution]
    y-axis "Pass rate (%)" 0 --> 100
    bar [100, 100, 100, 100, 100]
    line [90, 90, 80, 90, 75]
```

| Retrieval family | Passed | Pass rate | Release threshold |
| --- | ---: | ---: | ---: |
| Exact identifier | 20 of 20 | 100% | 90% |
| Title alias | 12 of 12 | 100% | 90% |
| Generic to specific | 6 of 6 | 100% | 80% |
| Multi-hop | 10 of 10 | 100% | 90% |
| Dilution | 8 of 8 | 100% | 75% |

All it means is that a retrieval change did not drop any of the known hard cases in this suite. It does not mean Voe answers real questions with perfect accuracy, and the page says as much.

## What connecting your tools should mean

Connecting more sources gives an assistant more material without giving it a settled record, and it also brings more identities, aliases, contradictions, and missing links for the model to guess at while it answers. Voe sits in front of that moment. It hands the assistant a cited record built from what arrived, with the original a tap away and the missing parts named. The assistant still does the thinking and the talking; Voe supplies the memory and the receipts. You do not get a guaranteed-correct answer out of this. You get one you can check, and a record you are not rebuilding every single time you ask.

## Where Voe stops

Voe never sends a word on your behalf. A connected agent can add to or amend the record only when the workspace owner has separately allowed it, and even then that changes the record, not the outside world. Voe knows only what has been passed to it; a call nobody captured stays a call it does not have. And it keeps the original material beside whatever was read from it, so when an answer matters you can go look at the source instead of taking the prose on faith. These are not gaps waiting to be closed. A memory that tells you where it stops is worth more than one that fills the silence.

## Back to Tuesday

The model was never the first problem. Before an assistant can reason well about your week, the record has to already know that three messages concern the same Dele, that two domains both belong to Harbor 12, that one sentence was a commitment and another only sounded like one, and that the call after the voicemail is missing. Give it that, and it can tell you what Amara changed, what you owe Dele, why the Harbor 12 message deserves a second look, and which part of the week never made it in. The answer still is not perfect. But the claims are inspectable and the silence is explicit, and on a Tuesday with ten minutes on the clock, that is the difference between an answer you can act on and one you can only hope is right.

## Source

Juan Sequeda, Dean Allemang, and Bryon Jacob, 2023. [Enterprise question answering benchmark, arXiv:2311.07509](https://arxiv.org/abs/2311.07509). The figures cited above are GPT-4 zero-shot accuracy: 16% over SQL tables and 54% over the paper's semantic representation.
