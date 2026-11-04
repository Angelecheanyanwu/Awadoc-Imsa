"use client";

import { useInProgressStore } from "@/store/useInProgressStore";

// "Start booking" on the contact page, as a plain underlined link like "Ask Noura": it does the same as the hero's Start booking button.
export default function ContactStartBooking({ className }: { className: string }) {
  const show = useInProgressStore((s) => s.show);
  return (
    <button type="button" onClick={show} aria-haspopup="dialog" className={className}>
      Start booking
    </button>
  );
}
