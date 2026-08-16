---
title: Claude Desktop
description: Connect Claude Desktop over stdio.
---

# Claude Desktop

Add to `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "voe": {
      "command": "bun",
      "args": ["run", "/path/to/voe/apps/mcp/src/stdio.ts"],
      "env": { "VOE_TOKEN": "tok_your_assistant_token" }
    }
  }
}
```

Restart the client. The server resolves the token at startup — a revoked or ungranted key is refused immediately with a message saying to reconnect, never a silent empty memory — and then revalidates on every tool call.

Ask Claude to `search` for something you know the workspace holds; then ask something it does not and read the gap report. Both behaviors are the product working.

## Reaching the hosted endpoint

Desktop's config file speaks stdio only — a `"type": "http"` block is Claude Code's schema and Desktop ignores it. To use [HTTP MCP](/mcp/http-mcp) without a local checkout, bridge it through `mcp-remote`, which is still a paste-one-JSON setup:

```json
{
  "mcpServers": {
    "voe": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp-uat.runvoe.com/", "--header", "Authorization:${VOE_AUTH}", "--transport", "http-only"],
      "env": { "VOE_AUTH": "Bearer tok_your_assistant_token" }
    }
  }
}
```

The header value rides in through `env` because Desktop's argument parsing breaks on spaces inside `args`. `--transport http-only` matches the server, which speaks streamable HTTP without the SSE half.

Claude's **Add custom connector** screen (Desktop, web, and mobile) is a different door: it takes the server URL but authenticates by OAuth or not at all. A fixed-bearer server like Voe's fits it only through the request-headers beta — an organization admin enters `Bearer tok_…` as an `Authorization` request header when adding the connector — and that beta is rolling out slowly, so treat the config-file paths above as the supported Desktop routes today. Voe's own OAuth sign-in, which would make the connector screen work first-class, is later.
