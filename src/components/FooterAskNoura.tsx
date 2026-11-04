"use client";

import { useNouraStore } from "@/store/useNouraStore";

// "Ask Noura" in the footer: opens the Noura chat, like the button in the FAQ.
export default function FooterAskNoura({ className }: { className: string }) {
  const openChat = useNouraStore((s) => s.openChat);
  return (
    <button type="button" onClick={openChat} className={`${className} cursor-pointer text-left`}>
      Ask Noura
    </button>
  );
}
