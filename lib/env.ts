// Central place for environment variables. Real values live in Vercel's
// project settings (or a local .env.local), never in the repo.
export const env = {
  aiApiKey: process.env.AI_API_KEY ?? "",
  aiModel: process.env.AI_MODEL ?? "not-set",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};

export const hasAiKey = env.aiApiKey.length > 0;
