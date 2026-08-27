---
title: "How Agent Authority Works in Voe"
description: Connect an assistant to one workspace, grant only the writes it needs, and keep every amendment checked against the current record.
date: 2026-08-27
author: Voe team
tags:
  - agents
  - access
  - checked writes
excerpt: An assistant can work without approval on every request while its access, write scope, and conflict authority remain explicit and revocable.
pinned: false
---

# How Agent Authority Works in Voe

An assistant should not need a person to approve every search, every context request, or every routine record update. It also should not receive an open-ended key to the whole memory.

Voe takes a narrower approach.

Each assistant becomes a named principal in one workspace. That principal receives its own read access and, when needed, a separate write grant. Every request is checked against the authority that is live at that moment. Work inside the grant can proceed. Work outside it stops.

The result is useful agent independence without handing an external runtime control of the workspace.

## Voe supplies memory and authority, not the agent

The agent runtime still plans, schedules, retries, and acts in other systems. Voe does not choose its goals or operate those systems.

Voe holds the shared memory the agent reads from. It also records which principal may read, add, amend, or settle a contested reading.

An agent connection has four parts:

1. A named principal identifies the assistant.
2. A live workspace grant determines whether it may read that workspace.
3. An optional, expiring write grant limits what it may contribute.
4. Checked operations compare each request with the current grant and record state.

Several assistants can read one workspace under separate connections. One may remain read-only. Another may add project notes. A specialist agent may write a small set of domain relationships. Ending one connection does not disturb the others or rewrite the memory they shared.

## Start with a read connection

A workspace administrator creates the principal and its workspace access together:

```http
POST /v1/agent-connections
Authorization: Bearer <workspace-admin-token>
Content-Type: application/json

{
  "label": "field-research-assistant"
}
```

The returned credential is shown once. A browser authorization flow may be used for supported MCP clients instead of pasting a bearer credential. Both routes establish a named principal with access to one workspace.

At this point, the assistant can search, retrieve cited context, inspect connected records, and use Think. It cannot write.

## Add only the write authority the work requires

Write authority is separate from workspace access. It can be limited by time, page type, path, admission tier, write mode, vocabulary version, relationship type, and assertion type.

This connection can create or amend notes under one research project for seven days. It may use two qualified domain types. It cannot settle a conflict.

```http
POST /v1/agent-connections
Authorization: Bearer <workspace-admin-token>
Content-Type: application/json

{
  "label": "field-research-assistant",
  "writeAuthority": {
    "pageTypes": ["note"],
    "prefixes": ["research/coastal-marsh/"],
    "vocabularyVersions": ["org.example.fieldresearch@1"],
    "relationshipTypes": [
      "org.example.fieldresearch/surveyed_at@1"
    ],
    "assertionTypes": [
      "org.example.fieldresearch/sample_verified@1"
    ],
    "resolveRelationshipConflicts": false,
    "resolveAssertionConflicts": false,
    "tier": "known",
    "mode": "both",
    "expiresInSeconds": 604800
  }
}
```

Write modes are `create`, `annotate`, and `both`. The workspace holds the live authority. The agent cannot widen it for itself.

## Domain vocabulary is optional

The core vocabulary already covers common records such as messages, notes, people, companies, events, files, threads, and attachments. A workspace can capture, search, build context, and support agents without installing anything else.

A domain vocabulary is useful when a project needs stable language that the core vocabulary does not provide. The example below describes environmental field research. It distinguishes a study site from a field survey, records the time of observation, limits a survey to one site, and names the evidence expected before a sample is treated as verified.

```json
{
  "schema": "voe.vocabulary",
  "schemaVersion": 1,
  "namespace": "org.example.fieldresearch",
  "version": 1,
  "title": "Field Research",
  "pageTypes": [
    {
      "id": "study_site",
      "label": "Study site",
      "coreKind": "entity",
      "fields": [
        { "id": "site_code", "type": "string", "required": true }
      ]
    },
    {
      "id": "field_survey",
      "label": "Field survey",
      "coreKind": "event",
      "fields": [
        { "id": "observed_at", "type": "datetime", "required": true },
        {
          "id": "method",
          "type": "enum",
          "required": true,
          "values": ["transect", "quadrat", "visual_count"]
        }
      ],
      "timeFields": [
        { "field": "observed_at", "clock": "observedAt" }
      ]
    },
    {
      "id": "sample_record",
      "label": "Sample record",
      "coreKind": "record",
      "fields": [
        { "id": "sample_id", "type": "string", "required": true },
        { "id": "collected_at", "type": "datetime", "required": true }
      ],
      "timeFields": [
        { "field": "collected_at", "clock": "occurredAt" }
      ]
    }
  ],
  "edgeTypes": [
    {
      "id": "surveyed_at",
      "label": "Surveyed at",
      "coreKind": "relationship",
      "directed": true,
      "sourceTypes": ["org.example.fieldresearch/field_survey@1"],
      "targetTypes": ["org.example.fieldresearch/study_site@1"],
      "sourceMax": 1
    }
  ],
  "assertionTypes": [
    {
      "id": "sample_verified",
      "label": "Sample verified",
      "coreKind": "assertion",
      "subjectMax": 1
    }
  ],
  "gapKinds": [
    {
      "id": "sample_verification_missing",
      "label": "Sample verification missing",
      "expects": {
        "kind": "required_assertion",
        "predicate": "sample_verified"
      }
    }
  ]
}
```

