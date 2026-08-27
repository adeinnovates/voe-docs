---
title: Vocabularies
description: Register, inspect, activate, and retire versioned domain vocabulary declarations over the API.
---

# Vocabularies

A vocabulary is a versioned declaration of domain record types. It can define page types, relationships, assertions, meaningful dates, and named gaps.

## Authentication

| Operation | Required scope |
|---|---|
| List installed versions | `read` |
| Read one exact declaration | `read` |
| Check a declaration | `admin` |
| Install, activate, or deactivate | `admin` |

The live grant may reduce a token's capability. A token marked `admin` cannot exceed the principal's current workspace access.

## Lifecycle

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/v1/vocabularies` | List installed versions and active state |
| `GET` | `/v1/vocabularies/declaration` | Read one exact declaration |
| `POST` | `/v1/vocabularies/dry-run` | Check the declaration against the workspace without changing it |
| `POST` | `/v1/vocabularies` | Install an immutable version |
| `POST` | `/v1/vocabularies/activate` | Accept new writes against that version |
| `POST` | `/v1/vocabularies/deactivate` | Stop new writes against that version |

## Read an exact declaration

```bash
curl -sS "$VOE/v1/vocabularies/declaration?namespace=org.example.exhibition&version=1" \
  -H "Authorization: Bearer $TOKEN"
```

The response includes the declaration, its exact version, active state, declaration path, and content hash.

## Check before installation

The API accepts the declaration as JSON text inside a JSON request.

```bash
jq -Rs '{declaration: .}' ./org.example.exhibition.v1.json | \
  curl -sS -X POST "$VOE/v1/vocabularies/dry-run" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    --data-binary @-
```

The result names whether the declaration can be installed and activated, the qualified type mappings it would add, dependency state, version conflicts, and active-version capacity.

## Install and activate

```bash
jq -Rs '{declaration: .}' ./org.example.exhibition.v1.json | \
  curl -sS -X POST "$VOE/v1/vocabularies" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    --data-binary @-
```

```bash
curl -sS -X POST "$VOE/v1/vocabularies/activate" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"namespace":"org.example.exhibition","version":1}'
```

Installation and activation are separate. An installed but inactive version remains inspectable, but new structured writes against it are refused.

## Declaration fields

### Top level

| Field | Required | Meaning |
|---|---|---|
| `schema` | Yes | Must be `voe.vocabulary` |
| `schemaVersion` | Yes | Declaration format version. Use `1` |
| `namespace` | Yes | Lowercase dotted name owned by the builder, such as `org.example.exhibition` |
| `version` | Yes | Positive integer. A released namespace and version pair is immutable |
| `title` | Yes | Human-readable vocabulary name |
| `dependencies` | No | Exact vocabulary versions this declaration uses |
| `pageTypes` | Yes | Domain records, entities, events, and files |
| `edgeTypes` | Yes | Allowed directed or undirected relationships |
| `assertionTypes` | No | Statements a product may record with direct support |
| `gapKinds` | No | Named evidence the record expects but does not yet hold |
| `extensions` | No | Namespaced metadata that does not change the declared contract |

Builder namespaces cannot use `voe` or `voe.*`. The file name must match the declaration: `org.example.exhibition.v1.json`.

### Common type fields

| Field | Required | Meaning |
|---|---|---|
| `id` | Yes | Lowercase local name, such as `condition_report` |
| `label` | Yes | Name shown to people |
| `coreKind` | Yes | The common record shape beneath the domain type |
| `description` | No | A short explanation of what the type represents |
| `fields` | No | Structured values accepted on the type |
| `timeFields` | No | Declared fields that carry domain time |

Use `record`, `entity`, `event`, or `file` for page types. Relationship types use `relationship`. Assertion types use `assertion`.

### Field declarations

| Field | Required | Meaning |
|---|---|---|
| `id` | Yes | Field name |
| `type` | Yes | One of the field types below |
| `required` | No | The field must appear on new writes when `true` |
| `list` | No | The value is an array when `true` |
| `maxItems` | With `list` | Maximum array length, from 1 to 1,000 |
| `values` | With `enum` | Non-empty set of accepted enum values |

Supported field types are `string`, `boolean`, `integer`, `decimal`, `date`, `datetime`, `enum`, and `semantic-ref`.

`semantic-ref` holds an exact page reference. It does not replace a relationship when the connection itself needs state, evidence, or traversal.

### Time fields

A time field points from one declared `date` or `datetime` field to a common clock.

| Clock | Use it for |
|---|---|
| `recordedAt` | When the record entered the workspace |
| `receivedAt` | When the source arrived |
| `observedAt` | When an observation was made |
| `occurredAt` | When the domain event happened |
| `effectiveAt` | When a state or agreement begins to apply |
| `dueAt` | When something is expected |
| `expiresAt` | When something stops applying |

`precedence` is an optional non-negative integer used when more than one field can supply the same clock.

### Relationship declarations

| Field | Meaning |
|---|---|
| `directed` | Whether source-to-target direction carries meaning |
| `sourceTypes` | Fully qualified page types allowed as the source |
| `targetTypes` | Fully qualified page types allowed as the target |
| `sourceMax` | Maximum live established relationships for one source in this slot |
| `targetMax` | Maximum live established relationships for one target in this slot |

Type references are exact, for example `org.example.exhibition/artwork@1`. A write that competes for a full declared slot remains proposed for review rather than silently replacing the standing relationship.

### Assertion declarations

`subjectMax` is an optional positive integer limiting current assertions of that predicate for one subject and qualifier scope. A competing supported assertion remains proposed until it is resolved.

### Gap expectations

| `kind` | Required fields | Closes when |
|---|---|---|
| `required_relation` | `edgeType`, optional `minCount`, `maxCount` | The subject has the declared relationship count |
| `required_assertion` | `predicate` | The subject has the declared assertion |
| `required_field` | `field` | The named field is present |
| `readable_attachment` | None | A relevant attachment is readable |
| `clock_comparison` | `leftClock`, `operator`, and one of `rightClock` or `rightValue` | The declared comparison holds |

Clock comparison operators are `before`, `after`, `on_or_before`, and `on_or_after`.

## Errors

| Status | Meaning |
|---|---|
| `400` | The declaration or request is malformed, conflicts with an installed immutable version, or fails a declared rule |
| `401` | The bearer token is absent or invalid |
| `403` | The principal does not hold the required workspace capability |
| `404` | The requested namespace and version are not installed |
Error responses use the common [API error shape](/api/errors). A refused dry-run does not change the workspace.

## Version changes

Do not edit an installed version in place. Publish a new integer version, install it, then activate it. Historical records retain their original qualified types. Deactivation affects new writes only.

Start with [Register a custom vocabulary](/guides/register-a-custom-vocabulary). Then use [Structured records](/api/structured-records) to write against the active types.
