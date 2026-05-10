import { z } from "zod"
import { db } from "../database/db.js"

export const deleteSessionSchema = z.object({
    session_id: z.string().describe("The ID of the session to delete")
})

export function deleteSession(args: z.infer<typeof deleteSessionSchema>) {
    const { session_id } = args;
    
    const deleteMany = db.transaction((id) => {
        db.prepare("DELETE FROM messages WHERE session_id = ?").run(id);
        db.prepare("DELETE FROM memories WHERE session_id = ?").run(id);
        const result = db.prepare("DELETE FROM sessions WHERE id = ?").run(id);
        return result.changes;
    });

    const changes = deleteMany(session_id);
    if (changes === 0) {
        throw new Error(`Session ${session_id} not found.`);
    }

    return { success: true, session_id };
}
