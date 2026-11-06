"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const REASONS = [
  {
    title: "Accredited partner",
    text: "IMSA is accredited by the West African College of Surgeons and works with the University of Abuja.",
  },
  {
    title: "Proven in Nigeria",
    text: "Embryo testing for sickle cell has already led to healthy births in Nigeria, published in the African Journal of Reproductive Health.",
  },
  {
    title: "Led by an IVF pioneer",
    text: "Dr Ibrahim Wada OON, FRCOG, has practised reproductive medicine for over 35 years and championed embryo testing for sickle cell in Nigeria.",
  },
  {
    title: "Doctors who explain first",
    text: "Counselling with an AwaDoc doctor before you commit, so every decision is informed.",
  },
];

// "Why trust us" in the footer: a link style button that opens the reasons in a modal. It eases in, and closes with the cross, Esc or a tap
// outside; the page behind stops scrolling while it is open.
export default function FooterWhyTrust({ className }: { className: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className={`${className} cursor-pointer text-left`}>
        Why trust us
      </button>

      {(open || present) &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-[max(0.75rem,env(safe-area-inset-top))_max(0.75rem,env(safe-area-inset-right))_max(0.75rem,env(safe-area-inset-bottom))_max(0.75rem,env(safe-area-inset-left))] backdrop-blur-[3px] transition-opacity duration-500 ease-out motion-reduce:transition-none ${shown ? "opacity-100" : "opacity-0"}`}
            onPointerDown={(e) => e.target === e.currentTarget && close()}
          >
            <div
              ref={dialogRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby="trust-title"
              className={`[scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative max-h-[min(88dvh,60rem)] w-full max-w-[40rem] origin-center overflow-y-auto rounded-[28px] border border-white/40 bg-linear-to-br from-bg/95 via-bg/92 to-bg/88 p-6 text-ink shadow-[0_24px_80px_-16px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.5)] outline-none backdrop-blur-md transition-[transform,opacity] duration-[650ms] ease-[cubic-bezier(0.16,0.8,0.24,1)] motion-reduce:transition-none sm:p-9 ${shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-5 scale-[0.95] opacity-0"}`}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 grid size-10 cursor-pointer place-items-center rounded-full border border-ink/20 bg-bg/70 transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-4">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>

              <h2 id="trust-title" className="book-rise pr-12 font-heading text-h2 font-medium leading-[1.08] [-webkit-text-stroke:0.015em_currentColor]" style={{ animationDelay: "180ms" }}>
                Why trust us
              </h2>

              <div className="mt-[1.4em] grid gap-3">
                {REASONS.map((r, i) => (
                  <section key={r.title} className="book-rise rounded-[20px] bg-ink/5 p-4" style={{ animationDelay: `${280 + i * 100}ms` }}>
                    <h3 className="text-hero-sub font-semibold leading-snug">{r.title}</h3>
                    <p className="mt-[0.5em] text-[calc(var(--text-hero-sub)*0.92)] font-medium leading-relaxed tracking-[-0.03em] text-muted">{r.text}</p>
                  </section>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
