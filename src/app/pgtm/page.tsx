import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContentsCard from "@/components/ContentsCard";
import Footer from "@/components/Footer";
import HomeButton from "@/components/HomeButton";
import Logo from "@/components/Logo";
import StickyNav from "@/components/StickyNav";
import ThemeToggle from "@/components/ThemeToggle";
import { REVIEW, type Seg } from "./content";

export const metadata: Metadata = {
  title: "PGT-M and sickle cell disease | AwaDoc",
  description:
    "A review of preimplantation genetic testing (PGT-M) in the prevention of sickle cell disease: epidemiology, evidence and outcomes.",
};

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/ /g, "");
// The text under the page title (centred) and the body text; the body text is justified on a phone.
const bodyPlain = "text-hero-sub font-medium leading-relaxed tracking-[-0.035em] text-muted";
const body = `${bodyPlain} max-sm:text-justify`;

// Text with its superscript reference numbers (the small raised 1, 2,5 and so on).
function Segs({ s }: { s: Seg[] }) {
  return (
    <>
      {s.map(([t, sup], i) =>
        sup ? (
          <sup key={i} className="ml-[0.15em] text-[0.7em] font-semibold text-accent">
            {t.trim()}
          </sup>
        ) : (
          <span key={i}>{t}</span>
        ),
      )}
    </>
  );
}

