import { FaApple, FaGooglePlay } from "react-icons/fa";

// Padding, gaps and icon size are in em, relative to the button's own fluid font size
// (text-store), so the whole button scales with it and the two always fit side by side.
const storeButton =
  "group flex min-h-11 min-w-0 items-center gap-[0.55em] rounded-[0.9em] bg-[#0f1a14] px-[0.9em] py-[0.5em] text-store text-white ring-1 ring-white/10 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:ring-brand/60 hover:shadow-[0_12px_30px_-10px_var(--color-brand)] active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500";

const iconClass = "size-[1.6em] shrink-0";

export default function GetTheApp() {
  return (
    // Lives inside the footer, in the right-hand column under the legal text.
    <section aria-labelledby="get-the-app" className="mt-[calc(var(--spacing-section)/2)]">
      <div>
        {/* A <p>, not a heading: headings are Nohemi everywhere, and this label should use
            the same Poppins as the footer text around it. */}
        <p
          id="get-the-app"
          className="font-sans text-label font-bold uppercase tracking-[0.14em] text-muted"
        >
          Get the AwaDoc app
        </p>

        <div className="mt-5 grid grid-cols-[repeat(2,minmax(0,calc(210*var(--u))))] gap-3">
          <a href="#" className={storeButton}>
            <FaApple aria-hidden="true" className={iconClass} />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-label text-white/75">Download on the</span>
              <span className="truncate font-bold">App Store</span>
            </span>
          </a>

          <a href="#" className={storeButton}>
            <FaGooglePlay aria-hidden="true" className={iconClass} />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-label text-white/75">Get it on</span>
              <span className="truncate font-bold">Google Play</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
