---
title: API
description: Bearer-token HTTP API - authentication, errors, streaming, and the common endpoint reference.
---

# API

Workspace routes are scoped by bearer token; capability is the lower of the token's scope and the live grant, on every request.

Use the API when your product owns the workflow. Use MCP when an assistant needs the same memory as tools. Both read the same workspace record.

Before sending private material, read [Privacy and data use](/start/privacy-and-data-use). API responses become part of the calling product's own data handling once received.

- [Authentication](/api/authentication) - tokens, scopes, roles, the ceiling rule.
- [Errors](/api/errors) - one shape, honest refusals.
- [Streaming](/api/streaming) - the SSE contract on `/v1/think`.
- [Structured records](/api/structured-records) - vocabularies, assertions, relationships, and domain gaps.
- [Vocabularies](/api/vocabularies) - declaration fields, checks, installation, activation, and version changes.
- [Webhooks](/api/webhooks) - signed workspace events and subscription health.
- [Endpoint reference](/api/openapi) - the common workspace API surface. Provisioning routes are documented in the provisioning guide.
