---
title: Errors
description: Error shape, status codes, and how refusals speak.
---

# Errors

One shape everywhere:

```json
{ "status": "error", "message": "A guest needs an end date. Choose how long the access lasts.", "error": "…" }
```

## Status codes

| Code | Used for |
|---|---|
| `400` | A request the caller can fix - the message states the rule that refused it |
| `401` | No valid key |
| `403` | Valid key, insufficient or lapsed authority - the message says which |
| `404` | No such route or record in this workspace's view |
| `409` | A concurrent action already holds the lock (for example a feed sync in progress) |
| `413` | Body over the route's size cap |
| `429` | Rate limit - capture and auth routes are limited per workspace or address |
| `500` | Voe's fault, logged with a request id; never used for rules |

## How refusals speak

Refusals name the rule, not the implementation: *"Connect an assistant from the Connect page so its access is granted with its key."* and *"This assistant's write authority has ended, so it can still read but no longer write."* `4xx` messages are stable, user-showable prose; authority denials are facts, not retryable transients.
