---
title: Contract-to-Payment
description: A builder pattern for joining contract, invoice, and payment records while keeping their sources visible.
---

# Contract-to-payment

Use Voe beneath a contract-to-payment product to keep source material, application events, and builder-written links in one cited record. Voe preserves what arrived and the relationships your product writes. It does not interpret a contract clause or decide whether a payment settles an obligation.

## What you're building

A product that follows an economic promise from the clause that created it to the payment associated with it. The product can bring the clause, invoice, payment, and receipt together, with each record pointing back to its source.

## The scenario

The Meridian MSA sets a **$40,000 fee, due on acceptance of Phase 2**. An invoice for $40,000 went out on the 3rd. A payment of $40,000 cleared on the 14th. The record does not yet contain a receipt or confirmation that Phase 2 was accepted.

The amount matches. That alone does not establish that the contract condition was met or that this payment settled this obligation.

## What lands in Voe

The signed agreement, invoices, receipts, and correspondence can arrive through Voe's capture paths. Your application can post observations such as a cleared payment or an accepted milestone to `POST /ingest`. It can also create typed pages through the checked write path and connect them with explicit record links.

Voe keeps those records searchable and citable. Graph tools traverse the links that your product wrote. Voe does not infer the contract-to-invoice or invoice-to-payment relationship from matching amounts.

## What the product can say

After your product has written the obligation and its relationships, it can assemble an answer such as:

> **"Is the Phase 2 fee on the Meridian MSA satisfied, and what does the record show?"**
>
> The MSA sets a $40,000 fee on acceptance of Phase 2 `source link`. An invoice for $40,000 was issued on the 3rd `source link`, and a $40,000 payment cleared on the 14th `source link`.
>
> **THE RECORD DOES NOT SHOW:** a receipt or confirmation that Phase 2 was accepted. The payment amount matches the invoice, but the record does not establish that the contract condition was met.

The conclusion depends on the domain logic and relationships supplied by your product. Voe supplies the cited record beneath it.

## What Voe provides today

- Capture for correspondence, documents, files, and application events, with source references.
- Checked page writes for records created by an authorized application or agent.
- Search and page retrieval across the workspace record.
- Graph walks over explicit links already present in that record.
- Timelines for directly connected records with available time metadata.
- Context and Think responses grounded in selected record sources.

## What your product defines

- The obligation model, including amount, trigger, due date, and status.
- Clause interpretation and any structured extraction from the agreement.
- The links between a clause, obligation, invoice, payment, and receipt.
- Which date carries business meaning for each record.
- Reconciliation rules, expected evidence, and the conditions that close or reopen an item.
- The accounts view, workflow, and accounting treatment.

## Build the read path

Start with search to find the relevant records:

```bash
curl -s "$VOE/v1/search?q=meridian+phase+2+fee&limit=20" \
  -H "Authorization: Bearer $TOKEN"
```

From there:

1. Use `graph_query` to traverse the explicit links your product wrote.
2. Use `entity_timeline` for directly connected records ordered by their available dates.
3. Fetch the selected pages or request a token-budgeted bundle with `get_context`.
4. Use `think` for a cited answer over indexed records and named entity anchors.
5. Keep the reconciliation result in your product unless you write it back through an authorized path with its sources.

`think` does not run a contract reconciliation workflow or walk an arbitrary domain graph on its own. Your product selects and connects the records that carry the business meaning.

To let an agent add reconciliation notes, give it narrow write authority and use the checked path. See [checked writeback](/examples/checked-writeback).

Voe keeps the record and its receipts available. Your product decides what they mean for the obligation.
