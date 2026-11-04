// The table of contents beside a long page: a rounded card on the right that follows you down the page, with the sections numbered
// 01, 02 and so on. Hidden on a phone and tablet, where the page is read straight through.
export default function ContentsCard({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav
      aria-label="Table of contents"
      style={{ animationDelay: "200ms" }}
      className="book-rise hidden self-start rounded-[24px] border border-ink/10 bg-ink/[0.04] p-[1.4em] lg:sticky lg:top-28 lg:block"
    >
      <p className="border-b border-ink/10 pb-[1em] text-label font-semibold uppercase tracking-[0.18em] text-accent">Table of contents</p>
      <ol className="mt-[0.8em] max-h-[calc(100dvh-14rem)] space-y-[0.2em] overflow-y-auto pr-[0.4em] text-hero-sub font-medium leading-snug tracking-[-0.035em] [scrollbar-width:thin]">
        {items.map((item, i) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex gap-[0.9em] rounded-[10px] py-[0.5em] text-muted transition-colors hover:text-brand focus-visible:text-brand focus-visible:outline-none"
            >
              <span className="w-[1.6em] shrink-0 text-[0.8em] font-semibold leading-[1.9] text-ink/45">{String(i + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
