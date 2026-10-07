import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";
import { hasAiKey } from "@/lib/env";

const steps = [
  { title: "Visitor opens the chat", body: "A small widget on any website starts the conversation." },
  { title: "AI asks the right questions", body: "Budget, timeline, and what they need, in a natural chat." },
  { title: "You get a scored lead", body: "Each chat becomes a lead with a score and a summary." },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-4 py-14 sm:py-20">
        <p className="text-sm font-medium text-brand">AI lead qualification</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
          A chat assistant that finds your best customers for you
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          LeadChat is a chat widget that talks to visitors, asks the questions your sales team would ask, and hands you only the leads worth a call.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/chat" className="rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground">
            Try the chat
          </Link>
          <Link href="/leads" className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium">
            View leads
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-4 px-4 pb-16 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
            <p className="text-xs text-muted">Step {i + 1}</p>
            <h2 className="mt-1 font-medium">{s.title}</h2>
            <p className="mt-1 text-sm text-muted">{s.body}</p>
          </div>
        ))}
      </section>

      <ChatWidget demo={!hasAiKey} />
    </>
  );
}
