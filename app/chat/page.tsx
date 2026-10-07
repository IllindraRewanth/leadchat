import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = { title: "Chat" };

export default function ChatPage() {
  return (
    <PagePlaceholder
      title="Chat"
      description="Full-page version of the visitor chat. Messages will stream in from the AI as it qualifies the visitor."
      comingIn="FE-06 (Streaming AI chat interface)"
    >
      <div className="flex h-80 flex-col justify-end rounded-[var(--radius-card)] border border-dashed border-border bg-surface p-4">
        <div className="max-w-[80%] rounded-2xl bg-background px-4 py-2 text-sm">Hi! What are you looking to build?</div>
        <div className="mt-2 ml-auto max-w-[80%] rounded-2xl bg-brand px-4 py-2 text-sm text-brand-foreground">
          (Visitor replies will appear here)
        </div>
      </div>
    </PagePlaceholder>
  );
}
