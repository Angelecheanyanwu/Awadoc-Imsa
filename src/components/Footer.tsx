import GetTheApp from "@/components/GetTheApp";
import Logo from "@/components/Logo";

// The footer uses the page's own colors, so it follows the sun/moon switch.
export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden bg-bg text-ink">
      <div className="gutter">
        {/* Hairline, then the logo on the left and the legal text on the right. */}
        <div className="grid items-center gap-[calc(24*var(--u))] border-t border-ink/10 py-section md:grid-cols-[1fr_4fr] md:gap-x-[calc(32*var(--u))]">
          <div>
            <Logo className="h-8 w-auto" />
          </div>
          <p className="text-hero-sub leading-[1.75] text-muted">
          AwaDoc is a digital health platform and does not provide medical advice, diagnosis, or treatment. All care is delivered by licensed professionals and authorised partners. Always consult a qualified healthcare provider about medical concerns. Nigerian services are provided by AwaDoc Health Technologies Ltd, 14b Imam Dauda Street, Surulere, Lagos.
            <span className="mt-2 block">© 2026 Awadoc Inc. All rights reserved.</span>
          </p>

          {/* Own grid row, in the right-hand column, so the logo above stays centered on the text. */}
          <div className="md:col-start-2">
            <GetTheApp />
          </div>
        </div>
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
