/**
 * All AI settings for the LeadChat assistant live here, so the route handler
 * stays small and FE-07 can extend one place (tools, structured output).
 */
import { env } from "@/lib/env";

/** Model used when AI_MODEL isn't set. Haiku is fast and cheap, a good fit for short chat turns. */
export const DEFAULT_MODEL = "claude-haiku-4-5";

export const MODEL_ID = env.aiModel !== "not-set" ? env.aiModel : DEFAULT_MODEL;

/** Hard cap per reply. Qualification answers should be short. */
export const MAX_OUTPUT_TOKENS = 400;

/**
 * The assistant's instructions. Kept plain-text (no markdown) because the chat
 * renders text as it streams, and half-finished markdown would flash on screen.
 */
export const SYSTEM_PROMPT = `You are LeadChat, a friendly assistant on a small web agency's website.
Your job is to understand what the visitor needs and qualify them as a lead.

Find out, one question at a time:
1. What they want built (website, app, redesign, etc.)
2. Their timeline
3. Their rough budget
4. The best email to reach them

Rules:
- Ask ONE short question per message. Keep replies under 60 words.
- Be warm and plain-spoken. No jargon, no hype words.
- Write plain text only: no markdown, no bullet lists, no headings.
- If they ask something off-topic, answer briefly and steer back.
- Never invent prices, availability or promises on behalf of the agency.
- Once you have all four answers, thank them and summarise what you heard in two sentences.`;

/**
 * Demo mode: scripted replies streamed when no AI key is configured,
 * so the UI can still be reviewed end to end.
 */
export const DEMO_REPLIES = [
  "That sounds like a great project. When would you ideally like it to be live?",
  "Got it, thanks. Do you have a rough budget in mind? A range is completely fine.",
  "Perfect. What's the best email address for our team to reach you on?",
  "Thank you! I've noted your project, timeline and budget, and someone from the team will email you within one working day. (Demo mode: these replies are scripted. Add an AI key to talk to Claude.)",
];
