import { create } from "zustand";

export type Genotype = "AS" | "AC" | "SS" | "SC" | "?";
export type Counselling = "virtual" | "inperson" | "none";
export type PayMethod = "card" | "transfer" | "momo";

export const TOTAL_STEPS = 6;

export interface Procedure {
  id: string;
  name: string;
  description: string;
  time: string;
  ngn: number;
  estimate: boolean;
  /** Needs this procedure to be chosen first. */
  needs?: string;
}

// Prices are in naira; they are converted for display like everywhere else on the site.
export const PROCEDURES: Procedure[] = [
  { id: "genotype", name: "Genotype confirmation test", description: "Lab test for both partners, before any treatment", time: "Results in 2–5 days", ngn: 30_000, estimate: false },
  { id: "ivf", name: "IVF cycle", description: "Monitoring scans, egg collection, ICSI and embryo culture", time: "2–3 weeks", ngn: 2_900_000, estimate: true },
  { id: "meds", name: "Fertility medication", description: "Hormone injections for one cycle (typical cost)", time: "10–14 days · needs IVF cycle", ngn: 1_600_000, estimate: true, needs: "ivf" },
  { id: "pgtm", name: "Embryo testing (PGT-M)", description: "Custom test from your DNA, embryo biopsy and sickle cell test", time: "1–3 weeks · needs IVF cycle", ngn: 2_500_000, estimate: true, needs: "ivf" },
  { id: "fet", name: "Frozen embryo transfer", description: "Transfer of an unaffected embryo, then a pregnancy test", time: "One cycle · needs embryo testing", ngn: 500_000, estimate: true, needs: "pgtm" },
];

export const PACKAGE_IDS = ["ivf", "meds", "pgtm", "fet"];
export const PACKAGE_NGN = 7_500_000;

export const COUNSELLING_NGN: Record<Counselling, number> = { virtual: 50_000, inperson: 80_000, none: 0 };

export interface BookingData {
  first1: string;
  last1: string;
  first2: string;
  last2: string;
  email: string;
  dial: string;
  phone: string;
  relationship: string;
  geno1: Genotype | "";
  geno2: Genotype | "";
  lab: string;
  age: string;
  ivf: string;
  children: string;
  country: string;
  state: string;
  street: string;
  city: string;
  postal: string;
  counselling: Counselling | "";
  procedures: string[];
  date: string; // YYYY-MM-DD
  hour: number | null; // 1-12
  ampm: "AM" | "PM";
  minute: 0 | 30;
  consentCare: boolean;
  consentShare: boolean;
  report1: string;
  report2: string;
  pay: PayMethod;
}

const EMPTY: BookingData = {
  first1: "",
  last1: "",
  first2: "",
  last2: "",
  email: "",
  dial: "+234",
  phone: "",
  relationship: "",
  geno1: "",
  geno2: "",
  lab: "",
  age: "",
  ivf: "",
  children: "None",
  country: "",
  state: "",
  street: "",
  city: "",
  postal: "",
  counselling: "",
  procedures: [],
  date: "",
  hour: null,
  ampm: "AM",
  minute: 0,
  consentCare: false,
  consentShare: false,
  report1: "",
  report2: "",
  pay: "card",
};

function newReference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `AWD-${out}`;
}

export function totalNgn(d: BookingData) {
  const c = d.counselling ? COUNSELLING_NGN[d.counselling] : 0;
  const p = PROCEDURES.filter((x) => d.procedures.includes(x.id)).reduce((sum, x) => sum + x.ngn, 0);
  return c + p;
}

interface BookingState {
  open: boolean;
  step: number; // 1..6, 7 = confirmed
  /** Which way the last step change went, so the page slides in from the right side. */
  dir: "forward" | "back";
  data: BookingData;
  reference: string;
  openBooking: () => void;
  closeBooking: () => void;
  set: (patch: Partial<BookingData>) => void;
  toggleProcedure: (id: string) => void;
  togglePackage: () => void;
  next: () => void;
  back: () => void;
  goTo: (step: number) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  open: false,
  step: 1,
  dir: "forward",
  data: EMPTY,
  reference: newReference(),
  openBooking: () => set({ open: true }),
  closeBooking: () => set({ open: false }),
  set: (patch) => set((s) => ({ data: { ...s.data, ...patch } })),
  toggleProcedure: (id) => {
    const { procedures } = get().data;
    let next: string[];
    if (procedures.includes(id)) {
      // Removing a procedure also removes everything that depends on it.
      const drop = new Set([id]);
      let grew = true;
      while (grew) {
        grew = false;
        for (const p of PROCEDURES) {
          if (p.needs && drop.has(p.needs) && !drop.has(p.id)) {
            drop.add(p.id);
            grew = true;
          }
        }
      }
      next = procedures.filter((x) => !drop.has(x));
    } else {
      next = [...procedures, id];
    }
    set((s) => ({ data: { ...s.data, procedures: next } }));
  },
  togglePackage: () => {
    const { procedures } = get().data;
    const all = PACKAGE_IDS.every((id) => procedures.includes(id));
    const next = all
      ? procedures.filter((id) => !PACKAGE_IDS.includes(id))
      : Array.from(new Set([...procedures, ...PACKAGE_IDS]));
    set((s) => ({ data: { ...s.data, procedures: next } }));
  },
  next: () => set((s) => ({ step: Math.min(s.step + 1, TOTAL_STEPS + 1), dir: "forward" })),
  back: () => set((s) => ({ step: Math.max(s.step - 1, 1), dir: "back" })),
  goTo: (step) => set((s) => ({ step, dir: step < s.step ? "back" : "forward" })),
  reset: () => set({ step: 1, dir: "forward", data: EMPTY, reference: newReference(), open: false }),
}));