Vocabulary installation and activation remain workspace administration. A connected agent may use only the active versions and qualified types named in its write grant. It cannot redefine the meaning of records it is allowed to write.

See [Register a custom vocabulary](/guides/register-a-custom-vocabulary) for the complete API-first setup path and field reference.

## Create inside the grant

The connection above can create a core note under its approved path:

```http
POST /v1/pages
Authorization: Bearer <agent-token>
Content-Type: application/json

{
  "slug": "research/coastal-marsh/survey-briefing",
  "type": "note",
  "frontmatter": {
    "title": "Survey briefing"
  },
  "body": "The western transect survey is recorded for Friday at 08:00.",
  "requestedTier": "known"
}
```

The same credential cannot write outside `research/coastal-marsh/`, create an unlisted page type, use an unlisted vocabulary version, or request a higher admission tier.

## Amend the version the agent actually read

An amendment includes the SHA-256 value of the page version the agent read:

```http
PATCH /v1/pages/research%2Fcoastal-marsh%2Fsurvey-briefing
Authorization: Bearer <agent-token>
Content-Type: application/json

{
  "expectedSha256": "8f3b17c3a0172e2cf5681cd70f7e91eb70f7e91eb70f7e91eb70f7e91eb53df",
  "body": "The western transect survey is confirmed for Friday at 08:00.",
  "requestedTier": "known"
}
```

If the page changed after the agent read it, the request returns `409 Conflict` with the current hash. Voe does not invent a merge.

The agent should read the current page, compare it with the intended amendment, and retry only when both can be preserved. If the readings cannot be reconciled mechanically, it should stop and surface the collision.

This prevents blind retries and silent last-write-wins replacement.

## Structured meaning is written separately

Assertions and relationships are their own records. They do not hide inside a page patch.

An allowed assertion names its qualified predicate and the workspace records that support it:

```http
POST /v1/assertions
Authorization: Bearer <agent-token>
Content-Type: application/json

{
  "subject": "research/coastal-marsh/samples/cm-104",
  "predicate": "org.example.fieldresearch/sample_verified@1",
  "object": {
    "value": "true",
    "valueType": "boolean"
  },
  "statedIn": "research/coastal-marsh/lab-reports/cm-104",
  "supportedBy": [
    "research/coastal-marsh/lab-reports/cm-104"
  ]
}
```

A declared predicate does not make an unsupported reading true. The support must already exist in the workspace and remain available to the principal.

When a structured write contests a standing reading, the challenger remains visible as a proposal instead of silently replacing what stands. Writing the proposal and deciding the conflict are separate acts.

An agent needs the matching `resolveRelationshipConflicts` or `resolveAssertionConflicts` authority to record a verdict. Those permissions are off by default and are not inherited from ordinary write access.

## Source admission answers a different question

Inbound email, SMS, voicemail, calendar material, files, and application events do not enter through an agent write grant. They follow the workspace's capture and source-admission rules.

These are different decisions:

- Source admission asks whether incoming material should enter the memory.
- Agent authority asks whether a named principal may read, add, amend, or settle part of that memory.

A connected writer cannot use its write grant to bypass a held inbound item.

## Refusals tell the agent what to do next

| Result | Meaning | Agent response |
| :--- | :--- | :--- |
| `400` | The request shape, type, or semantic reference is invalid. | Correct the request. Do not repeat it unchanged. |
| `401` | The credential or authorization session is absent, invalid, or expired. | Stop and reconnect. |
| `403` | The principal lacks the required access, write scope, tier, mode, type, path, or resolution authority. | Stop and ask for an explicit grant change. |
| `404` | The record is not visible to this principal or does not exist. | Do not infer that hidden material exists. |
| `409` | The page hash is stale or the record changed before a decision completed. | Read the current state, then reconcile or stop. |
| `429` | The service has limited the request rate. | Back off according to the response. |

A refusal is not permission to guess, fabricate evidence, or switch to a broader credential.

## Revocation is part of the connection

Disconnecting the assistant removes its workspace grant, key, write authority, authorization tokens, and pending authorization codes. The next request loses access.

The memory remains. The connection does not.

That is the useful form of agent authority in Voe: several assistants can work from one shared memory, each can receive a different footprint, and no assistant needs ownership of the workspace to be useful.

Next: [Connect over MCP](/guides/connect-over-mcp) | [Let an agent write](/guides/let-an-agent-write) | [Structured records](/api/structured-records)
