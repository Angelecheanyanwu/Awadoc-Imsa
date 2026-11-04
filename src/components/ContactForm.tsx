"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const EMAIL = "genomics@awadoc.com";

const CATEGORIES = ["Couple or individual", "Doctor or clinic", "Partner or organisation", "Researcher", "Media", "Other"];

const COUNTRIES = [
  "Nigeria", "Ghana", "Kenya", "South Africa", "Cameroon", "Senegal", "Ivory Coast", "Egypt", "Ethiopia", "Uganda", "Tanzania",
  "United Kingdom", "United States", "Canada", "Ireland", "Germany", "France", "United Arab Emirates", "Saudi Arabia", "India", "Australia", "Other",
];

const field =
  "mt-[0.3em] w-full rounded-[calc(12*var(--u))] border border-ink/15 bg-ink/4 px-[0.9em] py-[0.5em] text-hero-sub font-medium tracking-[-0.03em] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand";
const label = "block text-hero-sub font-semibold tracking-[-0.03em]";
const optional = "text-[0.78em] font-medium text-muted";

// A drop down in the form's own style: the list opens right under the field (not the browser's tall, blue one), follows the theme, and works with
// the keyboard (arrow keys, Enter, Escape). It sends its choice with the form through a hidden field.
function Dropdown({ name, options, placeholder, invalid, onPick }: { name: string; options: string[]; placeholder: string; invalid?: boolean; onPick?: () => void }) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  function pick(o: string) {
    setValue(o);
    setOpen(false);
    onPick?.();
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setActive(Math.max(0, options.indexOf(value)));
        setOpen(true);
      } else setActive((a) => Math.min(options.length - 1, Math.max(0, a + (e.key === "ArrowDown" ? 1 : -1))));
    } else if (e.key === "Enter" && open) {
      e.preventDefault();
      pick(options[active]);
    }
  }

  return (
    <div ref={box} className="relative" onKeyDown={onKey}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setActive(Math.max(0, options.indexOf(value)));
          setOpen((o) => !o);
        }}
        className={`${field} contact-select block cursor-pointer text-left ${value ? "" : "text-muted/70"} ${invalid ? "border-red-500" : ""}`}
      >
        {value || placeholder}
      </button>
      {open && (
        <ul role="listbox" className="absolute left-0 right-0 z-20 mt-1 max-h-56 overflow-y-auto rounded-[calc(12*var(--u))] border border-ink/15 bg-bg p-1 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.45)]">
          {options.map((o, i) => (
            <li
              key={o}
              role="option"
              aria-selected={o === value}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => pick(o)}
              onMouseEnter={() => setActive(i)}
              className={`cursor-pointer rounded-[calc(8*var(--u))] px-[0.8em] py-[0.45em] text-hero-sub font-medium tracking-[-0.03em] ${i === active ? "bg-brand/20" : ""} ${o === value ? "text-accent" : "text-ink"}`}
            >
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// The message form. There is no mail server behind the site yet, so sending opens the visitor's email app with the message filled in.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [length, setLength] = useState(0);
  const [noCategory, setNoCategory] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    if (!get("category")) {
      setNoCategory(true);
      return;
    }
    const body = [
      `I am a: ${get("category")}`,
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("phone") ? `Phone or WhatsApp: ${get("phone")}` : null,
      get("country") ? `Country: ${get("country")}` : null,
      "",
      get("message"),
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(get("subject"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent)
    return (
      <div role="status" className="rounded-3xl border border-ink/10 bg-ink/4 p-[1.6em] text-center">
        <h3 className="font-heading text-h3 font-medium">Almost there</h3>
        <p className="mt-[0.6em] text-hero-sub font-medium leading-relaxed tracking-[-0.035em] text-muted">
          Your email app should have opened with your message ready. Press send there and the right AwaDoc team will reply within 2 working days.
        </p>
        <button type="button" onClick={() => setSent(false)} className="mt-[1em] cursor-pointer text-hero-sub font-semibold text-accent underline underline-offset-4">
          Back to the form
        </button>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col lg:rounded-3xl lg:border lg:border-brand lg:p-[1em] [[data-theme=dark]_&]:lg:border-white">

      <div className="grid flex-1 gap-[0.6em] sm:grid-cols-2 sm:grid-rows-[repeat(4,auto)_1fr]">
        <label className={`${label} sm:col-span-2`}>
          I am a *
          <Dropdown name="category" options={CATEGORIES} placeholder="Select a category" invalid={noCategory} onPick={() => setNoCategory(false)} />
          {noCategory && <span className="mt-[0.3em] block text-label font-semibold text-red-500">Please choose one.</span>}
        </label>
        <label className={label}>
          Full name *
          <input name="name" required autoComplete="name" placeholder="e.g. Jane Doe" className={field} />
        </label>
        <label className={label}>
          Email address *
          <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
        </label>
        <label className={label}>
          Phone or WhatsApp <span className={optional}>· optional</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+234 803 000 0000" className={field} />
        </label>
        <label className={label}>
          Country <span className={optional}>· optional</span>
          <Dropdown name="country" options={COUNTRIES} placeholder="Select country" />
        </label>
        <label className={`${label} sm:col-span-2`}>
          Subject *
          <input name="subject" required placeholder="What is this about?" className={field} />
        </label>
        <label className={`${label} flex flex-col sm:col-span-2`}>
          Message *
          <textarea
            name="message"
            required
            rows={2}
            maxLength={2000}
            placeholder="Tell us how we can help"
            onChange={(e) => setLength(e.target.value.length)}
            className={`${field} min-h-16 flex-1 resize-none`}
          />
          <span className="mt-[0.2em] block text-right text-label font-medium text-muted">{length} / 2000</span>
        </label>
      </div>

      <label className="mt-[0.7em] flex cursor-pointer items-start gap-3 text-[calc(var(--text-hero-sub)*0.92)] font-medium leading-relaxed tracking-[-0.03em] text-muted">
        <input type="checkbox" name="consent" required className="mt-[0.35em] size-4 shrink-0 accent-(--color-brand)" />
        <span>
          I agree that AwaDoc may use these details to reply to me, as described in the{" "}
          <Link href="/privacy" className="font-semibold text-ink underline underline-offset-4 hover:text-brand">privacy policy</Link>.
        </span>
      </label>

      <button
        type="submit"
        className="mt-[0.8em] inline-flex min-h-btn w-full cursor-pointer items-center justify-center rounded-[calc(14*var(--u))] border border-ink bg-ink px-[1.4em] py-[0.7em] text-btn font-bold text-bg transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-[#07110c] hover:shadow-[0_10px_28px_-8px_var(--color-brand)] active:translate-y-0 active:scale-[0.97] motion-reduce:transition-none sm:w-fit lg:self-center"
      >
        Send message
      </button>
      <p className="mt-[0.6em] text-[calc(var(--text-hero-sub)*0.85)] font-medium leading-relaxed text-muted lg:text-center lg:text-[calc(var(--text-hero-sub)*0.68)]">
        Not for medical emergencies. If you need urgent care, contact your local emergency services.
      </p>
    </form>
  );
}
