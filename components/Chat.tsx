"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";

// One transport for the whole app; it just points useChat at our route handler.
const transport = new DefaultChatTransport({ api: "/api/chat" });

/** How close to the bottom (px) still counts as "at the bottom". */
const PIN_THRESHOLD = 48;

function textOf(message: UIMessage) {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export default function Chat({ demo = false, compact = false }: { demo?: boolean; compact?: boolean }) {
  // A fixed id keeps the first render deterministic, so Next.js can prerender the page shell.
  const { messages, sendMessage, status, stop, error, regenerate } = useChat({
    id: compact ? "widget" : "page",
    transport,
  });
  const [input, setInput] = useState("");
  const [showJump, setShowJump] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true); // true while the user is at the bottom
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const busy = status === "submitted" || status === "streaming";
  const last = messages.at(-1);
  // Thinking = waiting for the first token. The dots sit in the same bubble the
  // text will fill, so the hand-off doesn't jump or flicker.
  const thinking = busy && (last?.role !== "assistant" || textOf(last) === "");

  // Follow new tokens only while pinned to the bottom.
  useEffect(() => {
    const el = scrollRef.current;
    if (el && pinnedRef.current) el.scrollTop = el.scrollHeight;
  }, [messages, thinking]);

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < PIN_THRESHOLD;
    pinnedRef.current = atBottom;
    setShowJump(!atBottom);
  }

  function jumpToLatest() {
    const el = scrollRef.current;
    if (!el) return;
    pinnedRef.current = true;
    setShowJump(false);
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }

  function send() {
    const text = input.trim();
    if (!text || busy) return;
    pinnedRef.current = true; // sending always brings you back to the latest
    setShowJump(false);
    sendMessage({ text });
    setInput("");
  }

  function handleStop() {
    stop(); // the partial reply stays in `messages`; status returns to "ready"
    inputRef.current?.focus();
  }

  const visible = messages.filter((m) => m.role === "user" || textOf(m) !== "");

  return (
    <div className={`flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface ${compact ? "h-[28rem] max-h-[70dvh]" : "h-[70dvh] min-h-[24rem]"}`}>
      {demo && (
        <p className="border-b border-border bg-background px-4 py-2 text-xs text-muted">
          Demo mode: replies are scripted until an AI key is added.
        </p>
      )}

      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollRef}
          onScroll={onScroll}
          role="log"
          aria-live="polite"
          aria-label="Conversation"
          className="h-full space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
        >
          {messages.length === 0 && (
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-background px-4 py-2.5 text-sm">
              Hi! What are you looking to build?
            </div>
          )}

          {visible.map((m) => (
            <div
              key={m.id}
              className={`msg-in max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "ml-auto rounded-br-sm bg-brand text-brand-foreground"
                  : "rounded-bl-sm bg-background"
              }`}
            >
              <span className="sr-only">{m.role === "user" ? "You: " : "Assistant: "}</span>
              {textOf(m)}
            </div>
          ))}

          {thinking && (
            <div className="msg-in flex w-16 items-center justify-center gap-1 rounded-2xl rounded-bl-sm bg-background px-4 py-3.5" aria-label="Assistant is thinking">
              <span className="dot" />
              <span className="dot [animation-delay:150ms]" />
              <span className="dot [animation-delay:300ms]" />
            </div>
          )}

          {error && (
            <div role="alert" className="rounded-lg border border-danger/40 px-4 py-3 text-sm text-danger">
              Something went wrong getting a reply.{" "}
              <button onClick={() => regenerate()} className="font-medium underline">
                Try again
              </button>
            </div>
          )}
        </div>

        {showJump && (
          <button
            onClick={jumpToLatest}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs shadow-md"
          >
            ↓ Jump to latest
          </button>
        )}
      </div>

      <form
        className="flex items-end gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <label htmlFor={compact ? "chat-input-widget" : "chat-input"} className="sr-only">
          Your message
        </label>
        <textarea
          id={compact ? "chat-input-widget" : "chat-input"}
          ref={inputRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          enterKeyHint="send"
          placeholder="Type your message…"
          maxLength={1000}
          className="max-h-32 min-h-11 min-w-0 flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-base sm:text-sm"
        />
        {busy ? (
          <button
            type="button"
            onClick={handleStop}
            className="h-11 shrink-0 rounded-xl border border-border px-4 text-sm font-medium"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="h-11 shrink-0 rounded-xl bg-brand px-4 text-sm font-medium text-brand-foreground disabled:opacity-50"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
