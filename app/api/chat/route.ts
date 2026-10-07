import { createAnthropic } from "@ai-sdk/anthropic";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { DEMO_REPLIES, MAX_OUTPUT_TOKENS, MODEL_ID, SYSTEM_PROMPT } from "@/lib/ai-config";
import { env, hasAiKey } from "@/lib/env";

// Streaming responses can take a while; allow up to 30s on Vercel.
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No messages" }, { status: 400 });
  }

  // The key is read on the server only; it never reaches the browser.
  if (hasAiKey) {
    const anthropic = createAnthropic({ apiKey: env.aiApiKey });
    const result = streamText({
      model: anthropic(MODEL_ID),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages.slice(-20)), // keep requests small
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      abortSignal: req.signal, // the Stop button cancels the upstream request too
    });
    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  }

  return demoResponse(messages, req.signal);
}

/** Streams a scripted reply word by word so the UI behaves like the real thing. */
function demoResponse(messages: UIMessage[], signal: AbortSignal) {
  const turn = messages.filter((m) => m.role === "user").length - 1;
  const reply = DEMO_REPLIES[Math.min(turn, DEMO_REPLIES.length - 1)];
  const words = reply.split(/(?<=\s)/); // keep the spaces attached
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const stream = createUIMessageStream({
    async execute({ writer }) {
      const id = crypto.randomUUID();
      await sleep(600); // "thinking" time before the first token
      writer.write({ type: "text-start", id });
      for (const word of words) {
        if (signal.aborted) break;
        writer.write({ type: "text-delta", id, delta: word });
        await sleep(45);
      }
      writer.write({ type: "text-end", id });
    },
  });

  return createUIMessageStreamResponse({ stream });
}
