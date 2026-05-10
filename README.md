# 🌐 Chat Relay MCP

[![npm version](https://img.shields.io/npm/v/chat-relay-mcp.svg)](https://www.npmjs.com/package/chat-relay-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP Protocol](https://img.shields.io/badge/MCP-1.29.0-blue.svg)](https://modelcontextprotocol.io)

**Chat Relay MCP** is a high-fidelity Model Context Protocol server designed to bridge the gap between AI-powered IDEs. It provides a persistent, local-first bridge to sync chat sessions, AI memories, and project context across Cursor, Antigravity, VS Code, and more.

> [!NOTE]
> **Compatibility:** Tested and optimized for **Cursor** and **Antigravity**.

## ✨ Key Features

- **Persistent Continuity:** Automatically saves and syncs AI memories across separate sessions using a local SQLite database.
- **Cross-IDE Handoff:** Effortlessly transfer conversation context between different IDE (e.g., from Cursor to Antigravity).
- **Zod-Validated Integrity:** Strict schema validation ensures AI-generated data is clean, structured, and free from hallucinations.
- **Local-First Privacy:** All data stays on your machine. No external cloud dependencies or third-party storage.

## 🚀 Quick Start

To use Chat Relay, you need to add it to your IDE's MCP configuration.

### 1. Configuration for Cursor
1. Open **Cursor Settings** (Gear icon or `Cmd/Ctrl + Shift + J`).
2. Navigate to **General** -> **MCP**.
3. Click on **+ Add New MCP Server**.
4. Set the name to `chat-relay`.
5. Set the type to `command`.
6. Paste the following into the **Command** field:
   ```bash
   npx -y chat-relay-mcp
   ```

### 2. Configuration for Antigravity
1. Open **Antigravity Settings**.
2. Go to **Advanced** -> **MCP Settings**.
3. Click **Edit Config File**.
4. Ensure your configuration includes the `chat-relay` entry inside the `mcpServers` block:

```json
{
  "mcpServers": {
    "chat-relay": {
      "command": "npx",
      "args": ["-y", "chat-relay-mcp"]
    }
  }
}
```

## 🛠️ Tools Available

The relay exposes a suite of tools that your AI can use to manage context:

| Tool | Description |
|------|-------------|
| `create_session` | Initialize a new context tracking session with a unique ID. |
| `save_messages` | Batch save conversation history to the persistent database. |
| `add_memory` | Store specific facts or architectural decisions for long-term recall. |
| `get_session` | Generate a comprehensive Handoff Prompt to transfer context to another IDE. |
| `list_sessions` | Retrieve a directory of active context-sharing sessions. |
| `delete_session` | Securely wipe all data associated with a specific session. |

## 💻 Local Development

If you want to modify the server or run it from source:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akshatmalik-bruh/ClientRelayMcp.git
   cd ClientRelayMcp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the server:**
   ```bash
   npm run build
   ```

4. **Run in dev mode:**
   ```bash
   npm run dev
   ```

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built by Akshat Malik
