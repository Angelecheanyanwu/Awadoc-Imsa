"use client";

import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { buildGeometry, fragmentShader, GREEN, vertexShader } from "@/components/HelixBackground";

// The hero and the booking steps share one pinned stage and ONE helix. Scrolling glides the camera in a single move
// from the outside view (the hero) into the helix. When it arrives the scene STOPS: the three steps are shown together,
// still, with no step-by-step moves. Every change is the camera moving; the helix itself never jumps or turns.
const STEPS = [
  {
    number: "01",
    place: "md:bottom-[max(14svh,6rem)] md:left-[max(1.25rem,5vw)]", // bottom left, in line with the hero text
    title: "Your details",
    text: "Add your names and contact details, then both genotypes and where you live. We show you the odds for every pregnancy.",
  },
  {
    number: "02",
    place: "md:left-1/2 md:top-[44%] md:-translate-x-1/2 md:-translate-y-1/2", // the middle of the screen
    title: "Book",
    text: "Choose virtual or in person counselling, add any procedures you need, and pick a date and time that suits you both.",
  },
  {
    number: "03",
    place: "md:left-[max(1.25rem,5vw)] md:top-[22svh]", // far left, above 01
    title: "Pay",
    text: "Upload your lab reports if you have them, review everything in one place, and make one secure payment by card, bank transfer or mobile money. Your booking is confirmed straight away.",
  },
];

const CAMERA_Z = 13; // the hero's camera distance
const FOV = (2 * Math.atan(8.19 / 2 / CAMERA_Z) * 180) / Math.PI; // the hero's field of view (about 35 degrees)
const HERO_TILT = { x: 0.15, z: -0.62, scale: 1.15, offsetX: 3.1 }; // how the hero helix is posed

type Shot = { cam: THREE.Vector3; look: THREE.Vector3; up: THREE.Vector3; spin: number };
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
// Where the glide ends: pressed up against a strand, with the helix running across the screen.
const STORY_SHOT: Shot = { cam: V(3.0, 3.1, 2.6), look: V(-2.1, 1.7, -0.2), up: V(0, 1, 0), spin: 0.5 };
const HOLD = 1.4; // screens of scrolling for the whole move: the glide, then a short rest on the finished scene

const ease = (x: number) => x * x * (3 - 2 * x);
const smoother = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

