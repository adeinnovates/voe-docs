---
title: Claude Code
description: Connect Claude Code over stdio.
---

# Claude Code

```bash
claude mcp add voe -e VOE_TOKEN=tok_your_assistant_token \
  -- bun run /path/to/voe/apps/mcp/src/stdio.ts
```

Or in `.mcp.json` at the project root:

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

A coding agent with Voe attached can pull real-world context into work: `search` for the thread that motivated a change, `get_context` on the people involved, `capture` a decision record when the work lands - and, under a [write grant](/guides/let-an-agent-write), write structured notes into its granted prefix.

The stdio process is long-lived, and authorization is not startup-frozen: every tool call re-resolves the key against the live grant, so disconnection or write-authority expiry takes effect mid-session.
