import type { useRouter } from "next/navigation";

// Fades the current page out (the same soft exit the booking page uses), then goes to the next one,
// so changing pages is never an abrupt cut. Pages opt in with a `data-page` attribute on their root.
export function leaveTo(router: ReturnType<typeof useRouter>, href: string) {
  const page = document.querySelector<HTMLElement>("[data-page]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!page || reduce) {
    router.push(href);
    return;
  }
  // The next page starts loading at once, while this one fades, instead of waiting for the fade to finish.
  page.classList.remove("book-fade");
  page.classList.add("book-leave");
  router.push(href);
}
