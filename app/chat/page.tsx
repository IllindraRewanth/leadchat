import type { Metadata } from "next";
import Chat from "@/components/Chat";
import { hasAiKey } from "@/lib/env";

export const metadata: Metadata = { title: "Chat" };

export default function ChatPage() {
  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Chat</h1>
      <p className="mt-1 mb-5 text-sm text-muted">
        Tell us about your project. The assistant will ask a few quick questions.
      </p>
      <Chat demo={!hasAiKey} />
    </section>
  );
}
