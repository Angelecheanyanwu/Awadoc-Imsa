"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { QUESTIONS, useNouraStore } from "@/store/useNouraStore";

export default function NouraChat() {
  const { open, typing, messages, closeChat, ask } = useNouraStore();
  const endRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // `shown` drives the fade/slide; `present` keeps the chat mounted while it animates out.
  const [shown, setShown] = useState(false);
  const [present, setPresent] = useState(false);
  useEffect(() => {
    if (open) {
      setPresent(true);
      // Two frames, so the hidden state is painted first and the transition actually runs.
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    setShown(false);
    const t = setTimeout(() => setPresent(false), 380);
    return () => clearTimeout(t);
  }, [open]);


  // Open: lock page scroll, focus the input, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    // Focus the dialog itself (not the input) so the input stays grey until the user clicks it.
    dialogRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeChat();
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeChat]);

  // Keep the newest message in view.
  useEffect(() => {
    if (!open) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    endRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "end" });
  }, [open, messages, typing]);

  if (!open && !present) return null;

  return (
    <div
      className={`fixed inset-0 z-40 flex items-end justify-center bg-black/25 p-[max(0.75rem,env(safe-area-inset-top))_max(1.75rem,env(safe-area-inset-right))_max(0.75rem,env(safe-area-inset-bottom))_max(1.75rem,env(safe-area-inset-left))] backdrop-blur-[3px] transition-opacity duration-400 ease-out motion-reduce:transition-none sm:items-center sm:p-[calc(24*var(--u))] ${shown ? "opacity-100" : "opacity-0"}`}
      onPointerDown={(e) => e.target === e.currentTarget && closeChat()}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="noura-title"
        className={`flex outline-none h-[85dvh] max-h-full w-full max-w-[calc(600*var(--u))] origin-center flex-col overflow-hidden rounded-[calc(28*var(--u))] border border-white/40 bg-linear-to-br from-bg/90 via-bg/82 to-bg/75 text-ink shadow-[0_24px_80px_-16px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-[12px] transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:h-[min(86dvh,calc(720*var(--u)))] sm:rounded-[calc(28*var(--u))] ${shown ? "scale-100 opacity-100" : "scale-[0.94] opacity-0"}`}
      >
        {/* Header */}
        <header className="flex shrink-0 items-center gap-[calc(14*var(--u))] px-card py-[calc(18*var(--u))]">
          <span className="flex h-[calc(48*var(--u))] w-[calc(48*var(--u))] shrink-0 items-center justify-center rounded-full bg-brand/15">
            <Image src="/noura-logo.png" alt="" width={828} height={754} className="h-[56%] w-auto" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="noura-title" className="text-lead font-medium leading-tight">
              Noura
            </h2>
            <p className="truncate text-hero-sub text-muted">AwaDoc&apos;s AI health assistant</p>
          </div>
          <button
            type="button"
            onClick={closeChat}
            aria-label="Close chat"
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-[calc(18*var(--u))] w-[calc(18*var(--u))]">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        {/* Conversation */}
        <div
          role="log"
          aria-live="polite"
          className="flex min-h-0 flex-1 flex-col gap-[calc(12*var(--u))] overflow-y-auto px-card py-[calc(20*var(--u))] [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`noura-msg max-w-[85%] whitespace-pre-wrap rounded-[calc(20*var(--u))] px-[calc(18*var(--u))] py-[calc(12*var(--u))] text-hero-sub leading-relaxed ${
                m.role === "user"
                  ? "self-end rounded-br-[calc(6*var(--u))] bg-brand font-medium text-[#07110c]"
                  : "self-start rounded-bl-[calc(6*var(--u))] border border-ink/10 bg-bg/80 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.15)]"
              }`}
            >
              {m.text}
            </div>
          ))}

          {typing && messages[messages.length - 1]?.role === "user" && (
            <div
              aria-label="Noura is typing"
              className="flex w-fit items-center gap-[calc(5*var(--u))] self-start rounded-[calc(20*var(--u))] rounded-bl-[calc(6*var(--u))] border border-ink/10 bg-bg/80 px-[calc(18*var(--u))] py-[calc(16*var(--u))]"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-[calc(7*var(--u))] w-[calc(7*var(--u))] animate-bounce rounded-full bg-muted motion-reduce:animate-none"
                  style={{ animationDelay: `${i * 140}ms` }}
                />
              ))}
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* The four questions, and the disclaimer. Tapping a question sends it and the answer types itself out. */}
        <footer className="shrink-0 px-card pb-[calc(18*var(--u))] pt-[calc(16*var(--u))]">
          <div className="grid grid-cols-2 gap-[calc(8*var(--u))]">
            {QUESTIONS.map((q, i) => (
              <button
                key={q.question}
                type="button"
                disabled={typing}
                onClick={() => ask(i)}
                className="flex min-h-11 cursor-pointer items-center justify-center rounded-[calc(16*var(--u))] border border-ink/15 bg-bg/70 px-[1em] py-[0.5em] text-center text-hero-sub font-medium leading-snug transition-colors hover:border-brand hover:bg-brand/10 hover:text-brand disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-ink/15 disabled:hover:bg-bg/70 disabled:hover:text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                {q.question}
              </button>
            ))}
          </div>

          <p className="mt-[calc(12*var(--u))] text-center text-micro leading-snug text-muted">
            Noura gives general information, not medical advice. For decisions about your care, book counselling.
          </p>
        </footer>
      </div>
    </div>
  );
}
