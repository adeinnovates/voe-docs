---
title: Register A Custom Vocabulary
description: Give a workspace domain-specific record types, relationships, assertions, dates, and named gaps.
---

# Register a custom vocabulary

A custom vocabulary gives a workspace the language of its domain. It names the records that matter, the relationships allowed between them, the statements the record may hold, the dates that carry meaning, and the evidence expected when something is missing.

This guide uses exhibition production. The same shape works for research, care coordination, manufacturing, property operations, and other domains.

The primary journey uses the Vocabulary API. It is the same for hosted Voe and a private deployment. You need the Voe base URL and a workspace token with `admin` scope.

## 1. Write the declaration

Save the declaration as `org.example.exhibition.v1.json`. The file name, namespace, and version must agree.

```json
{
  "schema": "voe.vocabulary",
  "schemaVersion": 1,
  "namespace": "org.example.exhibition",
  "version": 1,
  "title": "Exhibition Production",
  "pageTypes": [
    {
      "id": "exhibition",
      "label": "Exhibition",
      "coreKind": "event",
      "fields": [
        { "id": "title", "type": "string", "required": true },
        { "id": "opens_on", "type": "date", "required": true },
        { "id": "closes_on", "type": "date", "required": true }
      ],
      "timeFields": [
        { "field": "opens_on", "clock": "occurredAt" },
        { "field": "closes_on", "clock": "expiresAt" }
      ]
    },
    {
      "id": "artwork",
      "label": "Artwork",
      "coreKind": "entity",
      "fields": [
        { "id": "accession_id", "type": "string", "required": true },
        { "id": "title", "type": "string", "required": true },
        {
          "id": "handling_class",
          "type": "enum",
          "values": ["standard", "fragile", "climate_controlled"]
        }
      ]
    },
    {
      "id": "condition_report",
      "label": "Condition report",
      "coreKind": "file",
      "fields": [
        { "id": "inspection_id", "type": "string", "required": true },
        { "id": "inspected_at", "type": "datetime", "required": true },
        {
          "id": "condition",
          "type": "enum",
          "required": true,
          "values": ["clear", "attention_needed", "not_assessed"]
        }
      ],
      "timeFields": [
        { "field": "inspected_at", "clock": "observedAt" }
      ]
    }
  ],
  "edgeTypes": [
    {
      "id": "presents",
      "label": "Presents",
      "coreKind": "relationship",
      "directed": true,
      "sourceTypes": ["org.example.exhibition/exhibition@1"],
      "targetTypes": ["org.example.exhibition/artwork@1"]
    },
    {
      "id": "inspected_in",
      "label": "Inspected in",
      "coreKind": "relationship",
      "directed": true,
      "sourceTypes": ["org.example.exhibition/artwork@1"],
      "targetTypes": ["org.example.exhibition/condition_report@1"]
    }
  ],
  "assertionTypes": [
    {
      "id": "condition_cleared",
      "label": "Condition cleared",
      "coreKind": "assertion",
      "subjectMax": 1
    }
  ],
  "gapKinds": [
    {
      "id": "condition_report_missing",
      "label": "Condition report missing",
      "expects": {
        "kind": "required_relation",
        "edgeType": "inspected_in",
        "minCount": 1
      }
    }
  ]
}
```

The declaration is deliberately small. Add only types that your product can explain and support with record material.

## 2. Check it against the workspace

The dry-run checks the declaration and the target workspace without installing or activating anything. These examples use `curl` and `jq`; the same request bodies work from any HTTP client.

```bash
export VOE_BASE_URL="https://app.runvoe.com"
export VOE_TOKEN="tok_..."

jq -Rs '{declaration: .}' ./org.example.exhibition.v1.json | \
  curl -sS -X POST "$VOE_BASE_URL/v1/vocabularies/dry-run" \
    -H "Authorization: Bearer $VOE_TOKEN" \
    -H "Content-Type: application/json" \
    --data-binary @-
```

The response names declaration errors, dependency state, version conflicts, qualified type mappings, and whether the version can be activated. A refused dry-run changes nothing.

## 3. Install and activate it

```bash
jq -Rs '{declaration: .}' ./org.example.exhibition.v1.json | \
  curl -sS -X POST "$VOE_BASE_URL/v1/vocabularies" \
    -H "Authorization: Bearer $VOE_TOKEN" \
    -H "Content-Type: application/json" \
    --data-binary @-

curl -sS -X POST "$VOE_BASE_URL/v1/vocabularies/activate" \
  -H "Authorization: Bearer $VOE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"namespace":"org.example.exhibition","version":1}'
```

Installation keeps the exact declaration. Activation allows new writes against its qualified types. Existing records always retain the version under which they were written.

## 4. Confirm the active version

```bash
curl -sS "$VOE_BASE_URL/v1/vocabularies" \
  -H "Authorization: Bearer $VOE_TOKEN"
```

Your application should use exact type references such as:

- `org.example.exhibition/exhibition@1`
- `org.example.exhibition/artwork@1`
- `org.example.exhibition/inspected_in@1`
- `org.example.exhibition/condition_cleared@1`

Do not construct a type name from its label. Labels are for people; qualified references are the stable write contract.

## 5. Make the first checked write

Create a page under an authorized write path and name its semantic type and declared fields.

```json
{
  "slug": "exhibitions/tidal-forms",
  "type": "event",
  "semanticType": "org.example.exhibition/exhibition@1",
  "semanticFields": {
    "title": "Tidal Forms",
    "opens_on": "2026-10-03",
    "closes_on": "2027-01-17"
  },
  "body": "Tidal Forms opens at North Gallery on October 3."
}
```

Relationships and assertions still need direct support from records already held by the workspace. A declared type does not turn an unsupported reading into evidence.

## Change the vocabulary

Released declarations are not edited in place. Create `org.example.exhibition.v2.json`, install it, then activate version 2. Version 1 records remain readable under version 1.

Deactivation stops new writes against a version. It does not erase or reinterpret historical records.

See [Vocabulary API](/api/vocabularies) for every declaration field, response, and error. Builders working beside a local or self-hosted cell can use the [local vocabulary CLI](/guides/use-the-vocabulary-cli-locally). See [Domain vocabularies over MCP](/mcp/domain-vocabularies) for assistant discovery and use. Vocabulary administration over MCP is not available.
