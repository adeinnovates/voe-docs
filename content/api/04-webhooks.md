---
title: Webhooks
description: Subscribe to signed workspace events without placing record content in the delivery payload.
---

# Webhooks

A webhook subscription exposes workspace changes to your product as compact identifiers and state. Your product decides what to do next.

Webhook payloads do not contain page bodies, extracted attachment text, Think prompts or answers, access keys, OAuth tokens, invitation tokens, or signing secrets. Fetch record content through the workspace API when it is needed. That read receives the usual authorization check.

## 1. Discover event names

Event discovery requires `read`:

```bash
curl -s "$VOE/v1/webhook-events" \
  -H "Authorization: Bearer $TOKEN"
```

The response is the event catalog accepted by that Voe deployment. Use it instead of keeping a separate hard-coded list.

Current groups cover:

- **Record:** pages and attachment reading states.
- **Graph:** entities and connections.
- **Review:** held material, identity review, failed sources, support loss, and gaps.
- **Access:** assistant connections and workspace grants.
- **Sources:** calendar connection and sync state.
- **Semantics:** assertions, structured relationships, and vocabulary state.

Think does not emit request or answer events. It reads the workspace and returns cited output to its caller.

## 2. Create a subscription

Subscription changes require `admin`. The signing secret is returned once.

```bash
curl -s -X POST "$VOE/v1/subscriptions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/hooks/voe",
    "eventTypes": [
      "page.created",
      "attachment.readable",
      "gap.opened",
      "relationship.established"
    ],
    "ordered": true,
    "replayFrom": "now"
  }'
```

Keep the returned secret in your secret store. Voe does not show it again.

`replayFrom` accepts:

- `now`, the default, starts after the newest retained workspace event.
- `retained` starts from the earliest workspace event still available.

Use `retained` only when the receiver can handle earlier events and deduplicate by `eventId`.

## 3. Receive and verify

A matching event is delivered as an HTTP `POST` with JSON:

```json
{
  "eventId": "evt_...",
  "eventType": "attachment.readable",
  "workspaceId": "ws_...",
  "payload": {
    "attachmentId": "att_...",
    "pageSlug": "messages/2026/08/22/email-7f41",
    "filename": "report.pdf",
    "status": "extracted"
  },
  "createdAt": "2026-08-22T18:04:00.000Z"
}
```

The request includes:

```text
X-Voe-Event-Id: evt_...
X-Voe-Event-Type: attachment.readable
X-Voe-Signature: t=<unix-ms>,v1=<hex-hmac>
```

Compute `HMAC-SHA256(secret, timestamp + "." + rawBody)` and compare it with `v1`. Use the request body exactly as received. Reject stale timestamps, then deduplicate by `eventId` before processing.

Return any `2xx` status only after your receiver has accepted the event. Other responses and network failures are retried.

## 4. Read delivery health

```bash
curl -s "$VOE/v1/subscriptions" \
  -H "Authorization: Bearer $TOKEN"
```

Each result includes:

| Field | Meaning |
|---|---|
| `deliveryStatus` | `active`, `retrying`, `attention`, or `disabled` |
| `consecutiveFailures` | Failed attempts for the current event |
| `deadLetterCount` | Events that need attention after delivery retries |
| `lastError` | Latest delivery error, or `null` |
| `nextAttemptAt` | When Voe may try again |

Events are delivered in order today. `ordered` remains part of the subscription contract, but `ordered: false` does not enable unordered delivery.

## 5. Change or stop a subscription

| Method | Path | Purpose |
|---|---|---|
| `PATCH` | `/v1/subscriptions/:id` | Change the URL, selected events, or `ordered` value |
| `POST` | `/v1/subscriptions/:id/rotate-secret` | Replace the signing secret and return it once |
| `DELETE` | `/v1/subscriptions/:id` | Disable the subscription |

Changing the URL or event selection preserves delivery position. Secret rotation does too. Update the receiver so it can accept the replacement, rotate the secret, then store the returned value.

Only completed changes produce events. A failed change produces no event.

Next: [Authentication](/api/authentication) | [Errors](/api/errors) | [Endpoint reference](/api/openapi)
