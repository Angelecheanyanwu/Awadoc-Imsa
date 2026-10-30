import Image from "next/image";
import Logo from "@/components/Logo";

// One straight, centered line: AwaDoc in partnership with IMSA.
// The logos shrink with the screen width (vw) so the line stays on one row down to 600px;
// below that it wraps onto two centered lines.
export default function Partnership() {
  return (
    <section
      aria-label="Partnership"
      className="gutter relative z-10 flex flex-nowrap items-center justify-center gap-x-[min(calc(30*var(--u)),3vw)] gap-y-[calc(14*var(--u))] py-[calc(var(--spacing-section)/2)] max-[599px]:flex-wrap"
    >
      <Logo className="h-[min(calc(64*var(--u)),5.4vw)] w-auto shrink-0" />
      <span className="shrink-0 whitespace-nowrap text-hero-sub font-medium text-muted">
        in partnership with
      </span>
      <Image
        src="/imsa-logo.png"
        alt="Institute of Medical Sciences Africa (IMSA)"
        width={346}
        height={88}
        className="partner-logo-light h-[min(calc(88*var(--u)),7.4vw)] w-auto shrink-0"
      />
      <Image
        src="/imsa-logo-dark.png"
        alt="Institute of Medical Sciences Africa (IMSA)"
        width={346}
        height={88}
        className="partner-logo-dark h-[min(calc(88*var(--u)),7.4vw)] w-auto shrink-0"
      />
    </section>
  );
}
