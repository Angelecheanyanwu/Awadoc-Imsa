"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HIGHLIGHTS = [
  {
    title: "Nigeria’s first government authenticated IVF baby",
    text: "Led the team behind the birth in 1998, followed by Nigeria’s first IVF twins, triplets and babies from frozen embryos.",
  },
  {
    title: "Sickle cell embryo testing in Nigeria",
    text: "Lead author of the 2020 report of a sickle cell free birth after PGT-M with the genetic testing done entirely in Nigeria, and of a 5 year review of PGT in Abuja (2026).",
  },
  {
    title: "National honour",
    text: "Officer of the Order of the Niger (OON), awarded in 2006 for his work in IVF.",
  },
  {
    title: "Research and writing",
    text: "Author of more than 15 peer reviewed papers and two books, The Second Chance and PPP in Health.",
  },
];

const CAREER = [
  "MBBS, Ahmadu Bello University, Zaria (1980)",
  "Fellow, Royal College of Obstetricians and Gynaecologists (FRCOG), UK",
  "Fellow, West African College of Surgeons (FWACS)",
  "MBA, International Hospital and Healthcare Management, Frankfurt School of Finance & Management",
  "Clinical research fellow in reproductive medicine, Manchester Fertility Services and St Mary’s Hospital, Manchester (1989–1992)",
  "Consultant, Bourn Hall Clinic, Cambridge, the world’s first IVF clinic (1992–1994)",
  "Former Chief Consultant and Chairman of the Medical Advisory Committee, National Hospital, Abuja",
];

// Dr Wada's full profile, opened from "View full profile". It eases in, closes with the button, the cross, Esc or a tap outside,
// and the page behind it stops scrolling while it is open.
export default function SpecialistProfileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // `shown` drives the fade and grow; `present` keeps the modal mounted while it animates out.
  const [shown, setShown] = useState(false);
  const [present, setPresent] = useState(false);
  useEffect(() => {
    if (open) {
      setPresent(true);
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    setShown(false);
    const t = setTimeout(() => setPresent(false), 380);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open && !present) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-[max(0.75rem,env(safe-area-inset-top))_max(0.75rem,env(safe-area-inset-right))_max(0.75rem,env(safe-area-inset-bottom))_max(0.75rem,env(safe-area-inset-left))] backdrop-blur-[3px] transition-opacity duration-400 ease-out motion-reduce:transition-none ${shown ? "opacity-100" : "opacity-0"}`}
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
        className={`[scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative max-h-[min(88dvh,60rem)] w-full max-w-[44rem] origin-center overflow-y-auto rounded-[28px] border border-white/40 bg-linear-to-br from-bg/95 via-bg/92 to-bg/88 p-6 text-ink shadow-[0_24px_80px_-16px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.5)] outline-none backdrop-blur-md transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:p-9 ${shown ? "scale-100 opacity-100" : "scale-[0.94] opacity-0"}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-4 top-4 grid size-10 cursor-pointer place-items-center rounded-full border border-ink/20 bg-bg/70 transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-4">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="flex items-center gap-4 pr-12">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-brand/20 sm:size-20">
            <Image src="/team/wada-portrait.png" alt="" width={1072} height={1976} sizes="80px" className="absolute left-1/2 top-[6%] h-[190%] w-auto max-w-none -translate-x-1/2 object-cover object-top" />
          </div>
          <div className="min-w-0">
            <h2 id="profile-title" className="font-heading text-h2 font-medium leading-[1.08] [-webkit-text-stroke:0.03em_currentColor]">
              Dr Ibrahim Wada, OON
            </h2>
            <p className="mt-[0.4em] text-label font-semibold uppercase tracking-[0.1em] text-accent">MBBS · FRCOG · FWACS · MBA</p>
          </div>
        </div>

        <p className="mt-[1.4em] text-hero-sub font-medium leading-relaxed tracking-[-0.035em] text-muted">
          Dr Wada is one of Nigeria’s pioneers of in vitro fertilisation. He has practised reproductive medicine for over 35 years and has
          championed embryo testing (PGT-M) so that couples who carry the sickle cell gene can have children free of the disease.
        </p>

        <div className="mt-[1.6em] grid gap-3 sm:grid-cols-2">
          {HIGHLIGHTS.map((h) => (
            <section key={h.title} className="rounded-[20px] bg-ink/5 p-4">
              <h3 className="text-hero-sub font-semibold leading-snug">{h.title}</h3>
              <p className="mt-[0.5em] text-[calc(var(--text-hero-sub)*0.92)] font-medium leading-relaxed tracking-[-0.03em] text-muted">{h.text}</p>
            </section>
          ))}
        </div>

        <h3 className="mt-[1.8em] font-heading text-h3 font-medium [-webkit-text-stroke:0.03em_currentColor]">Training and career</h3>
        <ul className="mt-[0.8em] space-y-[0.7em]">
          {CAREER.map((line) => (
            <li key={line} className="flex gap-3 text-[calc(var(--text-hero-sub)*0.95)] font-medium leading-relaxed tracking-[-0.03em] text-muted">
              <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-brand" />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
