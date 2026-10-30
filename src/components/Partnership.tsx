import Image from "next/image";
import Logo from "@/components/Logo";

// One straight, centered line: AwaDoc in partnership with IMSA.
// On phones there isn't room for everything at this size, so it wraps onto two lines there.
export default function Partnership() {
  return (
    <section
      aria-label="Partnership"
      className="gutter relative z-10 flex flex-nowrap items-center justify-center gap-x-[calc(30*var(--u))] gap-y-[calc(14*var(--u))] py-[calc(var(--spacing-section)/2)] max-sm:flex-wrap"
    >
      <Logo className="h-[calc(64*var(--u))] w-auto shrink-0" />
      <span className="shrink-0 whitespace-nowrap text-partner font-medium text-muted">
        in partnership with
      </span>
      <Image
        src="/imsa-logo.png"
        alt="Institute of Medical Sciences Africa (IMSA)"
        width={346}
        height={88}
        className="partner-logo-light h-[calc(88*var(--u))] w-auto shrink-0"
      />
      <Image
        src="/imsa-logo-dark.png"
        alt="Institute of Medical Sciences Africa (IMSA)"
        width={346}
        height={88}
        className="partner-logo-dark h-[calc(88*var(--u))] w-auto shrink-0"
      />
    </section>
  );
}
