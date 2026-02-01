"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { AGENT_CODE_TABS } from "@/app/lib/constants";
import { useRole } from "@/components/RoleToggle";

export default function AgentInstructions() {
  const [activeTab, setActiveTab] = useState<string>(AGENT_CODE_TABS[0].id);
  const [copied, setCopied] = useState(false);
  const { setIsAgent } = useRole();

  const activeCode = AGENT_CODE_TABS.find((t) => t.id === activeTab);

  const handleCopy = async () => {
    if (!activeCode) return;
    await navigator.clipboard.writeText(activeCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg text-left">
      {/* Tabs */}
      <div className="flex gap-1 rounded-t-lg border border-b-0 border-dashed border-[#A8F1F7]/20 bg-black/3 p-1 dark:bg-white/5">
        {AGENT_CODE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium tracking-tighter transition-all",
              activeTab === tab.id
                ? "bg-[#A8F1F7]/10 text-[#0e7490] dark:text-[#A8F1F7]"
                : "text-neutral-500 hover:text-neutral-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code block */}
      <div className="relative rounded-b-lg border border-dashed border-[#A8F1F7]/20 bg-[#09090b] p-4">
        <pre className="overflow-x-auto text-sm leading-relaxed">
          <code className="font-mono text-[#A8F1F7]/80">{activeCode?.code}</code>
        </pre>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-3 right-3 rounded-md border border-white/10 bg-white/5 p-1.5 transition-all hover:bg-white/10"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-neutral-400" />
          )}
        </button>
      </div>

      {/* Human fallback link */}
      <p className="mt-3 text-sm text-neutral-500 text-center">
        Don&apos;t have an AI agent?{" "}
        <button
          type="button"
          onClick={() => setIsAgent(false)}
          className="font-medium text-[#0e7490] underline underline-offset-2 transition-colors hover:text-[#0e7490]/80 dark:text-[#A8F1F7] dark:hover:text-[#A8F1F7]/80"
        >
          Reserve as a human
        </button>
      </p>
    </div>
  );
}
