"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { LuCheck, LuChevronDown, LuChevronLeft, LuChevronRight, LuTrash2, LuX } from "react-icons/lu";
import { formatPrice } from "@/lib/currency";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useRouter } from "next/navigation";
import { useFaqStore } from "@/store/useFaqStore";
import {
  COUNSELLING_NGN,
  PACKAGE_IDS,
  PACKAGE_NGN,
  PROCEDURES,
  totalNgn,
  useBookingStore,
  type Counselling,
  type Genotype,
  type PayMethod,
} from "@/store/useBookingStore";
import { chosen, Field, IconTile, inputBase, Notice, SelectInput, Tick, TextInput } from "@/components/booking/fields";

/** A naira amount shown in the chosen currency. The symbol uses Poppins (Nohemi's ₦ is malformed). */
export function Money({ ngn }: { ngn: number }) {
  const currency = useCurrencyStore((s) => s.currency);
  const { symbol, digits } = formatPrice(ngn, currency);
  return (
    <>
      <span className="font-sans">{symbol}</span>
      {digits}
    </>
  );
}

const RELATIONSHIPS = ["Married", "Engaged", "In a relationship", "Other"];
const LAB_OPTIONS = ["Both tested", "One tested", "Neither tested"];
const AGES = ["Under 25", "25–29", "30–34", "35–39", "40–44", "45 or older"];
const IVF_OPTIONS = ["No, never", "Yes, once", "Yes, more than once"];
const CHILDREN = ["None", "1", "2", "3 or more"];
const DIAL_CODES = ["+234", "+233", "+254", "+27", "+44", "+1", "+971", "+49", "+33", "+353"];
// Flag files live in /public/flags (two-letter codes). "Other" has no flag.
const FLAG: Record<string, string> = {
  Nigeria: "ng", Ghana: "gh", Kenya: "ke", "South Africa": "za", Cameroon: "cm", Senegal: "sn", Egypt: "eg",
  "United Kingdom": "gb", Ireland: "ie", "United States": "us", Canada: "ca", "United Arab Emirates": "ae",
  Germany: "de", France: "fr", Netherlands: "nl", Australia: "au",
};
const flagIcon = (country: string) =>
  FLAG[country] ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/flags/${FLAG[country]}.svg`} alt="" width={20} height={14} className="h-3.5 w-5 shrink-0 rounded-xs object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" />
  ) : (
    <span aria-hidden="true" className="h-3.5 w-5 shrink-0 rounded-xs bg-ink/10" />
  );
// The same flag files for the country-code list (+1 shows the US flag).
const DIAL_FLAG: Record<string, string> = {
  "+234": "ng", "+233": "gh", "+254": "ke", "+27": "za", "+44": "gb", "+1": "us", "+971": "ae", "+49": "de", "+33": "fr", "+353": "ie",
};
const dialFlagIcon = (code: string) =>
  DIAL_FLAG[code] ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/flags/${DIAL_FLAG[code]}.svg`} alt="" width={20} height={14} className="h-3.5 w-5 shrink-0 rounded-xs object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" />
  ) : null;
const COUNTRIES = [
  "Nigeria", "Ghana", "Kenya", "South Africa", "Cameroon", "Senegal", "Egypt", "United Kingdom", "Ireland",
  "United States", "Canada", "United Arab Emirates", "Germany", "France", "Netherlands", "Australia", "Other",
];

const GENOTYPES: { code: Genotype; caption: string }[] = [
  { code: "AS", caption: "Trait" },
  { code: "AC", caption: "Trait" },
  { code: "SS", caption: "Sickle cell" },
  { code: "SC", caption: "HbSC" },
  { code: "?", caption: "Not sure" },
];

// ---- Step 1 -------------------------------------------------------------------------------

