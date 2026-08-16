---
title: API
description: Bearer-token HTTP API — authentication, errors, streaming, and the full endpoint reference.
---

# API

Every route is workspace-scoped by bearer token; capability is the lower of the token's scope and the live grant, on every request.

- [Authentication](/api/authentication) — tokens, scopes, roles, the ceiling rule.
- [Errors](/api/errors) — one shape, honest refusals.
- [Streaming](/api/streaming) — the SSE contract on `/v1/think`.
- [Endpoint reference](/api/openapi) — the full surface, terse and complete.
