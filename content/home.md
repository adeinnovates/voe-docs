---
title: Give your agent the user's real world
description: Voe captures addressed channels, builds a cited memory, and serves context, search, and evidence over API and MCP.
---

# Give your agent the user's real world.

Voe captures addressed channels, builds a cited memory, and serves context, search, and evidence over API and MCP.

[Run the quickstart](/start/quickstart) · [Connect over MCP](/mcp/overview)

## Why Voe

Agent memory usually starts with the chat. It remembers what the user told the assistant.

Document retrieval usually starts with files. It indexes a collection and returns passages.

Voe starts with the user's world. Mail, texts, calls, calendar feeds, attachments, and app events enter a workspace first; from there Voe serves cited memory to any app, script, or agent.

If your product needs an assistant to understand what happened across real channels, Voe gives it a record to read before it reasons.

## What you get

**Capture as infrastructure.** Provision a workspace and let email, SMS, voicemail, calendar feeds, attachments, and app-captured records flow in.

**Memory with receipts.** Every answer and context block points back to source material; unreadable or missing material is named.

**One record, many consumers.** The same workspace serves your app, MCP clients, scripts, agents, and the dashboard.

**Checked writes.** Agents can add or amend memory only through scoped, expiring authority.

**API first, MCP friendly.** The API is the workspace contract for software. MCP gives assistants the same memory as tools.

## How it fits together

::mermaid
flowchart LR
  A["Channels in<br/>email · texts · voicemail<br/>calendar · webhooks"] --> B["The record<br/>raw bytes kept first<br/>pages · relationships · gaps"]
  B --> C["Read side<br/>context · think · search"]
  C --> D["Surfaces out<br/>MCP · API · your assistant"]
::

No arrow returns to the world. Voe never sends, posts, or acts. It hears, remembers, and answers; acting belongs to the tools you connect.

Start with the [quickstart](/start/quickstart), or read [what ships today](/start/what-ships-today) before you build.
