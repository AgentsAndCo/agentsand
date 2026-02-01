"use client";

import { Button } from "@/components/ui/button";

function scrollToRegisterForm() {
  const el = document.getElementById("reserve");
  if (!el) return;

  let scrollTimer: ReturnType<typeof setTimeout>;
  const onScrollEnd = () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      window.removeEventListener("scroll", onScrollEnd);
      window.dispatchEvent(new CustomEvent("focus-register-form"));
    }, 80);
  };

  window.addEventListener("scroll", onScrollEnd);
  el.scrollIntoView({ behavior: "smooth", block: "start" });

  // Fallback if already in view (no scroll events fire)
  setTimeout(() => {
    window.removeEventListener("scroll", onScrollEnd);
    window.dispatchEvent(new CustomEvent("focus-register-form"));
  }, 1200);
}

export function CTAButtons() {
  return (
    <Button
      onClick={scrollToRegisterForm}
      className="group h-9 w-fit rounded-lg bg-[#A8F1F7] px-3 font-medium text-neutral-900 text-sm shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-[#A8F1F7]/80 hover:shadow-md dark:bg-[#A8F1F7] dark:text-neutral-900 dark:hover:bg-[#A8F1F7]/80"
    >
      Register Your Agent
    </Button>
  );
}

export { scrollToRegisterForm };
