"use client";

import { useEffect, useState, type ReactNode } from "react";

// The nav is fixed to the top of the screen, so it follows you as you scroll. A spacer of the
// same height keeps the hero exactly where it was. At the top the nav is see-through; once the
// page scrolls it gets a frosted background so the content passing under it stays readable.
export default function StickyNav({ children, spacer = true }: { children: ReactNode; spacer?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const padding = "pb-6 pt-[max(1.5rem,env(safe-area-inset-top))]";

  return (
    <>
      {/* Takes the nav's place in the layout (44px content + the same padding). */}
      {spacer && (
        <div aria-hidden="true" className={padding}>
          <div className="h-11" />
        </div>
      )}

      <nav
        className={`gutter fixed inset-x-0 top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-center gap-x-[calc(8*var(--u))] text-nav transition-[background-color,backdrop-filter] duration-200 motion-reduce:transition-none ${padding} ${
          scrolled ? "bg-bg/80 backdrop-blur-md" : ""
        }`}
      >
        {children}
      </nav>
    </>
  );
}
