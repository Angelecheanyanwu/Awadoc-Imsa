import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import HelixBackground from "@/components/HelixBackground";
import Pricing from "@/components/Pricing";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import NavPills from "@/components/NavPills";
import Partnership from "@/components/Partnership";
import StickyNav from "@/components/StickyNav";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
    {/* The helix canvas covers the hero AND the pricing section, and fades out inside the
        pricing glass panel. */}
    <div className="relative">
      <HelixBackground className="helix-bg helix-fade" />

    {/* min-h (not h): on very short screens the page grows and scrolls instead of clipping. */}
    <main data-hero className="relative flex min-h-svh flex-col">

      {/* Logo left, pills dead center, theme switch right. Always one row: on small screens
          the logo, links and switch just get smaller instead of wrapping. */}
      <StickyNav>
        <Logo className="h-8 w-auto max-sm:h-6" />
        {/* Below 500px the links fold into the menu button on the right. */}
        <div className="hidden justify-self-center min-[500px]:block">
          <NavPills />
        </div>
        <div className="flex items-center gap-[calc(8*var(--u))] col-start-3 justify-self-end">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </StickyNav>

      {/* Fills the rest of the screen below the nav and centers the copy in it, on every device, so
          the gap above the hero (from the nav) equals the gap below it. The hero is exactly one
          screen tall (svh = the visible height with the phone browser's toolbars showing), so the
          centering follows the screen's height, not just its width. */}
      <div className="gutter relative z-10 flex flex-1 items-center py-6">
        {/* w-fit makes this block exactly as wide as "who you marry." at every screen size: line one is
            zero-width and overflows, and the paragraph and buttons fill the block, so the subtext
            never goes past "marry.". Below 780px line one breaks after "genotype" (it can't fit on
            one line any more), and "shouldn't decide" is only slightly wider than "marry.". */}
        <div className="w-fit">
          <h1 className="mb-[0.35em] text-display font-heading font-medium [-webkit-text-stroke:0.06em_currentColor] leading-[1.05] tracking-normal">
            <span className="block w-0 whitespace-nowrap">
              Your genotype{" "}
              <br className="min-[780px]:hidden" />
              shouldn&apos;t decide
            </span>
            <span className="block text-brand">who you marry.</span>
          </h1>
          <p className="mb-8 w-0 min-w-full text-hero-sub font-medium leading-relaxed tracking-[-0.035em] text-muted hero-sub">
            AS + AS or AS + SS? IVF with embryo testing can prevent sickle cell. Book now, wherever you are.
          </p>
          <div className="flex w-0 min-w-full flex-wrap gap-3">
            <button className="min-h-btn cursor-pointer rounded-full border border-ink bg-ink px-[1.4em] py-[0.7em] text-btn font-bold text-bg transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-[#07110c] hover:shadow-[0_10px_28px_-8px_var(--color-brand)] active:translate-y-0 active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500">
              Start booking            </button>
           
          </div>
        </div>
      </div>
    </main>

    <Pricing />
    </div>

    <Partnership />

    <Faq />

    <Footer />
    </>
  );
}
