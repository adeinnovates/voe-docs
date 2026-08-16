---
title: Architecture In Five Minutes
description: Source channels, raw store, pages, edges, chunks, gaps, grants, API, MCP — the whole system model.
---

# Architecture in five minutes

::mermaid
flowchart LR
  subgraph IN["Channels in"]
    E[Email addresses]
    S[SMS numbers]
    V[Voicemail]
    CAL[Calendar feeds]
    APP[App capture]
  end
  subgraph REC["The record"]
    RAW["Raw store<br/>original bytes, content-addressed"]
    PAGES["Pages<br/>plain markdown files, git-versioned"]
    IDX["Index<br/>edges · passages · gaps<br/>rebuildable from files"]
  end
  subgraph OUT["Read surfaces"]
    READ["search · context · think"]
    MCP["MCP tools"]
    API["HTTP API"]
    DASH["Dashboard"]
  end
  IN --> RAW --> PAGES --> IDX --> READ
  READ --> MCP & API & DASH
::

**Three layers, strictly ordered.**

1. **Evidence.** Every inbound item lands in the raw store first — original bytes, content-addressed by SHA-256, fsynced before anything else happens. This is what citations ultimately resolve to.
2. **Record.** From the raw material Voe writes pages: plain markdown files in a per-workspace git repository. The files are canonical; everything downstream is derived from them.
3. **Index.** Postgres holds pages, edges (the graph), chunks (search), and gaps — all rebuildable from the files. A reindex reproduces the index from the record and reports drift if it cannot.

**Access.** Row-level security scopes every read to the caller's workspace grants. A bearer token maps to a principal; the principal's live grant decides what the token can actually do, on every request.

**Reads.** `search` returns ranked hits with evidence. `context` packs token-budgeted sections for your model. `think` synthesizes cited prose and always ends with a gap report. MCP exposes the same engine over stdio and HTTP.

**Writes.** Inbound channels write through capture. Agents write only through checked paths: a scoped, expiring write grant, a pre-write authority decision, and a secret scan — recorded either way.

Deeper: [The Record](/concepts/the-record) · [Evidence](/concepts/evidence) · [Context, Think, Search](/concepts/context-think-search) · [Checked Writes](/concepts/checked-writes)
