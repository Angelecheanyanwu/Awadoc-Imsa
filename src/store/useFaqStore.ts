import { create } from "zustand";

interface FaqState {
  /** The id of the open question, or null if all are closed. The first one starts open. */
  openId: string | null;
  setOpenId: (id: string | null) => void;
  /** Opens a question and glides the page to it (used by links elsewhere, like "Breakdown"). */
  showQuestion: (id: string) => void;
}

export const useFaqStore = create<FaqState>((set) => ({
  openId: "pgtm",
  setOpenId: (openId) => set({ openId }),
  showQuestion: (id) => {
    set({ openId: id });
    // The question that was open (usually above this one) collapses over ~0.3s, which moves this
    // one. Wait for that to settle, then scroll. The page's CSS decides whether it glides or
    // jumps (it jumps for people who reduce motion).
    setTimeout(() => {
      document.getElementById(`faq-${id}`)?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 600);
  },
}));
