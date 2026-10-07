"use client";

import { useEffect, useState } from "react";

type Health = {
  status: string;
  time: string;
  region: string;
  commit: string;
  aiKeyConfigured: boolean;
  aiModel: string;
};

async function fetchHealth(): Promise<Health> {
  const res = await fetch("/api/health", { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const message = (e: unknown) => (e instanceof Error ? e.message : "Request failed");

// Fetches /api/health in the browser so the page shows live data on every visit.
export default function HealthStatus() {
  const [data, setData] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true; // ignore the result if the page was left before it arrived
    fetchHealth()
      .then((d) => active && setData(d))
      .catch((e) => active && setError(message(e)));
    return () => {
      active = false;
    };
  }, []);

  function load() {
    setError(null);
    setData(null);
    fetchHealth().then(setData).catch((e) => setError(message(e)));
  }

  if (error) {
    return (
      <p role="alert" className="text-danger">
        Health check failed: {error}{" "}
        <button onClick={load} className="underline">Retry</button>
      </p>
    );
  }
  if (!data) return <p className="text-muted">Checking…</p>;

  const rows: [string, string][] = [
    ["Status", data.status],
    ["Server time", new Date(data.time).toLocaleString()],
    ["Region", data.region],
    ["Commit", data.commit],
    ["AI key configured", data.aiKeyConfigured ? "Yes" : "Not yet (added in FE-06)"],
    ["AI model", data.aiModel],
  ];

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-[var(--radius-card)] border border-border bg-surface p-4 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-muted">{k}</dt>
          <dd className={k === "Status" ? "font-medium text-success" : ""}>{v}</dd>
        </div>
      ))}
      <div className="col-span-2 pt-2">
        <button onClick={load} className="rounded-lg border border-border px-3 py-1.5 text-xs">Refresh</button>
      </div>
    </dl>
  );
}
