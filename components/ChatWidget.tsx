"use client";

import { useState } from "react";

// Client Component: the only part of the home page that needs interactivity.
// Real streaming chat arrives in FE-06; this is the floating shell.
export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with us"
          className="w-[min(22rem,calc(100vw-2rem))] rounded-[var(--radius-card)] border border-border bg-surface shadow-xl"
        >
          <div className="border-b border-border px-4 py-3">
            <p className="font-medium">Hi! What are you looking to build?</p>
            <p className="text-xs text-muted">Usually answers instantly</p>
          </div>
          <div className="px-4 py-6 text-sm text-muted">
            The AI assistant will ask a few questions here to understand your project.
          </div>
          <form className="flex gap-2 border-t border-border p-3" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="widget-input" className="sr-only">Message</label>
            <input
              id="widget-input"
              disabled
              placeholder="Chat coming in FE-06"
              className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <button disabled className="rounded-lg bg-brand px-3 py-2 text-sm text-brand-foreground opacity-60">
              Send
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-lg"
      >
        {open ? "Close" : "Chat with us"}
      </button>
    </div>
  );
}
