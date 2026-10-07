import type { Metadata } from "next";
import Link from "next/link";
import PagePlaceholder from "@/components/PagePlaceholder";
import StatusBadge from "@/components/StatusBadge";
import { leads } from "@/lib/leads";

export const metadata: Metadata = { title: "Leads" };

export default function LeadsPage() {
  return (
    <PagePlaceholder
      title="Leads"
      description="Every chat becomes a lead with an AI score and summary. Sample data for now."
      comingIn="FE-07 (Tool results and structured output)"
    >
      <ul className="divide-y divide-border overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface">
        {leads.map((lead) => (
          <li key={lead.id}>
            <Link href={`/leads/${lead.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 hover:bg-background">
              <span className="min-w-40 font-medium">{lead.name}</span>
              <span className="flex-1 text-sm text-muted">{lead.company}</span>
              <span className="text-sm tabular-nums text-muted">{lead.score}/100</span>
              <StatusBadge status={lead.status} />
            </Link>
          </li>
        ))}
      </ul>
    </PagePlaceholder>
  );
}
