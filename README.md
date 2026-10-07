# LeadChat

An AI chat widget that talks to website visitors, asks qualification questions, and turns each conversation into a scored lead. This is my capstone for the FlyRank Frontend AI Engineering track.

**Live:** https://leadchat-sigma.vercel.app (health check: https://leadchat-sigma.vercel.app/health)

**Status:** FE-06. The chat streams real AI replies (Claude via the AI SDK). See [SPEC.md](SPEC.md).

## Stack

- Next.js (App Router). Server Components by default; Client Components only for the chat widget and the health check
- Tailwind CSS v4 with design tokens in `app/globals.css`
- Deployed on Vercel. Every push to `main` deploys, and every branch or PR gets a preview URL

## Routes

| Route | What it is |
|---|---|
| `/` | Landing page with the floating chat widget |
| `/chat` | Full-page chat (placeholder) |
| `/leads`, `/leads/[id]` | Lead list and detail (sample data) |
| `/settings` | Qualification questions (placeholder) |
| `/health` | Health check that renders live data from `/api/health` |

## Streaming chat (FE-06)

- **Route handler:** [`app/api/chat/route.ts`](app/api/chat/route.ts) calls Claude with the AI SDK's `streamText` and returns a UI message stream. The Stop button's abort signal is passed through, so stopping also cancels the request to Claude.
- **Chat component:** [`components/Chat.tsx`](components/Chat.tsx) uses `useChat` and renders the message parts. It's used on `/chat` and in the floating widget on `/`.
- **Model config:** [`lib/ai-config.ts`](lib/ai-config.ts) holds the system prompt, model, output limit and demo replies in one commented module.
- **Behaviour:** a thinking indicator shows until the first token, in the same bubble the text then fills. Replies stream word by word. Stop keeps the partial reply and re-enables the input. Auto-scroll follows new text only while you're at the bottom; scroll up and a "Jump to latest" button appears. Errors show a "Try again" button. Motion respects `prefers-reduced-motion`.
- **Demo mode:** if no `AI_API_KEY` is set, the same route streams scripted replies, so the UI can still be reviewed. Add the key in Vercel → Settings → Environment Variables and redeploy to switch to Claude.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in values when needed
npm run dev
```

## Environment variables

All variables are listed in `.env.example` and read in one place, `lib/env.ts`. Real values go in Vercel → Project → Settings → Environment Variables, never in the repo. The health check only reports whether the AI key is set, never its value.

## How AI was used

Built with Claude as the coding assistant. Claude scaffolded the app, wrote the pages and components, and tested the build, the routes and the 375px / 1280px layouts with a headless browser.

Issues found while reviewing the AI's work:

1. **Google Fonts broke the build.** The starter template's `next/font/google` (Geist) couldn't be fetched in the build environment. Replaced it with a system font stack, which removes a network dependency from every build.
2. **Lint error in the health check.** The first version called `setState` directly inside `useEffect`, which `react-hooks/set-state-in-effect` flags. It was refactored to fetch in the effect and set state only when the request resolves, with a guard against updates after leaving the page.

Issues found in FE-06:

3. **Prerender error from `useChat`.** Next.js 16 refused to prerender `/chat` because `useChat` generated a random chat id during render. Fixed by giving each chat a fixed id (`"page"` and `"widget"`).
4. **Demo replies were one step behind.** The widget already opens with "What are you looking to build?", but the first scripted reply asked the same thing again. Removed the duplicate, so the demo goes straight to the timeline question.
5. **Tested with a headless browser at 375px:** the thinking indicator appears, text visibly grows while streaming, Stop keeps the partial reply and sending again works, multi-turn state holds, scrolling up during a reply holds your position, and an invalid API key shows the error state instead of breaking.

### My changes

- **Rewrote the home page headline** in `app/page.tsx`, from "Turn website visitors into qualified leads, while you sleep." to "A chat assistant that finds your best customers for you", which is plainer and says what the product does.
