import { db, Session } from "../database/db.js"

export function listSessions(): Session[] {
    return db.prepare("SELECT * FROM sessions ORDER BY last_updated DESC").all() as Session[];
}
