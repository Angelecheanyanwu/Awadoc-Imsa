"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import NouraChat from "@/components/NouraChat";
import { useNouraStore } from "@/store/useNouraStore";

// Floating "Ask Noura" pill, pinned to the bottom-right corner. Opens the chat.
export default function AskNoura() {
  const { open, openChat } = useNouraStore();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Give focus back to the pill when the chat closes.
  useEffect(() => {
    if (wasOpen.current && !open) buttonRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Ask Noura"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={openChat}
        className="gutter-right fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-20 flex cursor-pointer items-center min-h-btn gap-[0.6em] rounded-full border border-white/10 bg-[#0f1a14] p-1 pr-[1.1em] text-btn font-semibold text-white shadow-[0_12px_32px_-10px_rgba(0,0,0,0.55)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-[0_14px_36px_-8px_var(--color-brand)] active:translate-y-0 active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
      >
        <span className="flex size-[calc(var(--spacing-btn)-0.5rem)] items-center justify-center rounded-full bg-white">
          <Image src="/noura-logo.png" alt="" width={828} height={754} className="h-[58%] w-auto" />
        </span>
        Ask Noura
      </button>

      <NouraChat />
    </>
  );
}