export function StepRegister() {
  const { data, set } = useBookingStore();
  return (
    <div className="grid gap-[calc(22*var(--u))]">
      <div className="grid gap-3 @min-[401px]:grid-cols-2">
        <Field label="Your first name" required>
          <TextInput value={data.first1} onChange={(e) => set({ first1: e.target.value })} placeholder="e.g. Jane" autoComplete="given-name" />
        </Field>
        <Field label="Your last name" required>
          <TextInput value={data.last1} onChange={(e) => set({ last1: e.target.value })} placeholder="e.g. Doe" autoComplete="family-name" />
        </Field>
      </div>
      <div className="grid gap-3 @min-[401px]:grid-cols-2">
        <Field label="Partner's first name" required>
          <TextInput value={data.first2} onChange={(e) => set({ first2: e.target.value })} placeholder="e.g. John" />
        </Field>
        <Field label="Partner's last name" required>
          <TextInput value={data.last2} onChange={(e) => set({ last2: e.target.value })} placeholder="e.g. Doe" />
        </Field>
      </div>
      <div className="grid items-start gap-[calc(18*var(--u))] @min-[401px]:grid-cols-2">
        <div className="grid min-w-0 gap-1.25">
          <span className="text-micro text-muted">
            WhatsApp number<span className="text-[#e5532d]"> *</span>
          </span>
          <div className="grid grid-cols-[116px_1fr] gap-2">
            <SelectInput aria-label="Country code" value={data.dial} onChange={(v) => set({ dial: v })} options={DIAL_CODES} placeholder="+" className="w-29" optionIcon={dialFlagIcon} />
            <TextInput type="tel" inputMode="tel" value={data.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="803 000 0000" autoComplete="tel-national" aria-label="WhatsApp number" />
          </div>
        </div>
        <Field label="Relationship" required>
          <SelectInput value={data.relationship} onChange={(v) => set({ relationship: v })} options={RELATIONSHIPS} placeholder="Select an option" />
        </Field>
      </div>
      <Field label="Email address" required>
        <TextInput type="email" value={data.email} onChange={(e) => set({ email: e.target.value })} placeholder="you@example.com" autoComplete="email" />
      </Field>
    </div>
  );
}

// ---- Step 2 -------------------------------------------------------------------------------

const GENO_NAME: Record<string, string> = {
  AA: "No sickle cell, no trait",
  AS: "Trait (carrier)",
  AC: "Trait (carrier)",
  SS: "Sickle cell disease",
  SC: "HbSC disease",
  CC: "HbCC (mild)",
};

function alleles(g: Genotype): string[] | null {
  return g === "?" ? null : g === "SC" ? ["S", "C"] : g === "SS" ? ["S", "S"] : g === "AS" ? ["A", "S"] : ["A", "C"];
}

/** Chance of each genotype in a child, from the two parents' genotypes (one allele from each). */
function odds(g1: Genotype, g2: Genotype) {
  const a = alleles(g1), b = alleles(g2);
  if (!a || !b) return null;
  const order = "ASC";
  const tally: Record<string, number> = {};
  for (const x of a)
    for (const y of b) {
      const key = [x, y].sort((p, q) => order.indexOf(p) - order.indexOf(q)).join("");
      tally[key] = (tally[key] ?? 0) + 25;
    }
  return Object.entries(tally);
}

const GENOTYPE_LABEL = (g: { code: Genotype; caption: string }) => `${g.code} · ${g.caption}`;

// A dropdown of the five genotypes ("AS · Trait", ...). The stored value is just the code.
function GenotypePicker({ label, value, onPick }: { label: string; value: Genotype | ""; onPick: (g: Genotype) => void }) {
  const current = GENOTYPES.find((g) => g.code === value);
  return (
    <Field label={label} required>
      <SelectInput
        aria-label={label}
        value={current ? GENOTYPE_LABEL(current) : ""}
        onChange={(v) => {
          const hit = GENOTYPES.find((g) => GENOTYPE_LABEL(g) === v);
          if (hit) onPick(hit.code);
        }}
        options={GENOTYPES.map(GENOTYPE_LABEL)}
        placeholder="Select a genotype"
      />
    </Field>
  );
}

export function StepGenotypes() {
  const { data, set } = useBookingStore();
  const result = data.geno1 && data.geno2 ? odds(data.geno1, data.geno2) : null;

  return (
    <div className="grid gap-[calc(22*var(--u))]">

      <div className="grid gap-3 @min-[401px]:grid-cols-2">
        <GenotypePicker label="Your genotype" value={data.geno1} onPick={(g) => set({ geno1: g })} />
        <GenotypePicker label="Your partner's genotype" value={data.geno2} onPick={(g) => set({ geno2: g })} />
      </div>
      {result && (
        <div className="noura-msg rounded-[10px] border border-brand/40 bg-brand/8 p-[1em]">
          <div className="mb-[0.6em] text-hero-sub font-semibold">Odds for each pregnancy</div>
          <ul className="grid gap-[0.4em] text-hero-sub">
            {result.map(([geno, pct]) => (
              <li key={geno} className="flex items-center justify-between gap-3">
                <span>
                  <strong className="font-semibold">{geno}</strong> <span className="text-muted">· {GENO_NAME[geno]}</span>
                </span>
                <span className="font-bold text-accent">{pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-3 @min-[401px]:grid-cols-2">
        <Field label="Lab results" required>
          <SelectInput value={data.lab} onChange={(v) => set({ lab: v })} options={LAB_OPTIONS} placeholder="Select an option" />
        </Field>
        <Field label="Tried IVF before?" required>
          <SelectInput value={data.ivf} onChange={(v) => set({ ivf: v })} options={IVF_OPTIONS} placeholder="Select an option" />
        </Field>
      </div>
      <div className="grid gap-3 @min-[401px]:grid-cols-2">
        <Field label="Female partner's age" required>
          <SelectInput value={data.age} onChange={(v) => set({ age: v })} options={AGES} placeholder="Select age" />
        </Field>
        <Field label="Children together already">
          <SelectInput value={data.children} onChange={(v) => set({ children: v })} options={CHILDREN} placeholder="Select an option" />
        </Field>
      </div>
    </div>
  );
}

// ---- Step 3 -------------------------------------------------------------------------------

export function StepLocation() {
  const { data, set } = useBookingStore();
  return (
    <div className="grid gap-3.5">
      <Field label="Street address" required>
        <TextInput value={data.street} onChange={(e) => set({ street: e.target.value })} placeholder="House number and street name" autoComplete="street-address" />
      </Field>
      <div className="grid gap-3 @min-[401px]:grid-cols-2">
        <Field label="City or town" required>
          <TextInput value={data.city} onChange={(e) => set({ city: e.target.value })} autoComplete="address-level2" />
        </Field>
        <Field label="Postal code" optional>
          <TextInput value={data.postal} onChange={(e) => set({ postal: e.target.value })} autoComplete="postal-code" />
        </Field>
      </div>
      <div className="grid gap-3 @min-[401px]:grid-cols-2">
        <Field label="Country" required>
          <SelectInput value={data.country} onChange={(v) => set({ country: v })} options={COUNTRIES} placeholder="Choose your country" optionIcon={flagIcon} />
        </Field>
        <Field label="State, province or region" required>
          <TextInput value={data.state} onChange={(e) => set({ state: e.target.value })} placeholder="e.g. Lagos" autoComplete="address-level1" />
        </Field>
      </div>
    </div>
  );
}

// ---- Step 4 -------------------------------------------------------------------------------

const PLANS: { id: Counselling; title: string; sub: string; points: string[] }[] = [
  { id: "virtual", title: "Virtual", sub: "45 minute video call", points: ["From any country", "Written summary and plan"] },
  { id: "inperson", title: "In person", sub: "60 minutes, face to face", points: ["Results review included", "Venue confirmed when we book you"] },
  { id: "none", title: "No counselling", sub: "Go straight to procedures", points: ["For couples who've already been counselled"] },
];

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromIso = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export function formatDate(s: string) {
  const d = fromIso(s);
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function Calendar({ value, onPick }: { value: string; onPick: (iso: string) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstOk = new Date(today);
  firstOk.setDate(firstOk.getDate() + 2); // today and tomorrow are taken
  const start = value ? fromIso(value) : today;
  const [view, setView] = useState({ y: start.getFullYear(), m: start.getMonth() });
  const [months, setMonths] = useState(false); // the title opens a list of the next 12 months

  const first = new Date(view.y, view.m, 1);
  const lead = (first.getDay() + 6) % 7; // Monday first
  const count = new Date(view.y, view.m + 1, 0).getDate();
  const atCurrent = view.y === today.getFullYear() && view.m === today.getMonth();
  const shift = (by: number) => {
    const d = new Date(view.y, view.m + by, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };

  const arrow = "flex size-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-brand/15 hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit";

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-expanded={months}
          onClick={() => setMonths((v) => !v)}
          className="flex min-h-9 cursor-pointer items-center gap-[0.4em] rounded-lg px-1 text-hero-sub font-semibold transition-colors hover:text-accent"
        >
          {MONTHS[view.m]} {view.y}
          <LuChevronDown aria-hidden="true" className={`transition-transform duration-200 ${months ? "rotate-180" : ""}`} />
        </button>
        <div className="flex gap-1">
          <button type="button" aria-label="Previous month" disabled={atCurrent} onClick={() => shift(-1)} className={arrow}>
            <LuChevronLeft aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next month" onClick={() => shift(1)} className={arrow}>
            <LuChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
      {months ? (
        <div className="book-pop grid grid-cols-3 gap-1.5">
          {Array.from({ length: 12 }, (_, i) => {
            const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
            const on = d.getFullYear() === view.y && d.getMonth() === view.m;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setView({ y: d.getFullYear(), m: d.getMonth() });
                  setMonths(false);
                }}
                className={`min-h-11 cursor-pointer rounded-lg border text-hero-sub transition-colors ${on ? `${chosen} font-semibold` : "border-transparent hover:bg-brand/10"}`}
              >
                {MONTHS[d.getMonth()].slice(0, 3)}
                {d.getFullYear() !== today.getFullYear() && <span className="block text-hero-sub text-muted">{d.getFullYear()}</span>}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1 text-center">
          {DAYS.map((d) => (
            <span key={d} className="pb-1.5 text-hero-sub font-semibold text-muted">
              {d}
            </span>
          ))}
          {Array.from({ length: lead }).map((_, i) => (
            <span key={`b${i}`} />
          ))}
          {Array.from({ length: count }).map((_, i) => {
            const d = new Date(view.y, view.m, i + 1);
            const key = iso(d);
            const off = d < firstOk || d.getDay() === 0;
            const on = value === key;
            const isToday = d.getTime() === today.getTime();
            return (
              <button
                key={key}
                type="button"
                disabled={off}
                aria-pressed={on}
                aria-label={formatDate(key)}
                onClick={() => onPick(key)}
                className={`relative mx-auto flex aspect-square w-full max-w-11 min-w-7 cursor-pointer items-center justify-center rounded-lg text-hero-sub font-medium transition-colors disabled:cursor-not-allowed disabled:text-ink/20 ${
                  on ? "bg-brand font-bold text-[#07110c]" : "hover:bg-brand/15"
                }`}
              >
                {i + 1}
                {isToday && <span aria-hidden="true" className="absolute bottom-[10%] size-1 rounded-full bg-[#f5a524]" />}
              </button>
            );
          })}
        </div>
      )}
      <p className="mt-3 flex items-center gap-[0.5em] text-hero-sub text-muted">
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#f5a524]" />
        Today · Sundays and the next 2 days are unavailable
      </p>
    </div>
  );
}

// Half hour slots: morning 8:00 to 12:00, afternoon 12:00 to 5:00.
type Slot = { hour: number; minute: 0 | 30; ampm: "AM" | "PM" };
const SLOT_GROUPS: { name: string; range: string; slots: Slot[] }[] = [
  {
    name: "Morning",
    range: "8:00 AM to 12:00 PM",
    slots: [8, 9, 10, 11].flatMap((hour) => ([0, 30] as const).map((minute) => ({ hour, minute, ampm: "AM" as const }))),
  },
  {
    name: "Afternoon",
    range: "12:00 PM to 5:00 PM",
    slots: [12, 1, 2, 3, 4].flatMap((hour) => ([0, 30] as const).map((minute) => ({ hour, minute, ampm: "PM" as const }))),
  },
];

function Slots() {
  const { data, set } = useBookingStore();
  const tz = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "";
  const hasDate = !!data.date;

  return (
    <div>
      <p className="font-heading text-lead font-medium leading-tight">{hasDate ? formatDate(data.date) : "Pick a date first"}</p>
      <p className="mt-1 text-hero-sub text-muted">Your time zone: {tz || "local"}</p>
      <div className={`mt-4 grid gap-5 ${hasDate ? "" : "pointer-events-none opacity-40"}`}>
        {SLOT_GROUPS.map((g) => (
          <div key={g.name}>
            <div className="mb-2 flex items-baseline justify-between gap-3 border-b border-ink/10 pb-2">
              <h4 className="font-heading text-hero-sub font-semibold">{g.name}</h4>
              <span className="text-hero-sub text-muted">{g.range}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 @min-[401px]:grid-cols-4">
              {g.slots.map((sl) => {
                const on = data.hour === sl.hour && data.minute === sl.minute && data.ampm === sl.ampm;
                return (
                  <button
                    key={`${sl.hour}${sl.minute}${sl.ampm}`}
                    type="button"
                    disabled={!hasDate}
                    aria-pressed={on}
                    onClick={() => set({ hour: sl.hour, minute: sl.minute, ampm: sl.ampm })}
                    className={`h-10 cursor-pointer rounded-lg text-hero-sub font-medium transition-colors ${
                      on ? "bg-brand font-bold text-[#07110c]" : "bg-ink/6 hover:bg-brand/15"
                    }`}
                  >
                    {sl.hour}:{pad(sl.minute)} {sl.ampm}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function formatTime(d: { hour: number | null; minute: number; ampm: string }) {
  return d.hour === null ? "" : `${d.hour}:${pad(d.minute)} ${d.ampm}`;
}

function Toggle({ on, onChange, children }: { on: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex w-full cursor-pointer items-center gap-[0.9em] rounded-[10px] border border-ink/10 bg-bg px-[1em] py-[0.85em] text-left text-hero-sub leading-snug transition-colors hover:border-ink/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
    >
      <span className="min-w-0 flex-1">{children}</span>
      <span aria-hidden="true" className={`relative h-[1.6em] w-[2.8em] shrink-0 rounded-full transition-colors ${on ? "bg-brand" : "bg-ink/15"}`}>
        <span className={`absolute left-[0.2em] top-[0.2em] size-[1.2em] rounded-full bg-white shadow transition-transform ${on ? "translate-x-[1.2em]" : ""}`} />
      </span>
    </button>
  );
}

export function StepBook() {
  const { data, set, toggleProcedure, togglePackage } = useBookingStore();
  const router = useRouter();
  const showQuestion = useFaqStore((s) => s.showQuestion);
  const pkgOn = PACKAGE_IDS.every((id) => data.procedures.includes(id));

  return (
    <div className="grid gap-[calc(26*var(--u))]">
      {/* Counselling */}
      <section className="grid gap-[calc(12*var(--u))]">
        <h3 className="flex items-center gap-[0.6em] font-heading text-hero-sub font-semibold">
          <span>
            Counselling<span className="text-[#e5532d]"> *</span>
          </span>
        </h3>
        <div role="radiogroup" aria-label="Counselling" className="grid gap-[calc(10*var(--u))] @xl:grid-cols-3">
          {PLANS.map((p) => {
            const on = data.counselling === p.id;
            const dark = p.id === "none";
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => set({ counselling: p.id })}
                className={`relative grid cursor-pointer content-start gap-[0.5em] rounded-[14px] border p-[1em] text-left text-hero-sub transition-all duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                  dark ? "border-transparent bg-[#0f1a14] text-white" : on ? chosen : "border-ink/15 bg-bg hover:border-brand"
                } ${dark && on ? "ring-2 ring-brand" : ""}`}
              >
                <span className="flex items-start justify-between">
                  
                  <Tick on={on} />
                </span>
                {dark && <span className="w-fit rounded-full bg-[#f5a524] px-[0.8em] py-[0.15em] text-hero-sub font-bold text-[#0f1a14]">Skip counselling</span>}
                <span className="font-heading text-lead font-medium">{p.title}</span>
                <span className="font-heading text-h3 font-medium">
                  <Money ngn={COUNSELLING_NGN[p.id]} />
                </span>
                <span className={dark ? "text-white/70" : "text-muted"}>{p.sub}</span>
                <ul className="mt-[0.3em] grid gap-[0.3em] text-hero-sub">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-[0.6em]">
                      <span aria-hidden="true" className={`mt-[0.45em] size-1.5 shrink-0 rounded-full ${dark ? "bg-[#f5a524]" : "bg-brand"}`} />
                      <span className={dark ? "text-white/80" : ""}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </section>

      {/* Procedures */}
      <section className="grid gap-[calc(12*var(--u))]">
        <div className="flex flex-wrap items-center justify-between gap-[calc(10*var(--u))]">
          <h3 className="flex items-center gap-[0.6em] font-heading text-hero-sub font-semibold">
            Procedures
            <span className="rounded-full border border-ink/10 px-[0.7em] py-[0.1em] text-hero-sub font-normal text-muted">Optional</span>
          </h3>
          <button
            type="button"
            aria-pressed={pkgOn}
            onClick={togglePackage}
            className={`flex min-h-10 cursor-pointer items-center gap-[0.6em] rounded-full px-[1em] py-[0.4em] text-hero-sub font-semibold transition-colors ${
              pkgOn ? `border ${chosen}` : "border border-transparent bg-ink/75 text-bg hover:bg-ink"
            }`}
          >
            Full treatment package · <Money ngn={PACKAGE_NGN} />
          </button>
        </div>

        <ul className="grid gap-[calc(10*var(--u))]">
          {PROCEDURES.map((p) => {
            const on = data.procedures.includes(p.id);
            const locked = !!p.needs && !data.procedures.includes(p.needs);
            return (
              <li key={p.id}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  disabled={locked}
                  onClick={() => toggleProcedure(p.id)}
                  className={`flex w-full items-center gap-[0.9em] rounded-xl border p-[0.9em] text-left text-hero-sub transition-all duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                    locked ? "cursor-not-allowed border-ink/8 bg-bg opacity-45" : on ? `cursor-pointer ${chosen}` : "cursor-pointer border-ink/15 bg-bg hover:border-brand"
                  }`}
                >
                  
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{p.name}</span>
                    <span className="block text-muted">{p.description}</span>
                    <span className="mt-[0.2em] flex items-center gap-[0.4em] text-hero-sub text-muted">
                      {p.time}
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block font-bold">
                      <Money ngn={p.ngn} />
                    </span>
                    <span className="block text-hero-sub font-medium uppercase tracking-wide text-muted">{p.estimate ? "Estimate" : "Fixed price"}</span>
                  </span>
                  <Tick on={on} />
                </button>
              </li>
            );
          })}
        </ul>
        <p className="rounded-[10px] border border-[#f5a524]/40 bg-[#f5a524]/10 px-[1em] py-[0.7em] text-hero-sub leading-snug">
          Treatment can only start once your genotypes are confirmed. Book the genotype test (or counselling) first.
        </p>
      </section>

      {/* Date and time: the calendar on the left, the day's time slots on the right. */}
      <section className="grid gap-3">
        <h3 className="font-heading text-hero-sub font-semibold">
          {data.counselling === "none" ? "Choose a date and time" : "Choose a date and time for counselling"}
          <span className="text-[#e5532d]"> *</span>
        </h3>
        <div className="grid gap-3 @xl:grid-cols-2">
          <div className="min-w-0 rounded-[18px] border border-ink/10 bg-ink/3 p-4">
            <Calendar value={data.date} onPick={(d) => set({ date: d })} />
          </div>
          <div className="min-w-0 rounded-[18px] border border-ink/10 bg-ink/3 p-4">
            <Slots />
          </div>
        </div>
      </section>

      {/* Consent */}
      <section className="grid gap-[calc(10*var(--u))]">
        <h3 className="font-heading text-hero-sub font-semibold">
          Consent<span className="text-[#e5532d]"> *</span>
        </h3>
        <Toggle on={data.consentCare} onChange={(v) => set({ consentCare: v })}>
          AwaDoc may process our genotype and health information to support our care.
        </Toggle>
        <Toggle on={data.consentShare} onChange={(v) => set({ consentShare: v })}>
          AwaDoc may share our file with IMSA. My partner knows I&apos;m booking for us.
        </Toggle>
        <button
          type="button"
          onClick={() => {
            showQuestion("data");
            router.push("/");
          }}
          className="flex w-fit cursor-pointer items-center gap-[0.5em] text-hero-sub font-semibold text-accent underline underline-offset-4"
        >
          Read how we protect your data
        </button>
      </section>
    </div>
  );
}

// ---- Step 5 -------------------------------------------------------------------------------

const fileSize = (bytes: number) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1048576).toFixed(1)} MB`);

// A report slot. There is no server yet, so the progress bar only shows how the upload will look.
function UploadTile({ name, file, onPick }: { name: string; file: string; onPick: (f: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [info, setInfo] = useState<{ size: number; loaded: number } | null>(null);
  const [error, setError] = useState("");
  const uploading = !!info && info.loaded < info.size;

  useEffect(() => {
    if (!uploading) return;
    const tick = window.setInterval(
      () => setInfo((i) => (i ? { ...i, loaded: Math.min(i.size, i.loaded + Math.max(i.size * 0.14, 4096)) } : i)),
      160,
    );
    return () => window.clearInterval(tick);
  }, [uploading]);

  const choose = (f?: File) => {
    if (!f) return;
    if (!/\.(pdf|jpe?g|png)$/i.test(f.name) || f.size > 20 * 1024 * 1024) {
      setError("Only PDF, JPEG or PNG files, up to 20 MB.");
      return;
    }
    setError("");
    setInfo({ size: Math.max(f.size, 1), loaded: 0 });
    onPick(f.name);
  };
  const remove = () => {
    setInfo(null);
    onPick("");
  };
  const isPdf = /\.pdf$/i.test(file);

  return (
    <div className="grid content-start gap-[calc(6*var(--u))]">
      <input
        ref={ref}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,image/*"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          choose(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {file && info ? (
        <div className={`flex min-h-[calc(84*var(--u))] items-center gap-[0.9em] rounded-[10px] border p-[0.9em] text-hero-sub ${uploading ? "border-ink/15 bg-bg" : chosen}`}>
          <span className={`flex size-[2.6em] shrink-0 items-center justify-center rounded-lg text-hero-sub font-bold ${isPdf ? "bg-[#fdecec] text-[#b23a3f]" : "bg-brand/15 text-accent"}`}>
            {isPdf ? "PDF" : "IMG"}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-semibold text-ink">{file}</span>
            <span className="flex flex-wrap items-center gap-x-[0.4em] text-hero-sub text-muted">
              <span>
                {fileSize(info.loaded)} of {fileSize(info.size)}
              </span>
              <span aria-hidden="true">·</span>
              {uploading ? (
                <span>Uploading...</span>
              ) : (
                <span className="flex items-center gap-[0.3em] font-semibold text-accent">
                  <LuCheck aria-hidden="true" /> Completed
                </span>
              )}
            </span>
            {uploading && (
              <span aria-hidden="true" className="mt-[0.4em] block h-1 overflow-hidden rounded-full bg-ink/10">
                <span className="block h-full rounded-full bg-brand transition-[width] duration-150" style={{ width: `${(info.loaded / info.size) * 100}%` }} />
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={remove}
            aria-label={uploading ? `Cancel ${file}` : `Remove ${file}`}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-[#fdecec] hover:text-[#b23a3f]"
          >
            {uploading ? <LuX aria-hidden="true" /> : <LuTrash2 aria-hidden="true" />}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="flex min-h-[calc(84*var(--u))] w-full cursor-pointer items-center gap-[0.9em] rounded-[10px] border border-dashed border-ink/25 bg-bg p-[0.9em] text-left text-hero-sub transition-colors hover:border-brand hover:bg-brand/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        >
          
          <span className="min-w-0 flex-1">
            <span className="block truncate font-semibold">{name}&apos;s report</span>
            <span className="block truncate text-muted">Tap to upload a photo or PDF</span>
          </span>
        </button>
      )}
      {error && <em className="text-hero-sub not-italic text-[#b23a3f]">{error}</em>}
    </div>
  );
}

export function StepLabs() {
  const { data, set } = useBookingStore();
  const router = useRouter();
  const showQuestion = useFaqStore((s) => s.showQuestion);
  const first = (n: string, fallback: string) => n.trim().split(/\s+/)[0] || fallback;
  const embryo = data.procedures.includes("pgtm");

  return (
    <div className="grid gap-[calc(18*var(--u))]">
      <section className="grid gap-[calc(12*var(--u))]">
        <h3 className="flex flex-wrap items-center gap-[0.6em] font-heading text-hero-sub font-semibold">
          Genotype lab reports
          <span className="rounded-full border border-ink/10 px-[0.7em] py-[0.1em] text-hero-sub font-normal text-muted">Recommended</span>
        </h3>
        <div className="grid gap-[calc(10*var(--u))] @min-[401px]:grid-cols-2">
          <UploadTile name={data.first1.trim() || "Your"} file={data.report1} onPick={(f) => set({ report1: f })} />
          <UploadTile name={data.first2.trim() || "Partner's"} file={data.report2} onPick={(f) => set({ report2: f })} />
        </div>
        <p className="text-hero-sub leading-relaxed text-muted">
          Photo or PDF of a haemoglobin electrophoresis or HPLC report, up to 20 MB each. No report yet? Skip this; we&apos;ll arrange your test.
        </p>
        <button
          type="button"
          onClick={() => {
            showQuestion("data");
            router.push("/");
          }}
          className="flex w-fit cursor-pointer items-center gap-[0.5em] text-hero-sub font-semibold text-accent underline underline-offset-4"
        >
          How we protect your reports
        </button>
      </section>

      <Notice>
        {embryo
          ? "Embryo testing starts with a custom DNA test. We'll arrange sample collection after payment."
          : "Embryo test preparation only applies if you book embryo testing. You can go straight to payment."}
      </Notice>
    </div>
  );
}

// ---- Step 6 -------------------------------------------------------------------------------

const PAY_OPTIONS: { id: PayMethod; title: string; sub: string; }[] = [
  { id: "card", title: "Debit or credit card", sub: "Visa, Mastercard, Verve, American Express" },
  { id: "transfer", title: "Bank transfer", sub: "Pay into your own one time account number" },
  { id: "momo", title: "Mobile money", sub: "OPay, PalmPay, MoMo PSB (MTN)" },
];

export function counsellingLabel(c: string) {
  return c === "virtual" ? "Virtual counselling" : c === "inperson" ? "In person counselling" : "";
}

export function StepPay() {
  const { data, set, reference } = useBookingStore();
  const total = totalNgn(data);
  const lines: [string, number][] = [];
  if (data.counselling && data.counselling !== "none") lines.push([counsellingLabel(data.counselling), COUNSELLING_NGN[data.counselling]]);
  for (const p of PROCEDURES) if (data.procedures.includes(p.id)) lines.push([p.name, p.ngn]);
  const couple = `${data.first1.trim() || "—"} & ${data.first2.trim() || "—"}`;
  const when = data.date ? `${formatDate(data.date)} · ${formatTime(data)}` : "—";

  return (
    <div className="grid gap-[calc(22*var(--u))]">
      <div className="overflow-hidden rounded-[14px] bg-[#0b1511] p-[calc(20*var(--u))] text-white shadow-[inset_0_0_80px_-30px_#0a7a5a]">
        <div className="text-hero-sub font-bold uppercase tracking-[0.14em] text-brand">Amount due</div>
        <div className="mt-[0.3em] font-heading text-display font-medium leading-none [-webkit-text-stroke:0.015em_currentColor]">
          <Money ngn={total} />
        </div>
        <dl className="mt-[1em] grid divide-y divide-white/12 border-t border-white/12 text-hero-sub">
          {lines.map(([name, ngn]) => (
            <div key={name} className="flex justify-between gap-3 py-[0.7em]">
              <dt className="text-white/75">{name}</dt>
              <dd className="shrink-0 font-semibold">
                <Money ngn={ngn} />
              </dd>
            </div>
          ))}
          {[
            ["Couple", couple],
            ["Counselling", when],
            ["Reference", reference],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 py-[0.7em]">
              <dt className="text-white/75">{k}</dt>
              <dd className="min-w-0 text-right font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="grid gap-[calc(10*var(--u))]">
        <h3 className="font-heading text-hero-sub font-semibold">
          Pay with<span className="text-[#e5532d]"> *</span>
        </h3>
        <div role="radiogroup" aria-label="Pay with" className="grid gap-[calc(10*var(--u))]">
          {PAY_OPTIONS.map((o) => {
            const on = data.pay === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => set({ pay: o.id })}
                className={`flex w-full cursor-pointer items-center gap-[0.9em] rounded-xl border p-[0.9em] text-left text-hero-sub transition-all duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                  on ? chosen : "border-ink/15 bg-bg hover:border-brand"
                }`}
              >
                
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{o.title}</span>
                  <span className="block text-muted">{o.sub}</span>
                </span>
                <Tick on={on} />
              </button>
            );
          })}
        </div>
      </section>

      <Notice>
        Payments are processed by a licensed payment partner. AwaDoc never sees your card number. Cards and transfers from any country are charged in naira and converted by your bank.
      </Notice>
    </div>
  );
}

// ---- Confirmed ----------------------------------------------------------------------------

export function StepDone() {
  const { data, reference } = useBookingStore();
  const total = totalNgn(data);
  const first = (n: string, fallback: string) => n.trim().split(/\s+/)[0] || fallback;
  const rows: [string, string][] = [
    ["Couple", `${data.first1.trim() || "—"} & ${data.first2.trim() || "—"}`],
    ["Appointment", data.date ? `${formatDate(data.date)} · ${formatTime(data)}` : "—"],
  ];
  return (
    <div className="grid justify-items-center gap-[calc(14*var(--u))] py-[calc(16*var(--u))] text-center">
      <span className="book-pop flex size-[calc(72*var(--u))] min-h-16 min-w-16 items-center justify-center rounded-full bg-brand text-[#07110c]">
        <LuCheck aria-hidden="true" className="size-1/2" />
      </span>
      <p className="max-w-[26em] text-hero-sub leading-relaxed text-muted">
        <strong className="font-semibold text-ink">
          {data.first1.trim() || "You"} &amp; {data.first2.trim() || "partner"}
        </strong>
        , your booking is in.
      </p>
      <div className="grid justify-items-center gap-[0.4em]">
        <small className="text-hero-sub uppercase tracking-[0.14em] text-muted">Booking reference</small>
        <span className="rounded-full border border-brand/55 bg-brand/10 px-[1.2em] py-[0.4em] font-mono text-hero-sub font-bold tracking-wider text-accent">{reference}</span>
      </div>
      <dl className="w-full max-w-[26em] divide-y divide-ink/10 rounded-[10px] border border-ink/10 text-left text-hero-sub">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 px-[1em] py-[0.7em]">
            <dt className="text-muted">{k}</dt>
            <dd className="text-right font-semibold">{v}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-3 px-[1em] py-[0.7em]">
          <dt className="text-muted">Total</dt>
          <dd className="font-semibold">
            <Money ngn={total} />
          </dd>
        </div>
      </dl>
      <Notice>
        Payments and emails aren&apos;t connected yet, so nothing was charged and nothing was sent to {data.email || "your email"}.
      </Notice>
    </div>
  );
}

// Keep the shared input style importable for any step that needs a bare input.
export { inputBase };
