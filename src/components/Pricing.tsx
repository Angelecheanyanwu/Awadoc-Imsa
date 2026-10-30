const plans = [
  { price: "50,000", description: "Virtual counselling, any country", featured: false },
  { price: "80,000", description: "In-person counselling", featured: false },
  { price: "7,500,000", description: "Full treatment package", featured: true },
];

const cardBase =
  "flex min-h-[calc(200*var(--u))] flex-col gap-[calc(10*var(--u))] rounded-[calc(24*var(--u))] p-card transition-transform duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export default function Pricing() {
  return (
    <section
      aria-label="Pricing"
      className="gutter relative z-10 pb-section pt-6"
    >
      {/* Frosted glass panel: the helix shows through the blur and fades out inside it. */}
      <div className="rounded-[calc(32*var(--u))] border border-ink/10 bg-linear-to-r from-bg/65 via-bg/35 to-bg/20 p-card shadow-[0_8px_40px_-12px_rgba(0,0,0,0.18)] backdrop-blur-[18px]">
        <div className="grid grid-cols-1 gap-[calc(16*var(--u))] sm:grid-cols-2 lg:grid-cols-3">
          {plans.map(({ price, description, featured }) => (
            <article
              key={price}
              className={
                featured
                  ? `${cardBase} sm:col-span-2 lg:col-span-1 bg-[#0f1a14] text-[#e8f3ec] shadow-[0_16px_36px_-14px_rgba(0,0,0,0.5)] ring-1 ring-white/10`
                  : `${cardBase} border border-ink/10 bg-bg/50 shadow-[0_1px_2px_rgba(0,0,0,0.04)]`
              }
            >
              {/* Price row: the "View breakdown" button sits on this same line, at the right. */}
              <div className="flex flex-nowrap items-center justify-between gap-[calc(12*var(--u))]">
                <p className="whitespace-nowrap font-heading text-price font-medium leading-none [-webkit-text-stroke:0.03em_currentColor]">
                  {/* Nohemi's naira sign is malformed (it renders as a dot), so the symbol uses Poppins. */}
                  <span className="font-sans font-semibold [-webkit-text-stroke:0]">₦</span>
                  {price}
                </p>
                {featured && (
                  <button
                    type="button"
                    className="shrink-0 cursor-pointer whitespace-nowrap min-h-11 rounded-[calc(14*var(--u))] bg-[#f5a524] px-[1em] py-[0.5em] text-label font-bold text-[#0f1a14] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#ffb73d] hover:shadow-[0_8px_22px_-8px_#f5a524] active:translate-y-0 active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
                  >
                    Breakdown
                  </button>
                )}
              </div>
              <p
                className={`mt-auto text-body leading-snug ${featured ? "text-[#e8f3ec]/70" : "text-muted"}`}
              >
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
