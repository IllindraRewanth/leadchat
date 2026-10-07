import type { LeadStatus } from "@/lib/leads";

const styles: Record<LeadStatus, string> = {
  qualified: "text-success border-success/40",
  nurture: "text-warning border-warning/40",
  unqualified: "text-danger border-danger/40",
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}
