---
title: What Is Voe?
description: Capture in, cited memory out, checked writes back - Voe for builders in one page.
---

# What is Voe?

Voe is capture, memory, and evidence infrastructure. Your user's addressed channels - forwarded email, texts, voicemail, calendar feeds, app events - flow into a workspace. Voe keeps the original material first, builds a cited record from it, and serves that record to your agent through `search`, `context`, `think`, and MCP. Any write an agent makes goes back through a checked, expiring authority.

You do not build intake, retrieval, or provenance. You build the agent.

## What Voe is not

Voe is not the agent, and it has no hands. It hears, remembers, and answers. It never sends, posts, books, replies, or acts - acting belongs to the tools you connect. Voe also holds no provider logins: it receives what is addressed to it, plus deliberately subscribed read-only calendar feeds. There is no mailbox OAuth, no account scraping, no custody of the user's accounts.

## Core facts

- Citations resolve to bytes. Every answer and context section points at a source the reader can open, down to the original raw material or attachment hash.
- Grade is always shown, and worst wins. Text derived by OCR or transcription is marked `derived`; a derived source can never silently launder into record-grade.
- Gaps are named and query-scoped. Missing entities, stale records, unreadable attachments - the memory says what it does not hold, per question asked.
- Voe has no hands. It never sends messages, on any channel, for any reason.
- Voe holds no logins. Addressed channels and read-only, revocable calendar-feed URLs only.
- Writes need a signed, expiring grant - even for the owner's own assistant. Workspace access is never write authority.
- The record is plain files, replayable: reindexing rebuilds the query surfaces and reports drift if it cannot.

## Where to go next

- [Mental model](/start/mental-model) - world, record, memory, context, and the agent that reads it.
- [Quickstart](/start/quickstart) - capture one record, search it, ask over it, connect MCP.
- [Architecture in five minutes](/start/architecture-in-five-minutes) - the system model.
- [What ships today](/start/what-ships-today) - the capability matrix.
- [Common questions](/start/common-questions) - short answers for builders.