export default function HelixStory({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current, stage = stageRef.current;
    if (!track || !stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
    stage.prepend(canvas);

    // If WebGL is unavailable there is no helix, but the hero and the steps still show, so the page stays readable.
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
    // The stage fills the whole screen (100lvh), but the hero was framed for 100svh (with the phone browser's toolbars
    // showing). This invisible probe measures that height.
    const probe = document.createElement("div");
    probe.style.cssText = "position:fixed;left:0;top:0;width:0;height:100svh;visibility:hidden;pointer-events:none;";
    document.body.appendChild(probe);

    // The very same helix as the hero: same length, density, colours, burst and linking rungs.
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

    // The hero stop is worked out from the old hero pose (tilt, offset and scale), so the first view looks exactly as
    // before: the camera goes where it would have to be to see the untilted helix the way the tilted one looked.
    let heroShot: Shot = { cam: V(0, 0, CAMERA_Z), look: V(0, 0, 0), up: V(0, 1, 0), spin: 0 };
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      gl?.setSize(w, h, false);
      mat.uniforms.uDim.value = w < 640 ? 0.5 : 1;
      camera.aspect = w / h;
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

    // 0 at the top of the section, 1 when the whole move is done.
    const targetScroll = () => {
      const travel = track.offsetHeight - stage.offsetHeight;
      return travel > 0 ? clamp01(-track.getBoundingClientRect().top / travel) : 0;
    };

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

      // One long continuous glide from the hero into the helix, then it rests.
      const e = smoother(clamp01((s - 0.06) / 0.74));
      const heroAmt = 1 - clamp01(e * 1.5); // 1 on the hero, fading out as you glide in
      const A = heroShot, B = STORY_SHOT;

      // The camera path, with a slight arc so it swoops in instead of sliding.
      const arc = Math.sin(Math.PI * e) * 1.2;
      const par = 0.12 + heroAmt * 0.25;
      camera.position.set(
        lerp(A.cam.x, B.cam.x, e) + arc + mx * par,
        lerp(A.cam.y, B.cam.y, e) - my * par,
        lerp(A.cam.z, B.cam.z, e) + arc * 0.6,
      );
      camera.up.set(lerp(A.up.x, B.up.x, e), lerp(A.up.y, B.up.y, e), lerp(A.up.z, B.up.z, e)).normalize();
      camera.lookAt(lerp(A.look.x, B.look.x, e), lerp(A.look.y, B.look.y, e), lerp(A.look.z, B.look.z, e));

      // A slow spin on the hero, a faint drift inside so it never feels frozen.
      if (!reduceMotion) spinAcc += dt * (0.25 * heroAmt + 0.03 * (1 - heroAmt));
      helix.rotation.y = lerp(A.spin, B.spin, e) + spinAcc;
      mat.uniforms.uTime.value = elapsed;
      mat.uniforms.uProgress.value = reduceMotion ? 0 : progressAt(elapsed) * heroAmt; // the burst lives on the hero only

      // How far the section has scrolled away after the move (0 while pinned, 1 when gone).
      const out = clamp01(1 - track.getBoundingClientRect().bottom / window.innerHeight);
      const keep = 1 - clamp01(out * 1.6);
      // The helix is dimmed a little on the white theme, the whole way through, as on the hero.
      canvas.style.opacity = `calc(var(--helix-o) * ${keep.toFixed(3)})`;
      const wantMask = out > 0.001;
      if (wantMask !== masked) {
        masked = wantMask;
        const m = wantMask ? "linear-gradient(to bottom,#000 72%,transparent 100%)" : "none";
        canvas.style.setProperty("-webkit-mask-image", m);
        canvas.style.setProperty("mask-image", m);
      }

      // The hero copy fades away as the camera leaves; the three steps fade in as it arrives, and then stay.
      const hero = heroRef.current;
      if (hero) {
        const o = clamp01(1 - e * 3) * keep;
        hero.style.opacity = String(o);
        hero.style.transform = `translateY(${(1 - o) * -24}px)`;
        hero.style.pointerEvents = o > 0.5 ? "auto" : "none";
      }
      const story = storyRef.current;
      if (story) {
        const o = clamp01((e - 0.7) / 0.3) * keep;
        story.style.opacity = String(o);
        story.style.transform = `translateY(${(1 - o) * 24}px)`;
      }

      gl?.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      mat.dispose();
      gl?.dispose();
      probe.remove();
      canvas.remove();
    };
  }, []);

  return (
    <section
      ref={trackRef}
      id="how-it-works"
      aria-label="Introduction and how it works"
      className="relative z-10 bg-bg"
      style={{ height: `calc(100lvh + ${HOLD * 100}svh)` }}
    >
      <div ref={stageRef} className="sticky top-0 h-lvh overflow-hidden">
        {/* The hero copy: centred in the space under the nav, like before. */}
        <div
          ref={heroRef}
          className="gutter absolute inset-0 z-10 flex items-center pb-[calc(100lvh-100svh+1.5rem)] pt-[calc(max(1.5rem,env(safe-area-inset-top))+1.5rem+2.75rem+1.5rem)] will-change-[opacity,transform]"
        >
          {children}
        </div>

        {/* The finished scene: all three steps together, still. */}
        <div
          ref={storyRef}
          className="gutter pointer-events-none absolute inset-0 z-10 flex items-center pb-[calc(100lvh-100svh+1.5rem)] pt-[calc(max(1.5rem,env(safe-area-inset-top))+1.5rem+2.75rem+1.5rem)] opacity-0 will-change-[opacity,transform]"
        >
          <ol className="grid w-full gap-[calc(36*var(--u))] md:contents">
            {STEPS.map((step) => (
              <li key={step.title} className={`story-glow relative md:absolute md:w-[min(26rem,30vw)] ${step.place}`}>
                <div className="mb-[1.1em] flex items-center gap-[0.6rem] text-label font-medium uppercase tracking-[0.18em] text-accent after:block after:h-px after:w-8 after:bg-current after:opacity-60 after:content-['']">
                  {step.number}
                </div>
                <h2 className="mb-[0.5em] font-heading text-h2 font-medium leading-[1.06] [-webkit-text-stroke:0.015em_currentColor]">
                  {step.title}
                </h2>
                <p className="max-w-[26em] text-hero-sub font-semibold leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
