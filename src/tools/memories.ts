import { z } from "zod"
import { db } from "../database/db.js"

export const addMemorySchema = z.object({
    session_id: z.string().describe("The ID of the session to add a memory to"),
    memory: z.string().max(10000, "Memory content too large").describe("The specific fact or decision to remember (e.g. 'Use Argon2 instead of Bcrypt')")
})

export function addMemory(args: z.infer<typeof addMemorySchema>) {
    const { session_id, memory } = args;
    const now = Date.now();

    const statement = db.prepare(`
        INSERT INTO memories (session_id, memory, created_at)
        VALUES (@session_id, @memory, @created_at)
    `);

    statement.run({
        session_id,
        memory,
        created_at: now
    });

    return {
        success: true,
        session_id,
        memory
    };
}
