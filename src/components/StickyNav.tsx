import type { ReactNode } from "react";

// The nav is fixed to the top of the screen, so it follows you as you scroll. A spacer of the
// same height keeps the hero exactly where it was. It has no background of its own: nothing fades or blurs over the page behind it.
export default function StickyNav({ children, spacer = true }: { children: ReactNode; spacer?: boolean }) {
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
        className={`gutter fixed inset-x-0 top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-center gap-x-[calc(8*var(--u))] text-nav transition-opacity duration-200 motion-reduce:transition-none ${padding}`}
      >
        {children}
      </nav>
    </>
  );
}