// Text in which any web address (with or without "https://") is a link that opens in a new tab.
function Linked({ t }: { t: string }) {
  const parts = t.split(/((?:https?:\/\/|www\.)\S*[^\s.,;)])/g);
  return (
    <>
      {parts.map((p, i) =>
        /^(?:https?:\/\/|www\.)/.test(p) ? (
          <a
            key={i}
            href={p.startsWith("www.") ? `https://${p}` : p}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-accent underline-offset-2 hover:underline"
          >
            {p}
          </a>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

// A reference, with any web address turned into a link.
function Reference({ t }: { t: string }) {
  return <Linked t={t} />;
}

// "Background: Sickle cell..." : the word before the first colon is the bold label.
function Labelled({ s }: { s: Seg[] }) {
  const first = s[0]?.[0] ?? "";
  const at = first.indexOf(":");
  if (at < 1 || at > 24) return <Segs s={s} />;
  return (
    <>
      <strong className="font-semibold text-ink">{first.slice(0, at + 1)}</strong>
      <Segs s={[[first.slice(at + 1), 0], ...s.slice(1)]} />
    </>
  );
}

export default function PgtmPage() {
  const sections = REVIEW.doc.filter((b) => b.k === "h1");

  return (
    <div data-page className="book-fade">
      <StickyNav>
        <Link href="/" aria-label="AwaDoc home">
          <Logo className="h-8 w-auto max-sm:h-6" />
        </Link>
        <div />
        <div className="col-start-3 flex items-center gap-[calc(8*var(--u))] justify-self-end">
          <HomeButton />
          <ThemeToggle />
        </div>
      </StickyNav>

      <main className="gutter relative z-10 pb-[calc(var(--spacing-section)*1.5)] pt-[calc(var(--spacing-section)*0.6)]">
                <header className="book-rise mx-auto max-w-[56em] text-center" style={{ animationDelay: "120ms" }}>
          <h1 className="font-heading text-[calc(var(--text-h2)*1.15)] font-medium leading-[1.1] [-webkit-text-stroke:0.04em_currentColor]">
            {REVIEW.title}
          </h1>
        </header>

        <div className="mx-auto mt-[calc(var(--spacing-section)*0.5)] grid min-w-0 max-w-[76em] grid-cols-[minmax(0,1fr)] gap-x-[calc(64*var(--u))] gap-y-[calc(40*var(--u))] lg:grid-cols-[minmax(0,1fr)_19em]">
          <article className="min-w-0">
            <div className="book-rise" style={{ animationDelay: "120ms" }}>
              <section aria-label="Abstract" className="rounded-[calc(24*var(--u))] border border-ink/15 bg-ink/5 p-[calc(24*var(--u))] md:p-[calc(36*var(--u))]">
                <h2 className="font-heading text-h3 font-medium uppercase tracking-[0.12em]">Abstract</h2>
                {REVIEW.abstract.map((s, i) => (
                  <p key={i} className={`mt-[1em] ${body}`}>
                    <Labelled s={s} />
                  </p>
                ))}
              </section>
            </div>

            <div className="book-rise" style={{ animationDelay: "300ms" }}>
              {REVIEW.doc.map((b, i) => {
                switch (b.k) {
                  case "h1":
                    return (
                      <h2
                        key={i}
                        id={slug(b.t)}
                        className="mt-[calc(var(--spacing-section)*0.9)] scroll-mt-28 font-heading text-h2 font-medium capitalize leading-[1.06] [-webkit-text-stroke:0.03em_currentColor]"
                      >
                        {b.t}
                      </h2>
                    );
                  case "h2":
                    return (
                      <h3 key={i} className="mt-[1.8em] text-h3 font-semibold capitalize">
                        {b.t}
                      </h3>
                    );
                  case "p":
                    return (
                      <p key={i} className={`mt-[1em] ${body}`}>
                        <Segs s={b.s} />
                      </p>
                    );
                  case "lead":
                    return (
                      <p key={i} className={`mt-[1em] ${body}`}>
                        <strong className="font-semibold capitalize text-ink">{b.lead}:</strong> <Segs s={b.s} />
                      </p>
                    );
                  case "li":
                    return (
                      <ul key={i} className={`${body} list-disc pl-[1.4em] marker:text-accent`}>
                        <li className="mt-[0.8em]">
                          <strong className="font-semibold capitalize text-ink">{b.lead}:</strong> <Segs s={b.s} />
                        </li>
                      </ul>
                    );
                  case "table":
                    return (
                      <figure key={i} className="mt-[2em]">
                        <figcaption className="mb-[0.8em] text-hero-sub font-semibold">{b.cap}</figcaption>
                        <div className="overflow-x-auto rounded-[calc(20*var(--u))] border border-ink/15">
                          <table className="w-full min-w-[30em] border-collapse text-left text-[calc(var(--text-hero-sub)*0.92)] tracking-[-0.02em]">
                            <thead>
                              <tr className="bg-ink/5">
                                {b.rows[0].map((c, j) => (
                                  <th key={j} className="px-[1em] py-[0.8em] font-semibold text-ink">
                                    {c}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {b.rows.slice(1).map((r, j) => (
                                <tr key={j} className="border-t border-ink/10 align-top">
                                  {r.map((c, k) => (
                                    <td key={k} className={`px-[1em] py-[0.7em] ${k === 0 ? "font-semibold text-ink" : "font-medium text-muted"}`}>
                                      {c}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </figure>
                    );
                  case "note":
                    return (
                      <p key={i} className="mt-[0.8em] text-[calc(var(--text-hero-sub)*0.85)] font-medium text-muted">
                        {b.t}
                      </p>
                    );
                  case "figure":
                    return (
                      <figure key={i} className="mt-[2em]">
                        <div className="overflow-hidden rounded-[calc(20*var(--u))] bg-white p-[calc(12*var(--u))]">
                          <Image src={b.src} alt={b.cap} width={b.w} height={b.h} sizes="(min-width: 1024px) 56em, 100vw" className="h-auto w-full" />
                        </div>
                        <figcaption className="mt-[0.8em] text-[calc(var(--text-hero-sub)*0.92)] font-medium text-muted">{b.cap}</figcaption>
                      </figure>
                    );
                  case "ref":
                    return (
                      <p key={i} className="mt-[0.8em] text-[calc(var(--text-hero-sub)*0.9)] font-medium leading-relaxed text-muted">
                        <Reference t={b.t} />
                      </p>
                    );
                }
              })}
            </div>
          </article>

          <ContentsCard items={sections.map((b) => ({ href: `#${b.k === "h1" ? slug(b.t) : ""}`, label: b.k === "h1" ? b.t : "" }))} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
