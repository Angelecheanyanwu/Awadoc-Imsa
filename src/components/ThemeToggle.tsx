"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

// Sun = white version, moon = green (dark) version.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("theme");
    } catch {}
    const initial: Theme =
      saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);

  function select(next: Theme) {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  // The group is exactly as tall as the nav links and the ₦ NGN button (44px); the buttons fill
  // its height and are square. On phones there isn't room for both, so only the button for the
  // theme you're NOT in shows (tap it to switch); from 640px up both show.
  const base =
    "flex aspect-square h-full cursor-pointer items-center justify-center rounded-full transition-colors";
  const on = "bg-ink text-bg";

  return (
    <div role="group" aria-label="Theme" className="flex h-11 items-center gap-1 rounded-full border border-ink p-1 max-sm:h-9 max-sm:p-0.5 [&_svg]:h-[calc(16*var(--u))] [&_svg]:w-[calc(16*var(--u))]">
      <button
        onClick={() => select("light")}
        aria-label="Light theme"
        aria-pressed={theme === "light"}
        className={`${base} ${theme === "light" ? `${on} max-sm:hidden` : ""}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </button>
      <button
        onClick={() => select("dark")}
        aria-label="Dark green theme"
        aria-pressed={theme === "dark"}
        className={`${base} ${theme === "dark" ? `${on} max-sm:hidden` : ""}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      </button>
    </div>
  );
}
