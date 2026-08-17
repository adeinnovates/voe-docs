---
title: Relationship Intelligence
description: Relationship intelligence without users maintaining a second copy of their network.
---

# Relationship intelligence

Relationship intelligence that does not ask users to maintain a second, hand-kept copy of who they know.

## What you're building

A product that answers relationship questions from the correspondence a network already generates, instead of from a graph someone has to groom.

## The scenario

Amara's team wants to reach Harbor 12 and does not know who their warmest introduction is. The answer is already latent in months of mail, texts, and calls with people who touch Harbor 12. It has just never been assembled.

## What Voe remembers

Every message across the people involved, connected at capture into a typed graph: who wrote to whom, who works where, which threads moved. Dele's correspondence, Amara's, the Meridian and Northbank threads, one record with provenance on every edge.

## What the product can do

> **"Who is our strongest path to Harbor 12, and what have we committed to them?"**
>
> Dele has the most correspondence with people at Harbor 12 `source ↗`, most recently three weeks ago `source ↗`. No commitments to Harbor 12 are on record.
>
> **WHAT I DON'T KNOW** - the record connects Dele to Harbor 12, but holds no evidence that Dele agreed to make an introduction. That is a path the graph suggests, not a promise anyone made.

That last line is the product's whole credibility. Voe shows what the evidence connects; whether Dele will introduce anyone is inference, and the memory refuses to dress it as fact.

## What Voe handles underneath

The entity graph built at capture with provenance on every edge; search; the per-entity timeline; correspondence history; evidence and sender tier; and a cited context bundle to reason over.

## What you own

The scoring that turns edges into a "strongest path", the network or CRM interface, the recommendations, and the workflow. The graph is evidence; ranking it is your intelligence, and so is deciding what to do with the answer.

## Build it

The whole history of one person is a timeline plus a think answer over the same record:

```bash
curl -s "$VOE/v1/entities/people%2Fdele/timeline" -H "Authorization: Bearer $TOKEN"

curl -s -N -X POST "$VOE/v1/think" -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"Who is our strongest path to Harbor 12, and what have we committed to them?"}'
```

`graph_query` from a company slug walks the same edges when you want the web rather than the prose.

A network you never groom stays honest in a way a hand-kept one cannot: it claims only the connections it can show, and names the ones it is guessing at.
