import { create } from "zustand";

export const currencies = [
  { code: "NGN", symbol: "₦", name: "Nigerian naira" },
  { code: "USD", symbol: "$", name: "US dollar" },
  { code: "GBP", symbol: "£", name: "British pound" },
  { code: "EUR", symbol: "€", name: "Euro" },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

interface CurrencyState {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: "NGN",
  setCurrency: (currency) => set({ currency }),
}));
