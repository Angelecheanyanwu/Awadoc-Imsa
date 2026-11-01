"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ComponentType } from "react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { formatPrice } from "@/lib/currency";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { TOTAL_STEPS, totalNgn, useBookingStore, type BookingData } from "@/store/useBookingStore";
import {
  formatDate,
  formatTime,
  StepBook,
  StepDone,
  StepGenotypes,
  StepLabs,
  StepLocation,
  StepPay,
  StepRegister,
} from "@/components/booking/steps";

const STEPS: { title: string; sub: string; Body: ComponentType; wide?: boolean }[] = [
  { title: "Register as a couple", sub: "", Body: StepRegister },
  { title: "Select your genotypes", sub: "", Body: StepGenotypes },
  { title: "Where do you live?", sub: "", Body: StepLocation },
  { title: "Choose counselling, procedures and a time", sub: "Book counselling, procedures, or both in one go. Pick a time for your first appointment at the end.", Body: StepBook, wide: true },
  { title: "Lab results and test preparation", sub: "Share your genotype reports so a doctor can check them before anything starts.", Body: StepLabs },
  { title: "Review and pay", sub: "Your booking is held. Check the details, then pay to confirm it.", Body: StepPay },
];

const DONE = { title: "Booking confirmed", sub: "You're all set. We'll see you both soon.", Body: StepDone, wide: false };

const filled = (...v: string[]) => v.every((x) => x.trim().length > 0);

function canContinue(step: number, d: BookingData) {
  switch (step) {
    case 1:
      return filled(d.first1, d.last1, d.first2, d.last2, d.relationship) && /^\S+@\S+\.\S+$/.test(d.email.trim()) && d.phone.replace(/\D/g, "").length >= 7;
    case 2:
      return !!d.geno1 && !!d.geno2 && filled(d.lab, d.age, d.ivf);
    case 3:
      return filled(d.country, d.state, d.street, d.city);
    case 4:
      return !!d.counselling && !!d.date && d.hour !== null && d.consentCare && d.consentShare;
    default:
      return true;
  }
}

