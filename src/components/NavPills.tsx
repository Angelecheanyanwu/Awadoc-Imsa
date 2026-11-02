"use client";

import { useEffect, useRef, useState } from "react";
import { currencies, useCurrencyStore } from "@/store/useCurrencyStore";

// Plain text links: no icon, no border, no background.
const pill =
  "flex h-11 cursor-pointer items-center gap-[0.4em] px-[0.75em] text-nav font-semibold transition-colors duration-200 hover:text-brand focus-visible:text-brand focus-visible:outline-none";

function CurrencyMenu() {
  const { currency, setCurrency } = useCurrencyStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = currencies.find((c) => c.code === currency) ?? currencies[0];

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

  return (
    // Below lg this wrapper is not positioned, so the menu anchors to the nav instead and
    // opens at the right edge of the screen (smaller). From lg up it opens to the right of the button.
    // The extra left margin makes the space from FAQ to this button's outline the same as the space from About to FAQ
    // (each link has 0.75em of padding on both sides, but this button's outline is at its very edge).
    <div ref={ref} className="ml-[calc(0.75*var(--text-nav))] lg:relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${current.name}`}
        onClick={() => setOpen((o) => !o)}
        className={`${pill} rounded-full border border-ink/25 hover:border-brand`}
      >
        <span className="font-semibold">{current.symbol}</span>
        <span>{current.code}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Choose currency"
          className="absolute right-[max(1.25rem,env(safe-area-inset-right))] top-[calc(100%-1rem)] z-30 w-[calc(250*var(--u))] max-w-[calc(100vw-2.5rem)] lg:left-0 lg:right-auto lg:top-[calc(100%+8px)] lg:w-[calc(300*var(--u))] divide-y divide-ink/10 overflow-hidden rounded-[calc(18*var(--u))] border border-white/40 bg-linear-to-br from-bg/90 via-bg/82 to-bg/75 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-[12px]"
        >
          {currencies.map((c) => (
            <li key={c.code} role="option" aria-selected={c.code === currency}>
              {/* Fixed columns (symbol, code, name) so every row lines up and the name never wraps. */}
              <button
                type="button"
                onClick={() => {
                  setCurrency(c.code);
                  setOpen(false);
                }}
                className={`grid w-full cursor-pointer grid-cols-[1.4em_3.2em_1fr] items-center gap-x-[calc(8*var(--u))] min-h-11 px-[1em] py-[0.7em] text-left text-label transition-colors hover:bg-ink/5 ${c.code === currency ? "font-bold text-brand" : "font-medium"}`}
              >
                <span className="text-center">{c.symbol}</span>
                <span>{c.code}</span>
                <span className={`whitespace-nowrap text-right ${c.code === currency ? "text-brand" : "text-muted"}`}>
                  {c.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const ABOUT_ITEMS = ["About AwaDoc", "About partnership"];

// "About" opens a short list underneath it. The two choices do not go anywhere yet.
function AboutMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={ref} className="relative">
      <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={pill}>
        About
      </button>

      {open && (
        <ul
          role="menu"
          aria-label="About"
          className="book-pop absolute left-0 top-[calc(100%+8px)] z-30 w-[calc(230*var(--u))] divide-y divide-ink/10 overflow-hidden rounded-[calc(18*var(--u))] border border-white/40 bg-linear-to-br from-bg/90 via-bg/82 to-bg/75 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-[12px]"
        >
          {ABOUT_ITEMS.map((item) => (
            <li key={item} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex min-h-11 w-full cursor-pointer items-center px-[1em] py-[0.7em] text-left text-label font-medium transition-colors hover:bg-ink/5 hover:text-brand"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function NavPills() {
  return (
    <div className="flex items-center gap-[calc(8*var(--u))]">
      <AboutMenu />

      <a href="#faq" className={pill}>
        FAQ
      </a>

      <CurrencyMenu />
    </div>
  );
}
