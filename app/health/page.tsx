import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";
import HealthStatus from "@/components/HealthStatus";

export const metadata: Metadata = { title: "Health" };

export default function HealthPage() {
  return (
    <PagePlaceholder
      title="Health check"
      description="Live data fetched from /api/health. If this loads, the deployment and API routes are working."
    >
      <HealthStatus />
    </PagePlaceholder>
  );
}
