import Link from "next/link";

// The hero's main button: goes to the booking page.
export default function StartBookingButton() {
  return (
    <Link
      href="/book"
      className="inline-flex min-h-btn cursor-pointer items-center rounded-full border border-ink bg-ink px-[1.4em] py-[0.7em] text-btn font-bold text-bg transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-[#07110c] hover:shadow-[0_10px_28px_-8px_var(--color-brand)] active:translate-y-0 active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
    >
      Start booking
    </Link>
  );
}
