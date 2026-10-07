# LeadChat

An AI chat widget that talks to website visitors, asks qualification questions, and turns each conversation into a scored lead. This is my capstone for the FlyRank Frontend AI Engineering track.

**Live:** https://leadchat-sigma.vercel.app (health check: https://leadchat-sigma.vercel.app/health)

**Status:** FE-05 skeleton. Every screen exists as a routed placeholder; the real chat arrives in FE-06. See [SPEC.md](SPEC.md).

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

### My changes

_Add what you changed yourself here._
