import { z } from "zod"
import { db } from "../database/db.js"

export const saveMessagesSchema = z.object({
    session_id: z.string().describe("The ID of the session to save messages to"),
    messages: z.array(z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().max(100000, "Message content too large"),
        source_ide: z.string().default("unknown")
    })).max(100, "Too many messages in one batch").describe("An array of message objects to store")
})

export function saveMessages(args: z.infer<typeof saveMessagesSchema>) {
    const { session_id, messages } = args;


    const insertStmt = db.prepare(`
        INSERT INTO messages (session_id, role, content, source_ide, timestamp)
        VALUES (@session_id, @role, @content, @source_ide, @timestamp)
    `);


    const insertMany = db.transaction((sessionId, msgs) => {
        const now = Date.now();
        for (const msg of msgs) {
            insertStmt.run({
                ...msg,
                session_id: sessionId,
                timestamp: now
            });
        }
        return msgs.length;
    });

    const count = insertMany(session_id, messages);

    return {
        success: true,
        count: count,
        session_id: session_id
    };
}