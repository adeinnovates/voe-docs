---
title: Handle Attachments
description: List, retry, preview, download - and when to include derived text.
---

# Handle attachments

**For:** documents, images, and recordings riding on captured messages. **Scope:** `read` (retry: `write`).

## List and state

```bash
curl -s "$VOE/v1/attachments" -H "Authorization: Bearer $TOKEN"
```

Each row: filename, mime, bytes, page slug, and state - stored, reading, readable, failed reading, not readable, or held. See [Attachments](/concepts/attachments) for what each means.

## Raw access

```bash
curl -s "$VOE/v1/attachments/$ID/raw" -H "Authorization: Bearer $TOKEN" -o file.pdf
```

The original bytes are workspace-scoped source material for preview and download.

## Retry a failed reading

```bash
curl -s -X POST "$VOE/v1/attachments/$ID/retry" -H "Authorization: Bearer $TOKEN"
```

## Derived text decisions

Readable attachments contribute **derived-grade** text: their own search hits, their own citations. Include it with `includeDerived=true` when breadth beats certainty (research, recall); exclude it when only asserted text should ground an answer (compliance, drafting). Either way the grade is visible in every hit.

:::warning
An attachment relevant to a question but not readable appears in the gap report by filename and state. Rendering that state tells the user that the memory holds the file but cannot read it yet.
:::

**Next:** [Build an evidence UI](/guides/build-an-evidence-ui)
