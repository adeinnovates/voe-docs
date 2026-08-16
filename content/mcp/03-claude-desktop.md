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

Desktop versions with remote-server support can use [HTTP MCP](/mcp/http-mcp) instead — on the hosted UAT cell, `https://mcp-uat.runvoe.com/` with the same bearer token.
