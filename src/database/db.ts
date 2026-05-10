import Database from "better-sqlite3"
import path from "path"
import fs from "fs"
import os from "os"

const dbPath = path.join(os.homedir(), ".chat-relay")
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true })
}
const db = new Database(path.join(dbPath, "chat.db"))
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    project_snapshot TEXT DEFAULT '',
    created_at INTEGER NOT NULL,
    last_updated INTEGER NOT NULL
  );
    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    source_ide TEXT DEFAULT 'unknown',
    timestamp INTEGER NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id)
  );
    
  CREATE TABLE IF NOT EXISTS memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    memory TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id)
  );

  CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id, timestamp);
  CREATE INDEX IF NOT EXISTS idx_memories_session ON memories(session_id, created_at);
`)
export { db }

interface Session {
  id: string;
  name: string;
  project_snapshot: string;

}
interface Message {
  id: number;
  session_id: string;
  role: string;
  content: string;
  source_ide: string;

}
interface Memory {
  id: number;
  session_id: string;
  memory: string;

}
export { Session, Message, Memory }