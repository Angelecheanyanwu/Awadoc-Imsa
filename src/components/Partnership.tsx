import Image from "next/image";
import Logo from "@/components/Logo";

// One straight, centered line: AwaDoc in partnership with IMSA.
// The logos shrink with the screen width (vw) so the line stays on one row down to 600px;
// below that it wraps onto two centered lines.
// `compact` is the smaller version that sits beside the app buttons in the footer.
export default function Partnership({ compact = false }: { compact?: boolean }) {
  // Compact (in the footer): never wraps. On very narrow screens the logos shrink with the screen so the whole line fits.
  const awadoc = compact ? "h-[min(max(1.5rem,min(calc(32*var(--u)),3vw)),calc((100vw-10rem)/9.05))]" : "h-[min(calc(64*var(--u)),5.4vw)]";
  const imsa = compact ? "h-[min(max(2rem,min(calc(42*var(--u)),3.8vw)),calc((100vw-10rem)/6.8))]" : "h-[min(calc(88*var(--u)),7.4vw)]";
  return (
    <section
      aria-label="Partnership"
      className={`relative z-10 flex items-center gap-x-[min(calc(20*var(--u)),2vw)] gap-y-[calc(14*var(--u))] ${
        compact
          ? "flex-nowrap justify-center min-[798px]:justify-start"
          : "gutter flex-nowrap justify-center py-[calc(var(--spacing-section)/2)] max-[599px]:flex-wrap"
      }`}
    >
      <Logo className={`${awadoc} w-auto shrink-0 ${compact ? "ml-[calc(-0.085*max(1.5rem,min(calc(32*var(--u)),3vw)))]" : ""}`} />
      <span className="shrink-0 whitespace-nowrap text-hero-sub font-medium text-muted">
        in partnership with
      </span>
      <Image
        src="/imsa-logo.png"
        alt="Institute of Medical Sciences Africa (IMSA)"
        width={346}
        height={88}
        className={`partner-logo-light ${imsa} w-auto shrink-0`}
      />
      <Image
        src="/imsa-logo-dark.png"
        alt="Institute of Medical Sciences Africa (IMSA)"
        width={346}
        height={88}
        className={`partner-logo-dark ${imsa} w-auto shrink-0`}
      />
    </section>
  );
}
