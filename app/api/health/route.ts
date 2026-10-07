import { hasAiKey, env } from "@/lib/env";

// GET /api/health: a simple JSON status the health page (and uptime checkers) can read.
export async function GET() {
  return Response.json({
    status: "ok",
    time: new Date().toISOString(),
    region: process.env.VERCEL_REGION ?? "local",
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev",
    aiKeyConfigured: hasAiKey, // true/false only, never the key itself
    aiModel: env.aiModel,
  });
}
