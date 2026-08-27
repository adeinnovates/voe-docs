---
title: MCP Tool Reference
description: What each Voe tool does, when an assistant should use it, and how to start a call.
---

# MCP tool reference

A connected assistant sees tools for reading the workspace and, when granted, adding or amending records. The available set follows the connection's current server and access.

## Start a tool call

In Claude or ChatGPT, start with an ordinary request. The assistant chooses the matching tool and fills its arguments.

> Search my Voe memory for the latest terms discussed with Meridian.

> Use Voe's entity timeline for `people/philip-fuller` and summarize the recent history.

> Use Voe's cited synthesis to prepare me for the next Loci meeting.

Name the tool when the choice matters. The client may ask you to approve the call, depending on its tool permission setting.

:::info
Client permission and Voe access are separate. Setting a tool to always allow in Claude removes Claude's approval prompt. It does not give the connection write access. Voe refuses write calls until the workspace owner grants write authority.
:::

After session initialization, a direct MCP client starts a call with `tools/call`. Client libraries normally wrap this request. For example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "search",
    "arguments": {
      "query": "Meridian revised terms",
      "limit": 5
    }
  }
}
```

## Tool map

| Connector label | Tool name | Access | Use it when |
|---|---|---|---|
| Hybrid search | `search` | Read | You need the records most relevant to a query |
| Walk the graph | `graph_query` | Read | You need records connected to known pages |
| Fetch one page | `get_page` | Read | You know a page slug and need the complete record |
| Vocabulary list | `vocabulary_list` | Read | You need the active domain types accepted by the workspace |
| Entity timeline | `entity_timeline` | Read | You need the history connected to one person, company, or other entity |
| Token-budgeted context bundle | `get_context` | Read | You need prompt-ready context within a size limit |
| Cited synthesis | `think` | Read | You need a cited answer and a report of what the workspace does not hold |
| List assertions | `list_assertions` | Read | You need qualified statements and their current evidence state |
| List structured relationships | `list_relationships` | Read | You need qualified connections and their current evidence state |
| List record gaps | `list_gaps` | Read | You need open or resolved built-in and domain gaps |
| Capture a page | `capture` | Write | You need to submit a complete markdown record |
| Create an assertion | `create_assertion` | Write | You need to add a qualified statement with direct support |
| Create a structured relationship | `create_relationship` | Write | You need to connect two pages under an active vocabulary |
| Create a page (agent write path) | `create_page` | Write | An agent needs to create a page under its write authority |
| Amend a page (agent write path) | `patch_page` | Write | An agent needs to amend a page it has already read |

## Read tools

### `search`

Returns ranked records with their slugs, excerpts, and evidence details.

**Ask:** "Search my Voe memory for the latest discussion about the Loci sales deck."

**Input:**

- `query` is required.
- `limit` sets the maximum number of results. The default is 20.
- `explain` includes a reason for each result's position.
- `includeDerived` includes text read from attachments or transcripts.
- `includeSuspicious` and `includeUnknownFull` widen the source admission defaults.

### `graph_query`

Follows recorded connections from one or more known pages. It returns connected pages rather than prose.

**Ask:** "Use Voe's graph tool from `companies/loci`, follow both directions for two hops, and show me the connected people and meetings."

**Input:**

- `startSlugs` is a required list of one or more page slugs.
- `edgeTypes` can limit the call to named connection types.
- `depth` accepts 1 to 3. The default is 3.
- `direction` accepts `out`, `in`, or `both`. The default is `out`.
- `assertionStates` can restrict semantic relationships to `proposed`, `established`, `disputed`, or `superseded`.

### `get_page`

Fetches one complete page by slug, including its body, frontmatter, attachments, and `bodySha256`.

**Ask:** "Fetch the Voe page at `messages/2026/08/15/email-53eff616`."

**Input:** `slug` is required.

The returned `bodySha256` is also the version value required by `patch_page`.

### `vocabulary_list`

Lists installed vocabulary versions and shows which are active. Read the exact declaration through the Vocabulary API when a builder or application needs its accepted fields, enum values, clocks, relationships, assertions, and gaps.

**Ask:** "List the active Voe vocabularies before writing a structured relationship."

This tool takes no input. Installation and activation are workspace administration tasks and are not available through MCP.

See [Domain vocabularies over MCP](/mcp/domain-vocabularies) for the discovery and write order.

### `entity_timeline`

Returns pages directly connected to one entity in time order.

**Ask:** "Use Voe's entity timeline for `people/philip-fuller` and tell me what happened most recently."

**Input:**

- `slug` is required and should name an entity page.
- `clock` can order the timeline by `recordedAt`, `receivedAt`, `observedAt`, `occurredAt`, `effectiveAt`, `dueAt`, or `expiresAt`.

When a requested domain clock is absent, the result names the fallback rather than inventing a date.

### `get_context`

Builds a prompt-ready context bundle from a query, named entities, or both. The result fits the requested token budget and includes a gap report.

**Ask:** "Build a Voe context bundle for my next meeting with Philip about Loci, using at most 6,000 tokens."

**Input:**

- `query` describes the task or question.
- `entities` lists page slugs that must anchor the bundle.
- `tokens` sets the size budget. The default is 8,000.
- `includeDerived` includes readable attachment and transcript text.
- `includeSuspicious` and `includeUnknownFull` widen the source admission defaults.
- `graphScope` adds an explicit graph neighborhood with start pages, relationship filters, direction, depth, record and relationship caps, an optional time range, and state filters.

Provide `query`, `entities`, or both.

### `think`

Builds context and returns a cited answer over the workspace. It also reports missing, stale, or unreadable material relevant to the question.

**Ask:** "Use Voe's cited synthesis to prepare me for the next Loci meeting. Cite the record and tell me what is missing."

**Input:**

- `query` is required.
- `mode` accepts `strict` or `annotate`. MCP defaults to `strict`, which withholds sentences that cannot be tied to the record.
- `entities` accepts up to eight page slugs that anchor the question to known people, companies, or records.
- `conversation` accepts up to eight prior `user` or `assistant` turns for follow-up continuity.
- `graphScope` adds the same explicit, capped graph neighborhood available to `get_context`.

Prior turns guide retrieval and wording. They are not evidence. Think can cite only the records returned in `sources`.

The result contains `answer`, a structured `sources` array, `citationWarning`, `withheld`, and `gaps`. Each source names the citation slug, parent page, label, grade, kind, and source reference. The result returns as one completed response rather than a token stream.

```json
{
  "answer": "Meridian sent revised terms Friday [messages/2026/08/15/email-53eff616].",
  "sources": [{
    "slug": "messages/2026/08/15/email-53eff616",
    "pageSlug": "messages/2026/08/15/email-53eff616",
    "label": "Revised terms",
    "type": "message",
    "reason": "search",
    "grade": "record",
    "sourceKind": "page",
    "sourceRef": "messages/2026/08/15/email-53eff616"
  }],
  "gaps": { "missingEntities": [], "staleEntities": [] }
}
```

### `list_assertions`

Lists qualified assertions and their evidence state. The default returns live, established assertions supported by record-grade material.

**Ask:** "List established account-stage assertions for `companies/meridian`."

**Input:**

- `subject` filters by subject page slug.
- `predicate` filters by fully qualified assertion type.
- `includeAllStates` includes proposed, disputed, and superseded assertions.
- `includeDerived` includes assertions supported only by derived material.
- `limit` accepts 1 to 200.

### `list_relationships`

Lists qualified relationships and their evidence state.

**Ask:** "List established relationships from `companies/meridian`."

**Input:**

- `source` and `target` filter by page slug.
- `relationship` filters by fully qualified relationship type.
- `includeAllStates` includes proposed, disputed, and superseded relationships.
- `includeDerived` includes relationships supported only by derived material.
- `limit` accepts 1 to 200.

### `list_gaps`

Lists built-in and vocabulary-qualified gaps.

**Ask:** "List the open gaps for this workspace."

**Input:**

- `status` accepts `open`, `dismissed`, or `settled`.
- `kind` filters by a built-in or fully qualified gap kind.

## Write tools

OAuth connections begin with read access. The write tools still appear in the connector's tool list, but Voe refuses them until the workspace owner grants write authority. See [Let an agent write](/guides/let-an-agent-write).

### `capture`

Submits a complete markdown record through the general capture path.

**Ask:** "Capture the following meeting note in Voe exactly as written."

**Input:** `markdown` is required.

Use `capture` when the input is already a complete record. Use `create_page` when the agent needs to choose a page slug and type under its granted write path.

### `create_assertion`

Writes a qualified assertion with direct supporting records. The connection needs write authority for the exact vocabulary version and assertion type.

**Ask:** "Record that Blue Horizon passed its arrival condition check, supported by the condition report."

**Input:**

- `subject`, `predicate`, and `object` are required.
- `predicate` is a fully qualified assertion type.
- `object` carries either a page `ref` or a value and optional `valueType`.
- `statedIn` and `supportedBy` name the record material behind the assertion.
- `qualifiers`, `clocks`, `confidence`, and `reason` add declared context without replacing evidence.

### `create_relationship`

Writes a qualified relationship between two pages with direct supporting records. The active vocabulary checks direction and allowed source and target types.

**Ask:** "Connect Blue Horizon to its arrival report with the active `inspected_in` relationship, supported by that report."

**Input:**

- `source`, `relationship`, `target`, and `statedIn` are required.
- `relationship` is a fully qualified relationship type.
- `supportedBy` lists the record pages that support the connection.
- `clocks`, `confidence`, and `reason` add declared context.

### `create_page`

Creates a page when the requested slug, type, mode, and source tier fit the connection's current write authority.

**Ask:** "Create a Voe note at `agent/loci-meeting-brief` using the note below."

**Input:**

- `slug`, `type`, and `body` are required.
- `semanticType` names an active, fully qualified domain page type.
- `semanticFields` supplies fields declared by that type, including any source fields used for domain clocks.
- `frontmatter` adds structured fields.
- `requestedTier` states the source tier requested for the page.

A slug uses lowercase kebab-case segments joined with `/`. A call outside the granted path is refused with a reason.

### `patch_page`

Amends an existing page without silently replacing a newer version.

**Ask:** "Fetch `agent/loci-meeting-brief`, then amend it with these decisions."

**Input:**

- `slug` and `expectedSha256` are required.
- `semanticType` and `semanticFields` can set or amend the page's qualified domain shape.
- `body` replaces the body when supplied.
- `frontmatter` merges structured fields when supplied.
- `requestedTier` states the source tier requested for the amendment.

Call `get_page` first and pass its current `bodySha256` as `expectedSha256`. If the page changed after the read, Voe refuses the amendment and returns the current hash. Read the page again before retrying.

## Refusals

Tools return a readable error result when a call cannot proceed. Common causes are a disconnected assistant, missing or expired write authority, a write outside the granted path, a detected credential in submitted text, or an out-of-date `expectedSha256`.

Next: [Claude Desktop](/mcp/claude-desktop) · [OAuth connections](/mcp/oauth-connections) · [Strict grounding](/mcp/strict-grounding-for-machine-callers)
