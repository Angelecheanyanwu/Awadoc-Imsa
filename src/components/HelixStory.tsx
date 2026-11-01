"use client";

import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { buildGeometry, fragmentShader, GREEN, vertexShader } from "@/components/HelixBackground";

// The hero and the three booking steps share one pinned stage and ONE helix. The hero is the first stop; scrolling
// glides the camera in a single move from the outside view (the hero) into the helix, one stop per step.
// The helix itself never jumps or turns: every change is the camera moving.
const STEPS = [
  {
    eyebrow: "01",
    title: "Your details",
    text: "Add your names and contact details, then both genotypes and where you live. We show you the odds for every pregnancy.",
  },
  {
    eyebrow: "02",
    title: "Book",
    text: "Choose virtual or in-person counselling, add any procedures you need, and pick a date and time that suits you both.",
  },
  {
    eyebrow: "03",
    title: "Pay",
    text: "Upload your lab reports if you have them, review everything in one place, and make one secure payment by card, bank transfer or mobile money. Your booking is confirmed straight away.",
  },
];

const CAMERA_Z = 13; // the hero's camera distance
const FOV = (2 * Math.atan(8.19 / 2 / CAMERA_Z) * 180) / Math.PI; // the hero's field of view (about 35 degrees)
const HERO_TILT = { x: 0.15, z: -0.62, scale: 1.15, offsetX: 3.1 }; // how the hero helix is posed

// Camera stops after the hero: pressing against a strand (01), inside between the strands (02), deeper (03).
type Shot = { cam: THREE.Vector3; look: THREE.Vector3; up: THREE.Vector3; spin: number };
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const INNER: Shot[] = [
  { cam: V(3.0, 3.1, 2.6), look: V(-2.1, 1.7, -0.2), up: V(0, 1, 0), spin: 0.5 },
  { cam: V(0.3, 0.7, 0.35), look: V(-0.9, -1.6, 0.9), up: V(0, 1, 0), spin: 1.1 },
  { cam: V(-0.25, -1.4, 0.15), look: V(0.9, -3.8, -0.9), up: V(0, 1, 0), spin: 1.7 },
];
const STAGES = INNER.length; // 3
const PER = 1.2; // screens of scrolling per stop

const ease = (x: number) => x * x * (3 - 2 * x);
const smoother = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

