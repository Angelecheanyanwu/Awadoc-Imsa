import { create } from "zustand";

export type Role = "assistant" | "user";

export interface NouraMessage {
  id: number;
  role: Role;
  text: string;
}

export const GREETING =
  "Hi, I'm Noura. Ask me anything about genotypes, IVF, embryo testing or booking here.";

export const SUGGESTIONS = [
  "What does AS + AS mean for our children?",
  "What is PGT-M, simply?",
];

// Placeholder until Noura is connected to a real answer source (see send()).
const PLACEHOLDER_REPLY =
  "Thanks for your question. I'm not connected to live answers yet, so I can't reply properly.";

interface NouraState {
  open: boolean;
  typing: boolean;
  messages: NouraMessage[];
  openChat: () => void;
  closeChat: () => void;
  send: (text: string) => void;
}

let nextId = 2;

export const useNouraStore = create<NouraState>((set, get) => ({
  open: false,
  typing: false,
  messages: [{ id: 1, role: "assistant", text: GREETING }],
  openChat: () => set({ open: true }),
  closeChat: () => set({ open: false }),
  send: (raw) => {
    const text = raw.trim();
    if (!text || get().typing) return;
    set((s) => ({
      messages: [...s.messages, { id: nextId++, role: "user", text }],
      typing: true,
    }));
    // Swap this timeout for a call to the real assistant (e.g. a /api/noura route).
    setTimeout(() => {
      set((s) => ({
        messages: [...s.messages, { id: nextId++, role: "assistant", text: PLACEHOLDER_REPLY }],
        typing: false,
      }));
    }, 900);
  },
}));
