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
      "args": ["-y", "mcp-remote", "https://mcp.your-voe-cell.example/", "--header", "Authorization:${VOE_AUTH}", "--transport", "http-only"],
      "env": { "VOE_AUTH": "Bearer tok_your_assistant_token" }
    }
  }
}
```

The header value rides in through `env` because Desktop's argument parsing breaks on spaces inside `args`. `--transport http-only` matches the server, which speaks streamable HTTP without the SSE half.

Claude's **Add custom connector** screen (Desktop, web, and mobile) is a different door: it takes the server URL and authenticates by OAuth, not a header. The cell runs its own OAuth server for exactly this, so the screen can work with a URL and a browser approval — see [OAuth connections](/mcp/oauth-connections). That path is built and tested, with final acceptance against the live client still pending, so the config-file paths above remain the proven route for Desktop today.
