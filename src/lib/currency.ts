import { currencies, type CurrencyCode } from "@/store/useCurrencyStore";

/**
 * All prices on the site are written in naira (NGN). Choosing another currency converts them with
 * the rates below.
 *
 * !! These rates are PLACEHOLDERS (naira per 1 unit of each currency). Replace them with your
 * !! real rates, or with a live source, before relying on the converted prices.
 */
export const NGN_PER_UNIT: Record<CurrencyCode, number> = {
  NGN: 1,
  USD: 1500,
  GBP: 1950,
  EUR: 1650,
};

/** Converts a naira amount to the chosen currency, rounded to a sensible whole number. */
export function convertFromNgn(ngn: number, code: CurrencyCode): number {
  const value = ngn / NGN_PER_UNIT[code];
  if (code === "NGN") return Math.round(value);
  // Foreign amounts: whole units, and the nearest 10 once they are large.
  return value >= 1000 ? Math.round(value / 10) * 10 : Math.round(value);
}

/** The symbol and the digits for a naira amount in the chosen currency (e.g. "$", "5,000"). */
export function formatPrice(ngn: number, code: CurrencyCode): { symbol: string; digits: string } {
  const symbol = currencies.find((c) => c.code === code)?.symbol ?? "₦";
  return { symbol, digits: convertFromNgn(ngn, code).toLocaleString("en-US") };
}
