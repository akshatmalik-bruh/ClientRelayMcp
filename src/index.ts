#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { db } from "./database/db.js"

// Tool & Service Imports
import { createSession, createSessionSchema } from "./tools/session.js"
import { saveMessages, saveMessagesSchema } from "./tools/messages.js"
import { addMemory, addMemorySchema } from "./tools/memories.js"
import { listSessions } from "./tools/list_sessions.js"
import { deleteSession, deleteSessionSchema } from "./tools/delete_session.js"
import { generateHandoffPrompt } from "./services/context.js"

const server = new McpServer(
    {
        name: "Chat Relay MCP",
        version: "1.0.0"
    },
    {
        capabilities: {
            tools: {},
        }
    },
);

/**
 * TOOL 1: Create Session
 */
server.registerTool(
    "create_session",
    {
        description: "Create a new context-sharing session (e.g. 'auth-service')",
        inputSchema: createSessionSchema.shape
    },
    async (args) => {
        try {
            const result = createSession(args);
            return {
                content: [{
                    type: "text",
                    text: `Session created! ID: ${result.id}.`
                }]
            };
        } catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                isError: true
            };
        }
    }
);

/**
 * TOOL 2: Save Messages
 */
server.registerTool(
    "save_messages",
    {
        description: "Save a batch of conversation messages to a session",
        inputSchema: saveMessagesSchema.shape
    },
    async (args) => {
        try {
            const result = saveMessages(args);
            return {
                content: [{
                    type: "text",
                    text: `Successfully saved ${result.count} messages to session ${result.session_id}.`
                }]
            };
        } catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                isError: true
            };
        }
    }
);

/**
 * TOOL 3: Add Memory
 */
server.registerTool(
    "add_memory",
    {
        description: "Save a specific decision or fact to a session's long-term memory",
        inputSchema: addMemorySchema.shape
    },
    async (args) => {
        try {
            const result = addMemory(args);
            return {
                content: [{
                    type: "text",
                    text: `Memory saved: "${result.memory}"`
                }]
            };
        } catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                isError: true
            };
        }
    }
);

/**
 * TOOL 4: Get Session (The Handoff)
 */
server.registerTool(
    "get_session",
    {
        description: "Retrieve the full context handoff prompt for a specific session ID",
        inputSchema: {
            session_id: z.string().describe("The unique ID of the session to load"),
            message_limit: z.number().optional().describe("Number of recent messages to include (default: 20)")
        }
    },
    async (args) => {
        try {
            const handoff = generateHandoffPrompt(args.session_id, args.message_limit);
            return {
                content: [{
                    type: "text",
                    text: handoff
                }]
            };
        } catch (error) {
            return {
                content: [{
                    type: "text",
                    text: `Error loading session: ${error instanceof Error ? error.message : String(error)}`
                }],
                isError: true
            };
        }
    }
);

/**
 * TOOL 5: List Sessions
 */
server.registerTool(
    "list_sessions",
    {
        description: "List all available context-sharing sessions",
        inputSchema: {}
    },
    async () => {
        try {
            const sessions = listSessions();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(sessions, null, 2)
                }]
            };
        } catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                isError: true
            };
        }
    }
);

/**
 * TOOL 6: Delete Session
 */
server.registerTool(
    "delete_session",
    {
        description: "Delete a session and all its associated data",
        inputSchema: deleteSessionSchema.shape
    },
    async (args) => {
        try {
            const result = deleteSession(args);
            return {
                content: [{
                    type: "text",
                    text: `Session ${result.session_id} successfully deleted.`
                }]
            };
        } catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                isError: true
            };
        }
    }
);

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Chat Relay MCP Server running on stdio");
}

main().catch(console.error);

// Graceful shutdown
const cleanup = () => {
    db.close();
    process.exit(0);
};
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
