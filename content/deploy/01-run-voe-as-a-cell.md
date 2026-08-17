---
title: Run Voe As A Cell
description: The deployment unit for a Voe workspace service.
---

# Run Voe as a cell

A **cell** is one self-contained Voe deployment. It receives addressed sources, serves the dashboard, exposes the API, and can publish MCP for assistant clients.

A cell is the private memory service for a workspace group. It has one public origin for the dashboard and API, and an MCP origin when remote assistants are enabled.

## Public deployment contract

- The dashboard and API share one public origin.
- Remote MCP has its own HTTPS origin when exposed.
- Addressed channels route into the cell.
- Health reports whether the cell is serving, awaiting review, or degraded.
- Workspace access is always checked at the Voe surface, regardless of client.

Public builders receive the origins, channel addresses, API keys, and grants their app uses.

Next: [Required services](/deploy/required-services) · [Attachment extraction](/deploy/attachment-extraction)
