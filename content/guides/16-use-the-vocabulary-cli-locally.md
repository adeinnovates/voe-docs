---
title: Use The Vocabulary CLI Locally
description: Validate and register a custom vocabulary beside a local or self-hosted Voe cell.
---

# Use the vocabulary CLI locally

This path is for builders with the Voe CLI and direct access to a local or self-hosted cell. Hosted builders can complete the same workspace lifecycle through the [Vocabulary API](/api/vocabularies) without installing the CLI.

## Check the file

```bash
voe vocab validate ./org.example.exhibition.v1.json
```

Validation checks the filename and declaration together. It does not connect to a workspace.

## Use an active workspace

Vocabulary workspace commands use the active local workspace. If one is already active, continue to the preview. To create a new local workspace:

```bash
voe init exhibition-production
```

## Preview the workspace change

```bash
voe vocab dry-run ./org.example.exhibition.v1.json
```

The preview checks dependencies, installed versions, type mappings, activation capacity, and conflicts without changing workspace state.

## Install and activate

```bash
voe vocab install ./org.example.exhibition.v1.json
voe vocab activate org.example.exhibition@1
```

Installation keeps the exact declaration. Activation permits new writes against that version. Historical records keep the qualified version under which they were written.

## Confirm the result

```bash
voe vocab list
```

Use the exact qualified types returned by the workspace. Labels are for display; qualified references are the write contract.

## Compare a new version

Released versions do not change in place. Validate the next declaration and compare it with the installed version before activation.

```bash
voe vocab validate ./org.example.exhibition.v2.json
voe vocab diff ./org.example.exhibition.v2.json \
  --against org.example.exhibition@1
```

Then preview, install, and activate version 2 through the same sequence.

Start with [Register a custom vocabulary](/guides/register-a-custom-vocabulary) for the declaration and first structured write.
