---
title: "Nothing slips: what a founder's memory gets right that inbox search gets wrong"
description: Why an assistant needs a resolved, cited record before the question arrives.
date: 2026-08-19
author: Voe team
tags:
  - memory
  - evidence
  - founders
excerpt: A better model can improve an answer. It cannot recover a relationship the record never made explicit, or a call that was never captured.
pinned: true
---

# Nothing slips: what a founder's memory gets right that inbox search gets wrong

*Why a founder's memory has to be resolved before the question arrives.*

**The short version**

Give an assistant your inbox and ask what you promised this week. It will answer fluently. Some of the answer may be wrong, and you will not be able to tell which part.

A better model can improve an answer. It cannot recover a relationship the record never made explicit, or a call that was never captured.

Voe resolves what it can before the question arrives. It keeps the original, writes down what the record can support, and names what is missing. Then the assistant reasons over that record.

That is the whole idea.

---

## Your week did not arrive as a database

It is Tuesday. Amara calls in ten minutes about the term sheet.

You ask the assistant you already use: *what is still open with Amara, and what did I promise Dele this week?*

The answer comes back clean and immediate. Part of it is true. You are out of time, and you cannot tell which part.

The problem began before you asked.

Amara moved a close date by email.

Dele made a commitment by text.

A voicemail came in while you slept.

Harbor 12 slipped a date, from a domain that is not quite theirs.

The same people repeat across channels. One company may use two domains and sit beneath a parent. A promise is buried inside a sentence that may also contain a suggestion, a joke, or a thought spoken too early.

Before anything can answer *what did I promise?*, something has to decide who the message concerns, which company it belongs to, and whether the sentence records a commitment at all.

Where that decision happens changes the answer.

---

## Two places to decide

The first option is to decide when you ask.

Give a model access to the messages. Let it search, connect identities, infer relationships, and decide what counts as a commitment while it is composing the answer. Every question repeats that work. A different query can produce a different reconstruction of the same week.

The second option is to decide when the material arrives.

Resolve the message to the person and company it concerns. Record a commitment when the source supports one. Link that record to the exact message and keep the original beside it. When the question arrives, the assistant retrieves a record that already carries its evidence.

```text
SEARCH AND INFER             RESOLVE AND RECORD
raw messages                 incoming material
     |                             |
  question                      capture
     |                             |
live reconstruction           cited record
```

Voe takes the second path. Resolve on the way in. Keep the receipt. Answer from the record.

---

## Why question-time inference breaks

It usually breaks quietly.

The same person arrives by email, text, and voicemail. A question-time system treats them as three strangers, or joins two people who happen to share a name. The answer says there were no promises to Dele because the promise lived in the channel it failed to connect.

One company arrives under two domains. Search one and you undercount. Guess the parent and you may pull in a subsidiary that is not part of the question.

A transcript says, "we should introduce Northbank." Is that a promise, a possibility, or a thought out loud? If the model decides while writing the answer, the distinction exists only for that response. There is no settled record to inspect later.

Then there is the call where the timeline was actually agreed. The memory has the voicemail before it, but not the call itself. Nothing in the captured material can recover what happened next.

These failures do not look like database errors. They arrive as ordinary prose. The answer is smooth enough to carry into the meeting, which is exactly the problem.

---

## A resolved memory answers differently

Voe moves the first decision to capture, where it happens once and remains open to inspection.

A message is connected to the people and companies it concerns across the channels Voe can hear. A supported commitment becomes part of the record, linked back to the message it came from. The original remains beside every reading derived from it.

Now *what did I promise Dele?* is not asking the model to reconstruct the week from scratch. The assistant can retrieve the promise, the message, and the time, then reason over them. Each claim can point back to its receipt.

And when the record does not contain the answer, Voe names the missing thing:

> I do not hold the call itself. I only hold the voicemail before it.

That sentence is useful because it changes what you do next. You can ask for the notes, forward the thread, or walk into the meeting knowing exactly where memory stops.

None of this makes a model infallible. A model can still misread a question, reason badly, or answer too broadly. A resolved record removes a different class of failure: asking the model to invent identities, relationships, and missing events under deadline.

How Voe performs the resolution is Voe's to keep. What matters here is when the work happens: before the question, not inside the answer.

---

## What the evidence says

Correctness is a property of the record, not the model.

There is a useful result from outside Voe, but it needs to be stated narrowly.

Sequeda, Allemang, and Jacob tested GPT-4 on zero-shot question answering over an enterprise insurance database. Asked directly against the SQL tables, it reached 16% accuracy. Asked over a semantic representation built from the same database, with business meaning expressed through an ontology and mappings, it reached 54%.

Same model. Same underlying database. Different representation.

This was not a Voe evaluation, and it was not a test over inboxes, texts, or voicemail. It does not prove that every resolved record produces a correct answer. It does show that the structure presented to a model can move answer accuracy substantially, even when the model and the underlying facts stay the same.

That is the architectural lesson Voe takes seriously. Reasoning can navigate relationships that were recorded. It cannot recover a relationship the record never made explicit.

More compute over unresolved material may produce a better reading of the pile. It does not turn the pile into a settled record.

### A smaller check inside Voe

Voe also runs a small, curated retrieval regression gate. It asks whether the correct page appears among content designed to be confusing. This is not answer accuracy, not a production traffic study, and not comparable to the external benchmark above.

In this run, the suite cleared all 56 retrieval challenges across five families. The bars show pass rate. The line shows the minimum release threshold for each family.

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

The result means a retrieval change did not lose any of the known hard cases in this suite. It does not mean Voe answers real-world questions with 100% accuracy.

---

## What connecting your tools should mean

Most products connect your tools by giving a model raw access and asking it to sort things out. Add more sources and the model gets more material, but also more identities, aliases, contradictions, and missing joins to resolve while answering.

Voe sits before that moment. It gives the assistant a cited record built from what arrived, with the original still one tap away and the missing parts named.

The assistant still does the thinking and the talking. Voe gives it memory with receipts.

You do not get a perfect answer by definition. You get an answer that can be checked, and a record that does not have to be reconstructed every time you ask.

---

## What Voe will not do

Voe never sends, posts, replies, or acts. It has eyes and ears, no hands.

It knows only what has been passed to it. A call that was never captured remains a call it does not have.

It keeps the original material beside what was read from it. When an answer matters, you can inspect the source instead of taking the prose on faith.

Those limits are part of the product. A memory that names where it stops is more useful than one that fills the silence.

---

## The bet

The model was not the first problem.

Before the assistant can reason well, the record has to know that three messages concern the same Dele, that two domains belong to Harbor 12, that a sentence was a commitment, and that the call after the voicemail is missing.

Give an ordinary model a resolved, cited record and it has a fair chance of answering the Tuesday question well, with receipts and a named gap. Give a stronger model a pile of unresolved messages and it still has to reconstruct your world while the clock is running.

The assistant's intelligence is only part of the question.

**It is what you have given it to stand on.**

---

## Source

Juan Sequeda, Dean Allemang, and Bryon Jacob, 2023. [Enterprise question answering benchmark, arXiv:2311.07509](https://arxiv.org/abs/2311.07509). The figures cited above are GPT-4 zero-shot accuracy: 16% over SQL tables and 54% over the paper's semantic representation.
