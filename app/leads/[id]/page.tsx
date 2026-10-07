import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PagePlaceholder from "@/components/PagePlaceholder";
import StatusBadge from "@/components/StatusBadge";
import { getLead, leads } from "@/lib/leads";

// Pre-render the sample leads at build time.
export function generateStaticParams() {
  return leads.map((l) => ({ id: l.id }));
}

export async function generateMetadata(props: PageProps<"/leads/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  return { title: getLead(id)?.name ?? "Lead" };
}

export default async function LeadPage(props: PageProps<"/leads/[id]">) {
  const { id } = await props.params;
  const lead = getLead(id);
  if (!lead) notFound();

  return (
    <PagePlaceholder
      title={lead.name}
      description={`${lead.company} · added ${lead.createdAt}`}
      comingIn="FE-07 (full transcript and AI reasoning)"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-4">
          <p className="text-xs text-muted">Status</p>
          <div className="mt-2"><StatusBadge status={lead.status} /></div>
        </div>
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-4">
          <p className="text-xs text-muted">Score</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{lead.score}</p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-4 sm:col-span-3">
          <p className="text-xs text-muted">AI summary</p>
          <p className="mt-1">{lead.summary}</p>
        </div>
      </div>
      <Link href="/leads" className="mt-6 inline-block text-sm text-brand">← All leads</Link>
    </PagePlaceholder>
  );
}
