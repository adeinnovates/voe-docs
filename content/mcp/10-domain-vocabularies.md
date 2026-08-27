---
title: Domain Vocabularies Over MCP
description: Discover active vocabulary versions and use their exact types through connected assistants.
---

# Domain vocabularies over MCP

Connected assistants can discover the vocabulary versions available to a workspace and use active qualified types in structured reads and writes.

## 1. Discover the workspace versions

Call `vocabulary_list` before making a domain write.

> List the active Voe vocabularies for this workspace.

The tool returns installed vocabulary versions and their active state. It takes no input.

Read the exact declaration through `GET /v1/vocabularies/declaration` when a builder or application needs the accepted fields, enum values, clocks, relationships, assertions, and gaps. Do not ask an assistant to guess those details from a label.

## 2. Use an exact qualified type

Domain types include the namespace and version:

```text
org.example.exhibition/artwork@1
org.example.exhibition/inspected_in@1
org.example.exhibition/condition_cleared@1
```

The assistant can then use:

- `create_page` with `semanticType` and `semanticFields`
- `create_relationship` with an active qualified relationship type
- `create_assertion` with an active qualified predicate
- `list_relationships`, `list_assertions`, and `list_gaps` to read current state
- `entity_timeline`, `graph_query`, `get_context`, and `think` to read the resulting record

## 3. Keep write authority exact

Read connections can discover and query structured records. Writes also require a live write grant that names the vocabulary version and the permitted assertion or relationship types.

```json
{
  "vocabularyVersions": ["org.example.exhibition@1"],
  "relationshipTypes": ["org.example.exhibition/inspected_in@1"],
  "assertionTypes": ["org.example.exhibition/condition_cleared@1"]
}
```

Client approval settings do not widen this access. A call outside the live grant is refused.

## Administration stays outside MCP

MCP does not install, activate, deactivate, or replace vocabulary declarations. Use the [Vocabulary API](/api/vocabularies) or the command-line journey in [Register a custom vocabulary](/guides/register-a-custom-vocabulary).

This keeps assistant use separate from workspace schema administration.

Next: [MCP tool reference](/mcp/tool-reference) | [Let an agent write](/guides/let-an-agent-write)
