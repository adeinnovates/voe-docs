---
title: Subscribe A Calendar Feed
description: Provider-issued iCal/ICS feeds - read-only, encrypted at rest, revocable at the source.
---

# Subscribe a calendar feed

**For:** the user's schedule in the memory without touching their calendar account.

## The one exception to "addressed only"

A calendar feed is the single subscribed source: a provider-issued, read-only ICS/iCal URL the user copies from their calendar settings. Voe holds that URL encrypted, fetches on a schedule, and can never write to the calendar - the URL is capability-scoped to reading by the provider itself, and the user revokes it at the source (Google: reset the secret address) at any time.

## Subscribe

```bash
curl -s -X POST "$VOE/v1/calendar-feeds" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"url":"https://calendar.google.com/calendar/ical/.../secret-address/basic.ics","label":"Work"}'
```

Where the user finds the URL - Google: Settings → your calendar → "Secret address in iCal format". Fastmail: Calendar settings → Export/Subscribe. Outlook: Calendar → Shared calendars → Publish.

- `POST /v1/calendar-feeds/:id/sync` - sync now (concurrent callers get `in_progress`).
- `GET /v1/calendar-feeds` - every feed with its last-sync outcome, honestly: `synced` or `unreachable` with the failure streak.
- `DELETE /v1/calendar-feeds/:id` - stop syncing; captured events remain.

## Evidence and gaps

Events become pages ("captured", distinct from messages "heard" - the statement counts keep the two apart). A revoked or broken URL degrades to a visible feed error and a doctor warning - never an error loop, never silence.

**Next:** [Capture app events](/guides/capture-app-events)
