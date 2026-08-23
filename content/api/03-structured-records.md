---
title: Structured Records
description: Use active vocabularies to write qualified assertions, relationships, domain pages, and gaps.
---

# Structured records

Voe can hold builder-defined record types without mixing their meaning with another domain. A versioned vocabulary names the available page types, assertion types, relationship types, clocks, and gap kinds. Every domain type is fully qualified, for example `com.example.sales/account_stage@1`.

## Discover what the workspace accepts

`GET /v1/vocabularies` lists installed vocabulary versions and shows which are active. Over MCP, call `vocabulary_list`.

An inactive or unknown type is refused. Existing records keep the version they were written against, so a later vocabulary version does not silently change their meaning.

## Write assertions

`POST /v1/assertions` records a subject, a qualified predicate, an object, and the record material that supports it.

```json
{
  "subject": "companies/meridian",
  "predicate": "com.example.sales/account_stage@1",
  "object": { "value": "contracting" },
  "statedIn": "messages/2026/08/22/email-7f41",
  "supportedBy": ["messages/2026/08/22/email-7f41"]
}
```

The default list returns live, established assertions supported by record-grade material. Use `includeAllStates=true` or `includeDerived=true` only when the wider view is needed.

## Write relationships

`POST /v1/relationships` connects two pages with a qualified relationship and direct support.

```json
{
  "source": "people/amara-okafor",
  "relationship": "com.example.sales/introduced_by@1",
  "target": "people/philip-fuller",
  "statedIn": "messages/2026/08/22/email-7f41",
  "supportedBy": ["messages/2026/08/22/email-7f41"]
}
```

Direction and allowed source and target types come from the active vocabulary. Unknown types, invalid direction, and missing support records are refused. A valid relationship without enough live support remains proposed and stays out of default established reads.

## Use domain time

A vocabulary may name clocks such as `occurredAt`, `effectiveAt`, `dueAt`, or `expiresAt`. `entity_timeline` and the timeline API can order by one of these clocks. When a requested clock is absent, the result names the fallback or omission rather than inventing a date.

## Open a declared gap

`POST /v1/gaps` opens a gap kind declared by an active vocabulary. The gap can name the subject and the record that showed the absence.

```json
{
  "namespace": "com.example.sales",
  "version": 1,
  "kind": "decision_missing",
  "subjectSlug": "companies/meridian",
  "openingEvidence": ["messages/2026/08/22/email-7f41"]
}
```

Voe settles a gap only when the requested closing evidence exists and any declared condition is met. Dismissal remains a separate recorded decision.

## Authority

Reads require `read`. Installing or activating a vocabulary requires `admin`. Assertion, relationship, and domain-gap writes require `write`.

Connected assistants also need a live write grant naming the exact vocabulary version and assertion or relationship types they may use. See [Let an agent write](/guides/let-an-agent-write).

Next: [Webhooks](/api/webhooks) | [MCP tool reference](/mcp/tool-reference)
