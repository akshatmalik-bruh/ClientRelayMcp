import { z } from "zod"
import { db, Session } from "../database/db.js"


export const createSessionSchema = z.object({
    id: z.string().describe("Unique identifier for the session (e.g., 'auth-service')"),
    name: z.string().describe("A friendly name for the session"),
    project_snapshot: z.string().describe("Summary of the tech stack and project state"),
})

export function createSession(args: z.infer<typeof createSessionSchema>) {
    const now = Date.now();

    // We use @namedParameters to safely map the object to the SQL
    const statement = db.prepare(`
        INSERT INTO sessions (id, name, project_snapshot, created_at, last_updated)
        VALUES (@id, @name, @project_snapshot, @created_at, @last_updated)
        ON CONFLICT(id) DO UPDATE SET 
            name=excluded.name, 
            project_snapshot=excluded.project_snapshot, 
            last_updated=excluded.last_updated
    `);

    // We prepare the final object to be saved
    const sessionData = {
        ...args,
        created_at: now,
        last_updated: now
    };

    statement.run(sessionData);

    return sessionData; // Now it returns exactly what was saved!
}