// The booking flow as a full page (/book): the title, "% completed" and step count on top with a segmented
// progress bar, the step in the middle (the date and time step is a calendar beside the day's time slots),
// and a bar pinned to the bottom with what you have chosen so far, Back, and Continue. Plain pixel sizes
// like the EHR's Enroll patient form (.booking-scope).
export default function BookingFlow() {
  const router = useRouter();
  const { step, dir, data, next, back, goTo, reset } = useBookingStore();
  const currency = useCurrencyStore((s) => s.currency);
  // After Pay, the button shows a short "confirming" state before the confirmation screen.
  const [paying, setPaying] = useState(false);
  const payTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(payTimer.current), []);

  // Each new step starts at the top of the page.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step]);

  const done = step > TOTAL_STEPS;
  const cfg = done ? DONE : STEPS[step - 1];
  const { Body } = cfg;
  const wide = !!cfg.wide;
  const ok = canContinue(step, data);
  const total = totalNgn(data);
  const { symbol, digits } = formatPrice(total, currency);
  const money = `${symbol}${digits}`;
  const percent = done ? 100 : Math.round(((step - 1) / TOTAL_STEPS) * 100);

  const label = done ? "Done" : paying ? "Confirming..." : step === TOTAL_STEPS ? `Pay ${money}` : "Continue";

  // What the pill at the bottom left shows: the chosen time once there is one, otherwise the running total.
  const chosenTime = data.date && data.hour !== null ? `${formatTime(data)} · ${formatDate(data.date)}` : "";
  const summary = done ? "" : step >= 4 && chosenTime ? chosenTime : total > 0 ? `Total ${money}` : "";

  const onPrimary = () => {
    if (done) {
      reset();
      router.push("/");
      return;
    }
    if (step === TOTAL_STEPS) {
      // No payment provider is connected yet, so this only simulates the wait.
      setPaying(true);
      payTimer.current = window.setTimeout(() => {
        setPaying(false);
        next();
      }, 1100);
      return;
    }
    next();
  };

  return (
    <div
      className="booking-scope flex min-h-dvh flex-col font-sans text-ink"
      style={{ background: "radial-gradient(120% 70% at 15% 0%, color-mix(in srgb, #22bb9b 20%, var(--bg)), var(--bg) 65%)" }}
    >
      {/* Top bar: logo (back to the home page) and the sun / moon switch. */}
      <header className="gutter flex items-center justify-between py-5">
        <Link href="/" aria-label="AwaDoc home" className="flex items-center">
          <Logo className="h-8 w-auto max-sm:h-6" />
        </Link>
        <ThemeToggle />
      </header>

      <div className="gutter mx-auto w-full max-w-[1080px]">
        {/* Title, how far along, and the step count. */}
        <div className="flex items-end justify-between gap-4">
          <h1 className="min-w-0 font-heading text-h2 font-medium leading-tight">{cfg.title}</h1>
          {!done && (
            <div className="flex shrink-0 items-baseline gap-4 pb-1">
              <span className="hidden text-micro font-semibold uppercase tracking-[0.14em] text-accent sm:inline">{percent}% completed</span>
              <span className="text-hero-sub text-muted">
                {step}/{TOTAL_STEPS}
              </span>
            </div>
          )}
        </div>

        {/* Segmented progress: done steps are solid and can be tapped to go back; the current one is half filled. */}
        {!done && (
          <ol className="mt-4 flex gap-2" aria-label={`Step ${step} of ${TOTAL_STEPS}: ${cfg.title}`}>
            {STEPS.map((s, i) => {
              const n = i + 1;
              const state = n < step ? "done" : n === step ? "now" : "todo";
              return (
                <li key={s.title} className="flex-1">
                  <button
                    type="button"
                    disabled={state !== "done" || paying}
                    onClick={() => goTo(n)}
                    aria-label={state === "done" ? `Go back to ${s.title}` : s.title}
                    aria-current={state === "now" ? "step" : undefined}
                    className="block h-4 w-full cursor-pointer disabled:cursor-default"
                  >
                    <span className="block h-1 w-full overflow-hidden rounded-full bg-ink/12">
                      <span
                        className="block h-full rounded-full bg-[#21ba9b] transition-[width] duration-300"
                        style={{ width: state === "done" ? "100%" : state === "now" ? "50%" : "0%" }}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      <main className="gutter mx-auto flex w-full max-w-[1080px] flex-1 flex-col pb-8 pt-4">
        {/* `@container` lets fields go two-up based on the space they have, not the screen's width. */}
        <div className="@container flex w-full flex-1 flex-col">
          <div
            key={step}
            className={`book-page flex flex-1 flex-col gap-3.5 ${dir === "back" ? "back" : ""}`}
          >
            {cfg.sub && <p className="max-w-[44em] text-hero-sub leading-relaxed text-muted">{cfg.sub}</p>}
            {/* The step's own rows spread out to use any spare height above the pinned bar. */}
            <div className="flex flex-1 flex-col [&>*]:flex-1 [&>*]:content-between">
              <Body />
            </div>
          </div>
        </div>
      </main>

      {/* Pinned to the bottom: what you have chosen so far on the left, Back and Continue on the right. */}
      <div className="sticky bottom-0 z-10 bg-bg/80 backdrop-blur-md">
        <div className="gutter mx-auto flex w-full max-w-[1080px] items-center justify-end gap-3 py-3">
          {/* The floating Ask Noura pill sits at the left of this bar, so the summary is kept to the right of it
              and is left out on narrow screens. */}
          {summary && (
            <span className="mr-auto hidden h-11 min-w-0 items-center truncate rounded-full border border-ink/15 bg-ink/6 px-4 text-hero-sub font-semibold md:ml-[max(0px,calc(12.5rem-max(0px,(100vw-1080px)/2)))] md:inline-flex">
              {summary}
            </span>
          )}
          <div className="flex shrink-0 items-center gap-2">
            {!done && step > 1 && (
              <button
                type="button"
                onClick={back}
                disabled={paying}
                className="h-11 cursor-pointer rounded-full px-5 text-btn font-semibold text-muted transition-colors hover:text-ink disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                Back
              </button>
            )}
            <button
              type="button"
              disabled={!ok || paying}
              onClick={onPrimary}
              className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-6 text-btn font-semibold text-bg transition-all duration-200 hover:bg-brand hover:text-[#07110c] disabled:cursor-not-allowed disabled:bg-ink/10 disabled:text-muted/60 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              {paying && (
                <span aria-hidden="true" className="size-[1.1em] animate-spin rounded-full border-2 border-current/30 border-t-current motion-reduce:animate-none" />
              )}
              <span className="truncate">{label}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
