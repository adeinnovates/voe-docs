---
title: Required Services
description: What a Voe cell provides to builders, and when external providers are involved.
---

# Required services

## What the cell provides

| Service | Job |
|---|---|
| Dashboard and API | Workspace setup, capture, search, context, think, evidence, grants |
| MCP access | Assistant reads and optional checked writes |
| Addressed capture | Mail, calendar, app events, SMS, voice, and attachments where enabled |
| Background reading | Attachment reading, calendar refresh, and voice transcripts where enabled |
| Review surfaces | Held sources, gaps, and source admission states |

## External providers

- Telephony is only needed when SMS or voice capture is enabled.
- A model connection is only needed for synthesis and voice transcripts. Capture, search, context, evidence, grants, and review still work without synthesis.

The public contract is simple: Voe receives addressed sources, remembers them with evidence, and serves cited context to consumers with live workspace grants.
