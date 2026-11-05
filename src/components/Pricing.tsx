"use client";

import { formatPrice } from "@/lib/currency";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useFaqStore } from "@/store/useFaqStore";

// Amounts are in naira; they are converted for display when another currency is chosen.
const plans = [
  { ngn: 50_000, description: "Virtual counselling, any country", featured: false },
  { ngn: 7_500_000, description: "Full treatment package", featured: true },
];

const cardBase =
  "flex min-h-[calc(200*var(--u))] max-sm:min-h-[calc(140*var(--u))] flex-col gap-[calc(10*var(--u))] rounded-[calc(24*var(--u))] p-card transition-transform duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export default function Pricing() {
  const currency = useCurrencyStore((s) => s.currency);
  const showQuestion = useFaqStore((s) => s.showQuestion);

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="gutter relative z-10 pt-[calc(var(--spacing-section)*1.5)]"
    >
      <div>
        <h2 className="mb-[calc(64*var(--u))] max-sm:mb-[calc(24*var(--u))] text-center font-heading text-h2 max-sm:text-[min(var(--text-h2),calc((100vw-3.6rem)/16.5))] font-medium leading-[1.06] [-webkit-text-stroke:0.03em_currentColor]">
          Know your costs upfront
        </h2>
        <div className="grid grid-cols-1 gap-[calc(16*var(--u))] sm:grid-cols-2">
          {plans.map(({ ngn, description, featured }) => {
            const { symbol, digits } = formatPrice(ngn, currency);
            return (
            <article
              key={ngn}
              className={
                featured
                  ? `${cardBase} bg-[#0f1a14] text-[#e8f3ec] shadow-[0_16px_36px_-14px_rgba(0,0,0,0.5)] ring-1 ring-white/10`
                  : `${cardBase} border border-ink/10 bg-bg/50 shadow-[0_1px_2px_rgba(0,0,0,0.04)]`
              }
            >
              {/* Price row: the "View breakdown" button sits on this same line, at the right. */}
              <div className="flex flex-nowrap items-center justify-between gap-[calc(12*var(--u))]">
                <p className="whitespace-nowrap font-heading text-price font-medium leading-none [-webkit-text-stroke:0.03em_currentColor]">
                  {/* Nohemi's naira sign is malformed (it renders as a dot), so the symbol uses Poppins. */}
                  <span className="font-sans font-semibold [-webkit-text-stroke:0]">{symbol}</span>
                  {digits}
                </p>
                {featured && (
                  <button
                    type="button"
                    onClick={() => showQuestion("cost")}
                    className="shrink-0 cursor-pointer whitespace-nowrap min-h-11 rounded-[calc(14*var(--u))] bg-[#f5a524] px-[1em] py-[0.5em] text-label font-bold text-[#0f1a14] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#ffb73d] hover:shadow-[0_8px_22px_-8px_#f5a524] active:translate-y-0 active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
                  >
                    Breakdown
                  </button>
                )}
              </div>
              <p
                className={`mt-auto text-hero-sub font-medium leading-snug tracking-[-0.035em] ${featured ? "text-[#e8f3ec]/70" : "text-muted"}`}
              >
                {description}
              </p>
            </article>
            );
          })}
        </div>

        {currency !== "NGN" && (
          <p className="mt-[calc(14*var(--u))] text-center text-hero-sub font-medium tracking-[-0.035em] text-muted">
            Prices are set in naira (₦) and shown here converted at approximate rates.
          </p>
        )}
      </div>
    </section>
  );
}
