"use client";

import { useEffect, useId, useRef, useState } from "react";
import { currencies, useCurrencyStore } from "@/store/useCurrencyStore";

// Below 500px the nav links fold into this menu: a hamburger button that opens a panel under the
// nav with Bookings, FAQ and the currency choice. From 500px up the full links show instead.
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { currency, setCurrency } = useCurrencyStore();
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const row =
    "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 px-card py-[0.6em] text-left text-body font-medium transition-colors hover:bg-ink/5 focus-visible:bg-ink/5 focus-visible:outline-none";

  return (
    <div ref={ref} className="min-[500px]:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5">
          {/* Three lines that turn into an X. */}
          <path d="M4 7h16" className={`origin-center transition-transform duration-200 motion-reduce:transition-none ${open ? "translate-y-[5px] rotate-45" : ""}`} />
          <path d="M4 12h16" className={`transition-opacity duration-150 motion-reduce:transition-none ${open ? "opacity-0" : ""}`} />
          <path d="M4 17h16" className={`origin-center transition-transform duration-200 motion-reduce:transition-none ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </svg>
      </button>

      {/* Full-width panel just under the nav; the grid-rows trick animates its height. */}
      <div
        id={panelId}
        className={`absolute inset-x-0 top-full grid border-ink/10 bg-bg/95 backdrop-blur-md transition-[grid-template-rows,border-width] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] border-b" : "grid-rows-[0fr] border-b-0"
        }`}
        {...(open ? {} : { inert: true })}
      >
        <div className="overflow-hidden">
          <nav aria-label="Menu" className="flex flex-col py-2">
            <a href="#" onClick={() => setOpen(false)} className={row}>
              Bookings
            </a>
            <a href="#faq" onClick={() => setOpen(false)} className={row}>
              FAQ
            </a>

            <p className="px-card pb-1 pt-4 text-label font-bold uppercase tracking-[0.14em] text-muted">Currency</p>
            {currencies.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCurrency(c.code);
                  setOpen(false);
                }}
                aria-pressed={c.code === currency}
                className={`${row} ${c.code === currency ? "text-brand" : ""}`}
              >
                <span>
                  <span className="inline-block w-[1.4em]">{c.symbol}</span>
                  {c.code}
                </span>
                <span className={`text-label font-normal ${c.code === currency ? "text-brand" : "text-muted"}`}>{c.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
