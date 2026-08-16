---
title: Route Email Into Voe
description: Address provisioning, forwarding setup, first-contact review, held mail.
---

# Route email into Voe

**For:** getting the user's mail flowing into their workspace. **Scope:** `admin` to provision addresses.

## Provision an address

```bash
curl -s -X POST "$VOE/v1/addresses" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"kind":"email_local","pattern":"acme"}'
```

`email_local` gives one address (`acme@in.yourdomain`); `email_subdomain` gives a family (`anything@acme.in.yourdomain`) so the user can hand out purpose-specific addresses.

## Point mail at it

The user forwards from their real inbox (Gmail: Settings → Forwarding; Outlook: Settings → Mail → Forwarding; Fastmail: Rules) or shares the address directly. Voe receives what is addressed to it — it never logs into the mailbox.

**Response shape:** the address row with its pattern and kind; `GET /v1/addresses` lists all with last-heard times.

## Evidence behavior

Each message keeps its full original (headers, body, attachments) as raw bytes; the page records sender identity, transport-check results (SPF/DKIM/DMARC as published), and extraction confidence.

:::warning
**Held mail.** Lookalike sender domains — including exact homoglyph clones — policy failures, and detected credentials hold a message in review instead of admitting it. Optionally, first-contact quarantine holds every new sender (`POST /v1/settings/first-contact-quarantine`). Held mail enters nothing until promoted. See [Review held sources](/guides/review-held-sources).
:::

Release an address with `DELETE /v1/addresses/:id` — capture stops; the record already made stays.

**Next:** [Add SMS and voice](/guides/add-sms-and-voice)
