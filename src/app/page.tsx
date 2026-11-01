import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import HelixStory from "@/components/HelixStory";
import Pricing from "@/components/Pricing";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import NavPills from "@/components/NavPills";
import Partnership from "@/components/Partnership";
import StartBookingButton from "@/components/StartBookingButton";
import StickyNav from "@/components/StickyNav";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
    {/* The hero and the three booking steps share one pinned stage and one helix: scrolling glides the camera
        from the hero into the first step. The nav is fixed, so it sits outside. */}
    <StickyNav spacer={false}>
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

    <HelixStory>
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
            <StartBookingButton />
           
          </div>
        </div>
    </HelixStory>

    <Pricing />

    <Partnership />

    <Faq />

    <Footer />
    </>
  );
}