export default function HelixStory({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const controlsRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const track = trackRef.current, stage = stageRef.current;
    if (!track || !stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
    stage.prepend(canvas);

    // If WebGL is unavailable (for example too many 3D tabs open) there is no helix, but the text panels,
    // counter, arrows and progress bars still work, so the page stays readable.
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch {
      renderer = null;
      canvas.remove();
    }
    const gl = renderer;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.05, 100);
    // The stage fills the whole screen (100lvh, the biggest the screen gets), but the hero was framed for 100svh (with
    // the phone browser's toolbars showing). This invisible probe measures that height.
    const probe = document.createElement("div");
    probe.style.cssText = "position:fixed;left:0;top:0;width:0;height:100svh;visibility:hidden;pointer-events:none;";
    document.body.appendChild(probe);

    // The very same helix as the hero used to be: same length, density, colours, burst and linking rungs.
    const geo = gl ? buildGeometry(GREEN) : new THREE.BufferGeometry();
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uPixelRatio: { value: gl ? gl.getPixelRatio() : 1 },
        uDim: { value: 1 },
      },
    });
    const helix = new THREE.Points(geo, mat);
    scene.add(helix);

    // The hero stop is worked out from the old hero pose (tilt, offset and scale), so the first view looks exactly as before:
    // the camera is placed where it would have to be to see the untilted helix the way the tilted one used to look.
    let heroShot: Shot = { cam: V(0, 0, CAMERA_Z), look: V(0, 0, 0), up: V(0, 1, 0), spin: 0 };
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      gl?.setSize(w, h, false);
      mat.uniforms.uDim.value = w < 640 ? 0.5 : 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // Frame the hero as if the screen were svh tall, then keep it centred in that top part of the stage.
      const baseH = Math.min(Math.max(probe.offsetHeight || h, 1), h);
      camera.fov = (2 * Math.atan(((h / baseH) * 8.19) / 2 / CAMERA_Z) * 180) / Math.PI;
      camera.updateProjectionMatrix();
      const bigScreenShift = clamp01((w - 1280) / 640) * 2.6;
      const px = (HERO_TILT.offsetX * (w / baseH)) / 1.6 + bigScreenShift;
      const py = ((h - baseH) / 2) * (8.19 / baseH);
      const pose = new THREE.Matrix4().compose(
        new THREE.Vector3(px, py, 0),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(HERO_TILT.x, 0, HERO_TILT.z, "XYZ")),
        new THREE.Vector3(HERO_TILT.scale, HERO_TILT.scale, HERO_TILT.scale),
      );
      const inv = pose.clone().invert();
      heroShot = {
        cam: V(0, 0, CAMERA_Z).applyMatrix4(inv),
        look: V(0, 0, 0).applyMatrix4(inv),
        up: V(0, 1, 0).transformDirection(inv),
        spin: 0,
      };
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let mx = 0, my = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove);

    // Scroll distance of one stop, measured from the real track so phone toolbars don't matter.
    const perPx = () => (track.offsetHeight - stage.offsetHeight) / STAGES;
    const targetScroll = () => clamp01(-track.getBoundingClientRect().top / (perPx() * STAGES)) * STAGES;
    const trackTop = () => track.getBoundingClientRect().top + window.scrollY;
    const goTo = (k: number) => window.scrollTo({ top: trackTop() + k * perPx(), behavior: reduceMotion ? "auto" : "smooth" });
    const current = () => Math.round(targetScroll());

    const segs = Array.from(stage.querySelectorAll<HTMLButtonElement>("[data-go]"));
    const segHandlers = segs.map((b) => {
      const fn = () => goTo(Number(b.dataset.go));
      b.addEventListener("click", fn);
      return fn;
    });
    const onPrev = () => goTo(Math.max(current() - 1, 1));
    // Past the last step the Next arrow scrolls on to the rest of the page.
    const onNext = () =>
      current() >= STAGES
        ? window.scrollTo({ top: trackTop() + track.offsetHeight - window.innerHeight + 2, behavior: "smooth" })
        : goTo(current() + 1);
    prevRef.current?.addEventListener("click", onPrev);
    nextRef.current?.addEventListener("click", onNext);
    const onKey = (ev: KeyboardEvent) => {
      const r = track.getBoundingClientRect();
      if (!(r.top <= 1 && r.bottom >= window.innerHeight - 1 && targetScroll() > 0.5)) return;
      if (ev.key === "ArrowRight") {
        ev.preventDefault();
        goTo(current() + 1);
      }
      if (ev.key === "ArrowLeft") {
        ev.preventDefault();
        goTo(Math.max(current() - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);

    // The hero's burst: as the page loads, then every 20 seconds, while the hero is on screen.
    const CYCLE = 20;
    const easeOut = (x: number) => 1 - (1 - x) * (1 - x);
    const progressAt = (t: number) => {
      const s = (t + 0.3) % CYCLE;
      if (s < 1.5) return easeOut(s / 1.5);
      if (s < 2.8) return 1;
      if (s < 6) return 1 - ease((s - 2.8) / 3.2);
      return 0;
    };

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(track);

    let s = targetScroll(), spinAcc = 0, last = performance.now(), raf = 0, elapsed = 0, masked = false;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;
      elapsed += dt;

      s += (targetScroll() - s) * (reduceMotion ? 1 : 0.08); // inertia
      if (!Number.isFinite(s)) s = 0;

      // Hero to 01 is one long continuous glide; between the steps the camera holds, then moves.
      const i = Math.min(Math.floor(s), STAGES - 1), f = s - i;
      const tf = i === 0 ? smoother(clamp01((f - 0.08) / 0.84)) : ease(clamp01((f - 0.3) / 0.4));
      const e = i + tf;
      const A = i === 0 ? heroShot : INNER[i - 1], B = INNER[i];
      const heroAmt = 1 - clamp01(e * 1.5); // 1 on the hero, fading out as you glide in

      // The camera path, with a slight arc on the first glide so it swoops in instead of sliding.
      const arc = i === 0 ? Math.sin(Math.PI * tf) * 1.2 : 0;
      const par = 0.12 + heroAmt * 0.25;
      camera.position.set(
        lerp(A.cam.x, B.cam.x, tf) + arc + mx * par,
        lerp(A.cam.y, B.cam.y, tf) - my * par,
        lerp(A.cam.z, B.cam.z, tf) + arc * 0.6,
      );
      camera.up.set(lerp(A.up.x, B.up.x, tf), lerp(A.up.y, B.up.y, tf), lerp(A.up.z, B.up.z, tf)).normalize();
      camera.lookAt(lerp(A.look.x, B.look.x, tf), lerp(A.look.y, B.look.y, tf), lerp(A.look.z, B.look.z, tf));

      // A slow spin on the hero, a faint drift inside so it never feels frozen.
      if (!reduceMotion) spinAcc += dt * (0.25 * heroAmt + 0.03 * (1 - heroAmt));
      helix.rotation.y = lerp(A.spin, B.spin, tf) + spinAcc;
      mat.uniforms.uTime.value = elapsed;
      mat.uniforms.uProgress.value = reduceMotion ? 0 : progressAt(elapsed) * heroAmt; // the burst lives on the hero only

      // How far the section has scrolled away after the last step (0 while pinned, 1 when gone).
      const out = clamp01(1 - track.getBoundingClientRect().bottom / window.innerHeight);
      const keep = 1 - clamp01(out * 1.6);
      // The helix is dimmed a little on the white theme the whole way through, as on the hero.
      canvas.style.opacity = `calc(var(--helix-o) * ${keep.toFixed(3)})`;
      const wantMask = out > 0.001;
      if (wantMask !== masked) {
        masked = wantMask;
        const m = wantMask ? "linear-gradient(to bottom,#000 72%,transparent 100%)" : "none";
        canvas.style.setProperty("-webkit-mask-image", m);
        canvas.style.setProperty("mask-image", m);
      }

      panelRefs.current.forEach((p, k) => {
        if (!p) return;
        const o = clamp01(1 - Math.abs(e - k) * 3) * keep;
        p.style.opacity = String(o);
        // Pay opens up from the middle (it grows a little as it fades in); the others slide in.
        p.style.transform = k === 3 ? `scale(${0.88 + 0.12 * Math.min(o / Math.max(keep, 0.001), 1)})` : `translateY(${(1 - o) * (e < k ? 24 : -24)}px)`;
        p.style.pointerEvents = o > 0.5 ? "auto" : "none";
      });
      const c = controlsRef.current;
      if (c) {
        c.style.opacity = e > 0.6 ? String(keep) : "0";
        c.style.pointerEvents = e > 0.6 && keep > 0.5 ? "auto" : "none";
      }
      if (curRef.current) curRef.current.textContent = `0${Math.min(Math.max(Math.round(e), 1), 3)}`;
      if (prevRef.current) prevRef.current.disabled = e < 1.5;
      fillRefs.current.forEach((fl, k) => {
        if (fl) fl.style.width = `${clamp01(e - k) * 100}%`;
      });

      gl?.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", onKey);
      segs.forEach((b, k) => b.removeEventListener("click", segHandlers[k]));
      prevRef.current?.removeEventListener("click", onPrev);
      nextRef.current?.removeEventListener("click", onNext);
      geo.dispose();
      mat.dispose();
      gl?.dispose();
      probe.remove();
      canvas.remove();
    };
  }, []);

  const heading = "font-heading font-medium leading-[1.06] [-webkit-text-stroke:0.03em_currentColor]";

  return (
    <section
      ref={trackRef}
      aria-label="Introduction and how it works"
      className="relative z-10 bg-bg"
      style={{ height: `calc(100lvh + ${STAGES * PER * 100}svh)` }}
    >
      <div ref={stageRef} className="sticky top-0 h-[100lvh] overflow-hidden">
        {/* The hero copy: centred in the space under the nav, like before. */}
        <div
          ref={(el) => {
            panelRefs.current[0] = el;
          }}
          className="gutter absolute inset-0 z-10 flex items-center pb-[calc(100lvh-100svh+1.5rem)] pt-[calc(max(1.5rem,env(safe-area-inset-top))+1.5rem+2.75rem+1.5rem)] will-change-[opacity,transform]"
        >
          {children}
        </div>

        {STEPS.map((step, i) => (
          <div
            key={step.title}
            ref={(el) => {
              panelRefs.current[i + 1] = el;
            }}
            id={`story-p${i + 1}`}
            className="story-panel"
          >
            <div className="story-eyebrow mb-[1.1em] text-label font-medium uppercase tracking-[0.18em] text-accent">{step.eyebrow}</div>
            <h2 className={`${heading} mb-[0.5em] text-h2`}>{step.title}</h2>
            <p className="max-w-[26em] text-hero-sub font-semibold leading-relaxed text-muted">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
