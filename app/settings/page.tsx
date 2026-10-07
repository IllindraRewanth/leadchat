import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = { title: "Settings" };

const questions = ["What are you looking to build?", "What's your timeline?", "Do you have a budget in mind?", "What's the best email to reach you?"];

export default function SettingsPage() {
  return (
    <PagePlaceholder
      title="Settings"
      description="Choose the qualification questions the AI asks, and the score needed to count as qualified."
      comingIn="a later assignment"
    >
      <ol className="list-decimal space-y-2 rounded-[var(--radius-card)] border border-border bg-surface p-4 pl-10 text-sm">
        {questions.map((q) => <li key={q}>{q}</li>)}
      </ol>
    </PagePlaceholder>
  );
}
