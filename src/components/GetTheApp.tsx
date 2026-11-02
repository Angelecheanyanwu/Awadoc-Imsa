import { FaApple, FaGooglePlay } from "react-icons/fa";

// Padding, gaps and icon size are in em, relative to the button's own fluid font size
// (text-store), so the whole button scales with it and the two always fit side by side.
const storeButton =
  "group flex min-w-0 items-center gap-[0.55em] rounded-[0.9em] bg-[#0f1a14] p-[0.65em] text-white ring-1 ring-white/10 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:ring-brand/60 hover:shadow-[0_12px_30px_-10px_var(--color-brand)] active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500";

// The button text is the same responsive size as "in partnership with" (text-hero-sub), and also shrinks with the screen
// on very narrow phones so the two buttons always fit, like the logos do. The padding is the same on all four sides
// (0.65em), so the content has an equal gap from the left, right, top and bottom, and the height follows the text.
const oneRow = "text-[min(var(--text-hero-sub),calc((100vw-2.5rem)/19.5))]";

const iconClass = "size-[1.5em] shrink-0";

export default function GetTheApp() {
  return (
    // Lives inside the footer, centred under the partnership line.
    <section aria-labelledby="get-the-app">
      <div className="relative">
        {/* A <p>, not a heading: headings are Nohemi everywhere, and this label should use
            the same Poppins as the footer text around it. */}
        <p
          id="get-the-app"
          className="text-center font-sans text-hero-sub font-bold uppercase tracking-[0.14em] text-muted absolute inset-x-0 bottom-full mb-2 whitespace-nowrap"
        >
        </p>

        <div className="grid grid-cols-[repeat(2,max-content)] justify-center gap-2">
          <a
            href="https://apps.apple.com/ng/app/awadoc-your-health-assistant/id6769415874"
            target="_blank"
            rel="noopener noreferrer"
            className={`${storeButton} ${oneRow}`}
          >
            <FaApple aria-hidden="true" className={iconClass} />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-white/75 text-[0.8em]">Download on the</span>
              <span className="truncate font-bold">App Store</span>
            </span>
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.awadoc.mobile"
            target="_blank"
            rel="noopener noreferrer"
            className={`${storeButton} ${oneRow}`}
          >
            <FaGooglePlay aria-hidden="true" className={iconClass} />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-white/75 text-[0.8em]">Get it on</span>
              <span className="truncate font-bold">Google Play</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
