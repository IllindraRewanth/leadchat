# LeadChat: capstone spec

**One line:** an AI chat widget for small-business websites that talks to visitors, asks qualification questions, and turns each conversation into a scored lead.

**User:** a small agency or freelancer who gets website visitors but can't reply to every enquiry in person.

**Problem:** most contact-form enquiries are not a good fit, and the good ones go cold while waiting for a reply.

## Screens

| Route | Screen | Built in |
|---|---|---|
| `/` | Landing page with the floating chat widget | FE-05 (shell) |
| `/chat` | Full-page chat with streaming AI replies | FE-06 |
| `/leads` | List of leads with score and status | FE-07 |
| `/leads/[id]` | One lead: summary, score, transcript | FE-07 |
| `/settings` | Qualification questions and score threshold | later |
| `/health` | Health check that renders live data from `/api/health` | FE-05 |

## How qualification works (planned)

1. The AI asks about the visitor's need, timeline, budget and contact details.
2. A tool call returns structured output: `{ score, status, summary }`.
3. The lead appears in `/leads`. Status is `qualified` (score ≥ 70), `nurture`, or `unqualified`.

## Out of scope

Auth, payments, CRM integrations, and multiple workspaces.
