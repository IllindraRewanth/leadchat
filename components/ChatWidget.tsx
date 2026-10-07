"use client";

import { useState } from "react";
import Chat from "@/components/Chat";

// Floating launcher for the chat. The chat itself is the same component as /chat.
export default function ChatWidget({ demo = false }: { demo?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div role="dialog" aria-label="Chat with us" className="w-[min(24rem,calc(100vw-2rem))] shadow-xl">
          <Chat compact demo={demo} />
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
