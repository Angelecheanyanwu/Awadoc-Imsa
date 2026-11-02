import GetTheApp from "@/components/GetTheApp";
import Partnership from "@/components/Partnership";

// The footer uses the page's own colors, so it follows the sun/moon switch.
export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden bg-bg text-ink">
      {/* The hairline, then AwaDoc in partnership with IMSA (the AwaDoc logo here is the footer's logo), then the app buttons. */}
      <div className="gutter">
        <div className="border-t border-ink/10" />
      </div>

      {/* One line: AwaDoc in partnership with IMSA at the left edge, the app buttons at the right edge. When the screen is
          too narrow for both they stack, centred. */}
      {/* The same side margins as the rest of the page. From 798px up it is one line: the partnership on the left, the app
          buttons on the right. Below that they stack, both centred, with the same gap above, between and below. */}
      <div className="gutter flex flex-col items-center gap-y-[calc(var(--spacing-section)*0.7)] py-[calc(var(--spacing-section)*0.7)] min-[798px]:flex-row min-[798px]:justify-between min-[798px]:gap-x-[calc(28*var(--u))] min-[798px]:pb-[calc(var(--spacing-section)/6)] min-[798px]:pt-[calc(var(--spacing-section)/2)]">
        <Partnership compact />
        <GetTheApp />
      </div>

      {/* Wordmark stretched edge to edge (no side gap), with the bottom quarter cut off.
          SVG textLength makes the text exactly as wide as the screen at any size.
          The viewBox is 1000 wide; caps are ~182 tall and start at y=10, so a height of
          147 shows the top three quarters. Decorative only. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 147"
        className="pointer-events-none block w-full select-none text-ink/7"
      >
        <text
          x="0"
          y="192"
          textLength="1000"
          lengthAdjust="spacing"
          fontSize="260"
          fontWeight="500"
          fill="currentColor"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          AwaDoc
        </text>
      </svg>
    </footer>
  );
}
