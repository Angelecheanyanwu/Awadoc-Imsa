"use client";

import { useEffect, useRef, useState } from "react";
import { useInProgressStore } from "@/store/useInProgressStore";

// A small notice that comes in gracefully and says booking is in progress.
export default function InProgressModal() {
  const { open, hide } = useInProgressStore();
  const dialogRef = useRef<HTMLDivElement>(null);

  // `shown` drives the fade and grow; `present` keeps the modal mounted while it animates out.
  const [shown, setShown] = useState(false);
  const [present, setPresent] = useState(false);
  useEffect(() => {
    if (open) {
      setPresent(true);
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

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide();
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, hide]);

  if (!open && !present) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-[max(1.25rem,env(safe-area-inset-top))_max(1.25rem,env(safe-area-inset-right))_max(1.25rem,env(safe-area-inset-bottom))_max(1.25rem,env(safe-area-inset-left))] backdrop-blur-[3px] transition-opacity duration-400 ease-out motion-reduce:transition-none ${shown ? "opacity-100" : "opacity-0"}`}
      onPointerDown={(e) => e.target === e.currentTarget && hide()}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="in-progress-title"
        className={`w-full max-w-[24rem] origin-center rounded-[28px] border border-white/40 bg-linear-to-br from-bg/90 via-bg/82 to-bg/75 p-6 text-center text-ink shadow-[0_24px_80px_-16px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.5)] outline-none backdrop-blur-[12px] transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${shown ? "scale-100 opacity-100" : "scale-[0.94] opacity-0"}`}
      >
        <h2 id="in-progress-title" className="font-heading text-h2 font-medium leading-tight [-webkit-text-stroke:0.03em_currentColor]">
          Booking is in progress
        </h2>
        <p className="mx-auto mt-3 max-w-[22em] text-hero-sub font-medium leading-relaxed text-muted">
          We&apos;re still getting online booking ready. Please check back soon.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={hide}
            className="min-h-btn cursor-pointer rounded-full border border-ink bg-ink px-[1.4em] py-[0.6em] text-btn font-bold text-bg transition-colors hover:border-brand hover:bg-brand hover:text-[#07110c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
