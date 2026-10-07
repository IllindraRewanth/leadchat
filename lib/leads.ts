// Placeholder data until the real chat (FE-06+) starts creating leads.
export type LeadStatus = "qualified" | "nurture" | "unqualified";

export type Lead = {
  id: string;
  name: string;
  company: string;
  status: LeadStatus;
  score: number; // 0–100, set by the AI qualifier later
  summary: string;
  createdAt: string;
};

export const leads: Lead[] = [
  { id: "l-101", name: "Priya Sharma", company: "Bloom Bakery", status: "qualified", score: 86, summary: "Needs a booking site within 4 weeks, budget confirmed.", createdAt: "2026-10-05" },
  { id: "l-102", name: "Daniel Okafor", company: "Okafor Logistics", status: "nurture", score: 54, summary: "Interested, but no budget until next quarter.", createdAt: "2026-10-06" },
  { id: "l-103", name: "Mei Tanaka", company: "Student", status: "unqualified", score: 12, summary: "Asking for free help with a class project.", createdAt: "2026-10-07" },
];

export function getLead(id: string) {
  return leads.find((l) => l.id === id);
}
