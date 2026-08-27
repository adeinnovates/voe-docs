---
title: Exhibition Production
description: Keep artworks, loans, movements, inspections, and installations connected to the records that support them.
---

# Exhibition production

An exhibition moves through lenders, venues, transport, condition checks, installation teams, and changing schedules. The facts arrive in documents, email, calendar events, images, and application updates. A domain vocabulary lets a product connect that material without flattening it into one generic note.

## The scenario

The travelling exhibition **Tidal Forms** opens at North Gallery on October 3.

The record holds:

- the exhibition schedule
- six artwork records
- five signed loan records
- a shipment manifest for all six works
- condition reports for five works
- an installation plan and venue calendar event

The sixth artwork appears on the manifest, but its arrival condition report is missing. A later email says the frame needs attention. The record should not present the installation as clear merely because the other five works passed inspection.

## Give the workspace the domain language

The `org.example.exhibition` vocabulary can declare:

- pages such as `exhibition`, `artwork`, `loan`, `shipment`, `condition_report`, and `installation`
- relationships such as `presents`, `covered_by`, `moved_by`, `inspected_in`, and `installed_for`
- assertions such as `loan_approved`, `condition_cleared`, and `installation_ready`
- clocks for opening, arrival, inspection, installation, and expiry
- gaps such as `condition_report_missing` and `installation_unconfirmed`

The vocabulary defines the allowed shape. The workspace record supplies the evidence.

## What lands in the record

Source material enters through the normal capture paths. An authorized application can add typed domain pages and explicit relationships under checked write authority.

For example, the product connects an artwork to its arrival report with:

```json
{
  "source": "artworks/blue-horizon",
  "relationship": "org.example.exhibition/inspected_in@1",
  "target": "condition-reports/blue-horizon-arrival",
  "statedIn": "files/2026/09/28/blue-horizon-condition-report",
  "supportedBy": ["files/2026/09/28/blue-horizon-condition-report"]
}
```

The relationship is explicit, typed, and tied to the report that supports it. A matching title or accession number alone does not create the relationship.

## What the product can ask

> **Which works are not ready for installation, and why?**
>
> Five works have arrival reports marked clear. `Blue Horizon` appears on shipment `SH-204`, but the record does not hold its arrival condition report. A later message says the frame needs attention.
>
> **THE RECORD DOES NOT SHOW:** a completed arrival inspection for `Blue Horizon`, or an established `condition_cleared` assertion.

The answer can cite the manifest, the five available reports, and the later message. The named gap remains visible until the expected report or an authorized dismissal closes it.

## What Voe provides

- capture across correspondence, files, calendar events, and application events
- versioned domain types with checked fields and meaningful dates
- evidence-backed relationships and assertions
- named gaps for expected material the workspace does not hold
- graph, timeline, context, search, and Think reads over the same workspace
- separate access for people, applications, and connected assistants

## What your product defines

- the exhibition vocabulary and its versions
- which operational records become domain pages
- which source material supports each relationship or assertion
- who may write or resolve domain state
- the production view and workflow built over the record

Voe does not decide whether an artwork is fit to install. It keeps the supporting record, the declared reading, and what remains missing available to the product and its authorized readers.

Start with [Register a custom vocabulary](/guides/register-a-custom-vocabulary), then use [Structured records](/api/structured-records) or [Domain vocabularies over MCP](/mcp/domain-vocabularies).
