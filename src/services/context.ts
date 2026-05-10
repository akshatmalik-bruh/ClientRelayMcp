import { db, Session, Message, Memory } from "../database/db.js";

/**
 * The "Chef" service: This function fetches all pieces of data for a session
 * and formats them into a single, powerful "Handoff Prompt" for the next AI.
 */
export function generateHandoffPrompt(sessionId: string, messageLimit: number = 20): string {
    // 1. Fetch basic session info
    const session = db.prepare("SELECT * FROM sessions WHERE id = ?").get(sessionId) as Session | undefined;
    
    if (!session) {
        throw new Error(`Session ${sessionId} not found.`);
    }

    // 2. Fetch all memories (decisions/facts)
    const memories = db.prepare("SELECT memory FROM memories WHERE session_id = ? ORDER BY created_at ASC").all(sessionId) as Memory[];

    // 3. Fetch recent messages (last N)
    const messages = db.prepare("SELECT role, content FROM messages WHERE session_id = ? ORDER BY timestamp DESC LIMIT ?").all(sessionId, messageLimit) as Message[];
    messages.reverse(); // Bring back to chronological order


    // 4. Build the Handoff String
    let prompt = `--- SESSION HANDOFF: ${session.name} ---\n\n`;
    
    prompt += `## PROJECT SNAPSHOT\n`;
    prompt += `${session.project_snapshot || "No snapshot provided."}\n\n`;

    if (memories.length > 0) {
        prompt += `## KEY DECISIONS & MEMORIES\n`;
        memories.forEach((m, i) => {
            prompt += `${i + 1}. ${m.memory}\n`;
        });
        prompt += `\n`;
    }

    if (messages.length > 0) {
        prompt += `## CONVERSATION HISTORY (Last 20 turns)\n`;
        messages.forEach((msg) => {
            const roleName = msg.role === "user" ? "USER" : "ASSISTANT";
            prompt += `[${roleName}]: ${msg.content}\n`;
        });
        prompt += `\n`;
    }

    prompt += `--- END OF HANDOFF ---\n`;
    prompt += `You are now continuing this session. Please review the context above and wait for the user's next instruction.`;

    return prompt;
}
