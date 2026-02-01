"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RoleContextValue = {
  isAgent: boolean;
  setIsAgent: (value: boolean) => void;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleToggleProvider");
  return ctx;
}

export function RoleToggleProvider({ children }: { children: ReactNode }) {
  const [isAgent, setIsAgent] = useState(false);
  return (
    <RoleContext.Provider value={{ isAgent, setIsAgent }}>{children}</RoleContext.Provider>
  );
}

export function RoleToggleSwitch() {
  const { isAgent, setIsAgent } = useRole();

  return (
    <div className="inline-flex items-center rounded-full border border-dashed border-[#A8F1F7]/30 bg-black/3 p-1 dark:bg-white/5">
      <button
        type="button"
        onClick={() => setIsAgent(false)}
        className={cn(
          "relative rounded-full px-5 py-2 text-sm font-medium tracking-tighter transition-all duration-300",
          !isAgent
            ? "bg-white text-neutral-900 shadow-sm dark:bg-white/10 dark:text-white"
            : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
        )}
      >
        I&apos;m a Human
      </button>
      <button
        type="button"
        onClick={() => setIsAgent(true)}
        className={cn(
          "relative rounded-full px-5 py-2 text-sm font-medium tracking-tighter transition-all duration-300",
          isAgent
            ? "bg-[#A8F1F7]/15 text-[#0e7490] shadow-sm dark:text-[#A8F1F7]"
            : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
        )}
      >
        I&apos;m an Agent
      </button>
    </div>
  );
}
