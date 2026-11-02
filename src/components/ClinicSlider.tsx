"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const SLIDES = [
  { src: "/story/lab-dna.png", width: 1018, height: 583, alt: "A strand of DNA made of glowing red and blue particles" },
  { src: "/story/register.jpg", width: 1200, height: 800, alt: "A microscope with its lenses in focus in a clean laboratory" },
  { src: "/story/genotypes.jpg", width: 1400, height: 933, alt: "A scientist in gloves and a mask holding up a plate of samples to the light" },
  { src: "/story/location.jpg", width: 1200, height: 800, alt: "A pipette filling a tray of small sample tubes" },
  { src: "/story/book.jpg", width: 1200, height: 1799, alt: "A gloved hand steadying a petri dish under a laboratory microscope" },
  { src: "/story/results.jpg", width: 1200, height: 800, alt: "A gloved hand holding a sample tube up to the light" },
  { src: "/story/lab-sample.png", width: 379, height: 519, alt: "A gloved hand lifting a blood sample tube from a rack in a bright laboratory" },
];

// The box under the hero: what AwaDoc is and provides, then a slider of lab photos. The current photo is large
// in the middle with two smaller ones on each side; tap a small one, an arrow or a dot, or swipe, to bring it in.
export default function ClinicSlider() {
  const [index, setIndex] = useState(0);
  // The photo just left stays fully visible underneath while the new one fades in on top (no dip in between).
  const [prev, setPrev] = useState(-1);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const n = SLIDES.length;

  const goTo = useCallback(
    (i: number) => {
      const next = ((i % n) + n) % n;
      if (next === index) return;
      setPrev(index);
      setIndex(next);
    },
    [n, index],
  );

  // Moves on by itself every 5 seconds, unless the pointer is over it or motion is reduced.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => goTo(index + 1), 5000);
    return () => window.clearInterval(id);
  }, [paused, index, goTo]);

  return (
    <section id="about" aria-label="About AwaDoc" className="relative z-10 mt-[calc(var(--spacing-section)*1.5)] px-3 sm:px-[2.5vw]">
      <div className="rounded-[calc(32*var(--u))] border border-white/40 bg-linear-to-br from-bg/55 via-bg/40 to-bg/28 p-[calc(20*var(--u))] shadow-[0_24px_60px_-16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-[16px] md:p-[calc(48*var(--u))]">
        <div className="grid items-center gap-[calc(32*var(--u))] md:grid-cols-2 md:gap-x-[calc(56*var(--u))]">
        <div className="@container">
          <h2 className="whitespace-nowrap text-center font-heading md:text-left text-[min(var(--text-h2),calc(100cqw/16.5))] font-medium leading-[1.06] [-webkit-text-stroke:0.03em_currentColor]">
            First clinical research lab in Africa
          </h2>
          <p className="mt-[1.6em] max-w-[38em] text-justify text-hero-sub font-medium leading-relaxed tracking-[-0.035em] text-muted">
            Our aim is to end the passing on of sickle cell disease, one family at a time. We give couples clear answers
            about their genetic risk and real options for having children free of sickle cell disease, with expert care
            that is private, compassionate, and accessible from anywhere.
          </p>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <ul
            aria-label="Photos from the lab"
            onPointerDown={(e) => (startX.current = e.clientX)}
            onPointerUp={(e) => {
              if (startX.current === null) return;
              const dx = e.clientX - startX.current;
              startX.current = null;
              if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
            }}
            onClick={() => goTo(index + 1)}
            className="relative aspect-[4/3] w-full cursor-pointer touch-pan-y select-none overflow-hidden rounded-[calc(22*var(--u))] bg-ink/5"
          >
            {/* One photo at a time: they sit on top of each other and the current one fades in. */}
            {SLIDES.map((s, i) => (
              <li
                key={s.src}
                aria-label={`Photo ${i + 1} of ${n}`}
                aria-hidden={i !== index}
                // Only the photo coming in is animated. The one just left stays put underneath until it is covered,
                // and the rest wait out of sight, so nothing flickers or zooms while it is still visible.
                className={`absolute inset-0 ${
                  i === index
                    ? "z-10 scale-100 opacity-100 transition-[opacity,transform] duration-[1400ms] ease-in-out motion-reduce:transition-none"
                    : i === prev
                      ? "z-[5] scale-100 opacity-100"
                      : "z-0 scale-[1.06] opacity-0"
                }`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  sizes="(min-width: 768px) 46vw, 90vw"
                  draggable={false}
                  loading="eager"
                  className="absolute inset-0 size-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </section>
  );
}
