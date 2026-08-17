---
title: Architecture In Five Minutes
description: Source channels, the record, gaps, grants, API, MCP - the whole system model.
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
    PAGES["Pages<br/>plain files"]
    IDX["Index<br/>relationships · passages · gaps<br/>rebuildable from files"]
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

1. **Evidence.** Every inbound item lands as original bytes before parsing. This is what citations ultimately resolve to.
2. **Record.** From the raw material Voe writes pages: plain files with provenance. The files are canonical; everything downstream is derived from them.
3. **Index.** Voe maintains the query surfaces needed for search, relationships, gaps, and review. If those surfaces need rebuilding, Voe rebuilds them from the record and reports disagreement if it cannot.

**Access.** Every read is scoped to the caller's workspace grants. A bearer token maps to a principal; the principal's live grant decides what the token can actually do, on every request.

**Reads.** `search` returns ranked hits with evidence. `context` packs token-budgeted sections for your model. `think` synthesizes cited prose and always ends with a gap report. MCP exposes the same engine over stdio and HTTP.

**Writes.** Inbound channels write through capture. Agents write only through checked paths: a scoped, expiring write grant, a pre-write authority decision, and a secret scan - recorded either way.

Deeper: [The Record](/concepts/the-record) · [Evidence](/concepts/evidence) · [Context, Think, Search](/concepts/context-think-search) · [Checked Writes](/concepts/checked-writes)
