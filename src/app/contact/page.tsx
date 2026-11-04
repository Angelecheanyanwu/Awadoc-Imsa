import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import ContactAskNoura from "@/components/ContactAskNoura";
import ContactForm from "@/components/ContactForm";
import ContactStartBooking from "@/components/ContactStartBooking";
import Footer from "@/components/Footer";
import HomeButton from "@/components/HomeButton";
import Logo from "@/components/Logo";
import StartBookingButton from "@/components/StartBookingButton";
import StickyNav from "@/components/StickyNav";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Contact us | AwaDoc",
  description: "Questions about PGT-M, partnerships, research or support? Send AwaDoc a message and the right team will reply within 2 working days.",
};

const EMAIL = "genomics@awadoc.com";

const small = "text-[calc(var(--text-hero-sub)*0.92)] font-medium leading-relaxed tracking-[-0.03em] text-muted";
const link = "font-semibold text-ink underline underline-offset-4 transition-colors hover:text-brand";

const ICONS = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3" />
    </>
  ),
  chat: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="3" />
      <path d="M9 18l3 3 3-3M9.5 11h.01M14.5 11h.01" />
    </>
  ),
  book: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
};

// One way to reach us: a round icon, a small title and what to do.
function Way({ icon, title, children }: { icon: keyof typeof ICONS; title: string; children: ReactNode }) {
  return (
    <li className="flex min-w-0 items-start gap-[1em] max-lg:flex-col max-lg:items-center max-lg:gap-[0.6em]">
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink/8 text-ink">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
          {ICONS[icon]}
        </svg>
      </span>
      <div className="min-w-0 break-words pt-[0.1em]">
        <p className="text-hero-sub font-semibold leading-tight">{title}</p>
        <div className={`mt-[0.3em] ${small}`}>{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
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

      {/* The whole page fits one screen on a wide display: the name, then two halves, how to reach us on the left and the form on the right. */}
      <main className="gutter relative z-10 flex flex-col pb-[calc(var(--spacing-section)*0.6)] pt-[calc(var(--spacing-section)*0.2)] lg:min-h-[calc(100svh-6rem)]">
        <h1 className="book-rise text-center font-heading text-display font-medium leading-[1.05] [-webkit-text-stroke:0.06em_currentColor]" style={{ animationDelay: "120ms" }}>
          Contact us
        </h1>
        <div className="mt-[calc(var(--spacing-section)*0.2)] grid flex-1 gap-x-[calc(80*var(--u))] gap-y-[calc(48*var(--u))] lg:grid-cols-2">
          <div className="book-rise max-lg:order-2 max-lg:text-center lg:flex lg:flex-col lg:justify-center" style={{ animationDelay: "200ms" }}>
            <p className={`max-w-[30em] max-lg:mx-auto ${small}`}>
              Questions about PGT-M, partnerships, research or support? Send us a message and the right AwaDoc team will reply within 2 working days.
            </p>

            <ul className="mt-[1.4em] grid grid-cols-2 gap-x-3 gap-y-[1.4em] lg:block lg:space-y-[1.1em]">
              <Way icon="mail" title="Email">
                <a href={`mailto:${EMAIL}`} className={link}>
                  {EMAIL}
                </a>
              </Way>
              <Way icon="globe" title="Website">
                <a href="https://www.awadoc.com" target="_blank" rel="noopener noreferrer" className={link}>
                  www.awadoc.com
                </a>
              </Way>
              <Way icon="chat" title="Quick question?">
                <p>Noura answers questions about genotypes, PGT-M and booking instantly.</p>
                <ContactAskNoura className={`mt-[0.5em] cursor-pointer ${link}`} />
              </Way>
              <Way icon="book" title="Ready to book?">
                <p>Couples can book counselling and procedures directly.</p>
                {/* A plain underlined link on a phone, like Ask Noura; the button on a wide screen. */}
                <ContactStartBooking className={`mt-[0.5em] cursor-pointer lg:hidden ${link}`} />
                <div className="mt-[0.6em] max-lg:hidden">
                  <StartBookingButton />
                </div>
              </Way>
            </ul>
          </div>

          <div className="book-rise flex flex-col max-lg:order-1" style={{ animationDelay: "300ms" }}>
            <h2 className="font-heading text-[calc(var(--text-h2)*0.8)] font-medium leading-[1.12] lg:text-[calc(var(--text-h2)*0.62)] [-webkit-text-stroke:0.03em_currentColor]">Send message</h2>
            <p className={`mt-[0.4em] ${small}`}>Please fill out the form below. Fields marked * are required.</p>
            <div id="message" className="mt-[0.9em] flex-1 scroll-mt-28">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
