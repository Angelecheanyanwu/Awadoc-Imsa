import { create } from "zustand";

export type Role = "assistant" | "user";

export interface NouraMessage {
  id: number;
  role: Role;
  text: string;
}

export const GREETING = "Hi, I'm Noura. Tap one of the questions below and I'll explain.";

// The questions people can ask, each with its ready-made answer. Noura has no free typing yet: tapping a
// question sends it, and the answer types itself out.
export const QUESTIONS: { question: string; answer: string }[] = [
  {
    question: "AS + AS: Our kids’ risk",
    answer:
      "When both partners are AS, each pregnancy has a 25% chance of a child with sickle cell disease (SS), a 50% chance of a child with the trait (AS), and a 25% chance of a child with no sickle cell gene (AA). IVF with embryo testing (PGTM) can check each embryo first, so only embryos without sickle cell disease are transferred.",
  },
  {
    question: "What is PGTM, simply?",
    answer:
      "PGTM checks embryos made through IVF for one inherited condition, such as sickle cell disease. A custom test is built from your family's own DNA. A few cells are taken from each embryo on day 5 or 6 and tested, and only embryos without the condition are transferred. It doesn't change an embryo's genes. It is very accurate but not perfect, so a confirmatory test during pregnancy is still advised.",
  },
  {
    question: "How long does treatment take?",
    answer:
      "It depends on the steps you need. A genotype test gives results in 2 to 5 days. Building your custom DNA test takes about 3 to 6 weeks before IVF starts. An IVF cycle then takes 2 to 3 weeks, and embryo testing another 1 to 3 weeks. A frozen embryo transfer follows. Your doctor confirms the exact timing at your assessment.",
  },
  {
    question: "Do we need counselling first?",
    answer:
      "Only if you both have lab confirmed genotypes, you understand the IVF process, and you're ready for the cost. If not, add counselling to your booking. Treatment can only start once your genotypes are confirmed, so book the genotype test or counselling first.",
  },
];

interface NouraState {
  open: boolean;
  /** True from the moment a question is sent until its answer has finished typing. */
  typing: boolean;
  messages: NouraMessage[];
  openChat: () => void;
  closeChat: () => void;
  ask: (index: number) => void;
}

let nextId = 2;
let timers: number[] = [];

export const useNouraStore = create<NouraState>((set, get) => ({
  open: false,
  typing: false,
  messages: [{ id: 1, role: "assistant", text: GREETING }],
  openChat: () => set({ open: true }),
  closeChat: () => set({ open: false }),
  ask: (index) => {
    const item = QUESTIONS[index];
    if (!item || get().typing) return;
    set((s) => ({
      messages: [...s.messages, { id: nextId++, role: "user", text: item.question }],
      typing: true,
    }));

    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A short pause with the three bouncing dots, then the answer types itself out letter by letter.
    const start = window.setTimeout(() => {
      const id = nextId++;
      if (reduce) {
        set((s) => ({ messages: [...s.messages, { id, role: "assistant", text: item.answer }], typing: false }));
        return;
      }
      set((s) => ({ messages: [...s.messages, { id, role: "assistant", text: "" }] }));
      let shown = 0;
      const tick = window.setInterval(() => {
        shown = Math.min(item.answer.length, shown + 2);
        set((s) => ({ messages: s.messages.map((m) => (m.id === id ? { ...m, text: item.answer.slice(0, shown) } : m)) }));
        if (shown >= item.answer.length) {
          window.clearInterval(tick);
          set({ typing: false });
        }
      }, 22);
      timers.push(tick);
    }, 700);
    timers.push(start);
  },
}));
