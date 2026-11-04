"use client";

import { useNouraStore } from "@/store/useNouraStore";

// "Ask Noura" on the contact page: opens the Noura chat.
export default function ContactAskNoura({ className }: { className: string }) {
  const openChat = useNouraStore((s) => s.openChat);
  return (
    <button type="button" onClick={openChat} className={className}>
      Ask Noura
    </button>
  );
}
