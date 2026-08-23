---
title: Claude Desktop
description: Connect Claude to Voe, approve workspace access, and start using the tools.
---

# Claude Desktop

## Connect the hosted workspace

1. Open **Settings**, then **Connectors**.
2. Choose **Add custom connector**.
3. Name the connector and paste the MCP URL shown on the Voe Connect page.
4. Add the connector. Claude opens Voe's approval page in your browser.
5. Sign in, choose the workspace, and approve read access.

Return to Claude. The connector should list nine Voe tools.

## Use Voe in a conversation

Enable the Voe connector for the conversation, then ask in ordinary language:

> Search my Voe memory for the latest discussion about Loci.

> Use Voe's cited synthesis to prepare me for my meeting with Philip. Cite the record and name anything missing.

> Use Voe's entity timeline for `people/philip-fuller`.

Claude chooses the matching tool. Name a tool when you want a specific read. If its permission is set to **Needs approval**, Claude asks before each call.

The initial connection is read-only. Claude may display all 15 tools, including the five write tools, but Voe refuses a write until the workspace owner grants write authority.

See [MCP tool reference](/mcp/tool-reference) for every tool, argument, result, and request pattern.

## Local stdio option

For a local checkout, add this to `claude_desktop_config.json` through **Settings**, **Developer**, **Edit Config**:

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

Restart Claude Desktop after changing the file. A disconnected or ungranted key is refused when the local server starts and on later tool calls.
