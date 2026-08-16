---
title: Model Providers
description: What uses a model, what never does, and per-workspace keys.
---

# Model providers

## What uses a model

- `think` — synthesis over the context bundle.
- The repair lane — messages too mangled to parse mechanically, with output verified against the original before it lands.
- Enrichment — derived synthesis pages and claim scans, always derived-grade.
- Voice transcription — via the configured transcription provider.

## What never does

Capture of parseable material, search, context packing, the graph, grants, review — the deterministic spine runs with no model configured. A cell without a key is a working memory that cannot synthesize.

## Configuration

Platform default: `ANTHROPIC_API_KEY`. Per workspace: `POST /v1/llm-config` with provider (`anthropic`, `openai`, `openai_compatible`), model, base URL, and key — stored encrypted, never returned in plaintext, health-checkable with a real probe (`GET /v1/llm-config/health`). No silent substitution: if a workspace configures a provider, its health is its own, never quietly the platform default's.

## The verifier posture

Model output never enters the record unchecked: repairs are verified against raw substrings, think citations are mechanically checked, agent writes go through authority and secret scans. Providers are rented reasoning; the record's integrity never depends on which model was rented.
