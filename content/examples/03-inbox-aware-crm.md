---
title: Inbox-Aware CRM
description: A CRM whose activity feed is the real record, not manual entry.
---

# Inbox-aware CRM

**Flows in:** each user's forwarded deal mail; your app's own events via `POST /ingest` ("stage moved to diligence").

**You call:** `search` filtered to a counterpart for the activity feed; `graph_query` from a company slug for the deal's web of people and threads; `context` when your model drafts a status summary.

**The agent sees:** app events and real correspondence in one ranked stream - your CRM rows and their evidence, together.

**The user can inspect:** every activity item taps through to the page; message pages carry transport checks and sender tier.

**Gaps surfaced:** a deal with no heard mail in 30 days shows a stale-entity gap - the pipeline review writes itself.

**Checked writes:** let the agent file its own summaries under `crm/` with a scoped write grant - see [the writeback example](/examples/checked-writeback-workflow).
