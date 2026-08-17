---
title: Revenue Intelligence
description: A deal product that understands an account's real history, not just its CRM row.
---

# Revenue intelligence

A deal or revenue product that understands the actual history of an account, instead of trusting a CRM row someone last updated by hand.

## What you're building

A product whose picture of a deal is built from what actually happened on it - the mail, the documents, the dates that moved - not only from the stage a rep remembered to set.

## The scenario

The CRM says Meridian is **Close: Sep 18 · Stage: Legal**. The record tells a longer story: the buyer asked for revised terms, counsel sent revisions, the close date moved once already, a revised agreement circulated, and no signed copy was ever captured.

## What Voe remembers

Each user's forwarded deal mail, and your application's own events posted to `POST /ingest` ("stage moved to diligence"). Correspondence and app events land in one record, so the deal's paper trail and its pipeline state sit side by side, each with provenance.

## What the product can do

> **"What is the real state of Meridian, and what is at risk?"**
>
> Terms were revised twice `source ↗`, the close date slipped from the 12th `source ↗`, and a revised agreement circulated on the 9th `source ↗`. The stage reads Legal.
>
> **WHAT I DON'T KNOW** - no signed agreement has been captured. The record holds the revised draft and the request to sign, not a signature.

A pipeline-risk view writes itself from that gap: a deal in Legal with a revised-but-unsigned agreement is exactly the one a forecast should not count yet.

## What Voe handles underneath

Correspondence capture and application events in one stream; temporal history and current-state reconstruction; the graph from a company to its people and threads; evidence and grade; and named gaps like the missing signature.

## What you own

The sales logic, opportunity scoring, forecasting, the CRM experience, and the workflows and actions on top. Voe reconstructs what happened on the account. Whether that means the deal is at risk, and what to do about it, is your product's call.

## Build it

```bash
# the activity feed for one counterpart
curl -s "$VOE/v1/search?q=meridian+terms&limit=20" -H "Authorization: Bearer $TOKEN"
```

`graph_query` from `companies/meridian` walks the deal's web of people and threads; `context` feeds your model a status summary; your own stage changes go in through `POST /ingest`. To let an agent file its own deal summaries under `crm/`, grant it narrow authority and it writes through the checked path, marked as its own. See [checked writeback](/examples/checked-writeback).

The CRM row is a claim someone made; the record is the evidence for or against it. A forecast built on the record already knows which deals are quietly slipping.
