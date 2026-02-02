"use client";

import { Check, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

function selectProduct(state: "WY" | "DE") {
  window.dispatchEvent(
    new CustomEvent("set-product", { detail: { product: "formation", state } })
  );
  document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
}

export default function StatesSection() {
  return (
    <section id="states" className="w-full overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center md:mb-16">
          <h2 className="text-4xl font-bold tracking-tighter text-neutral-900 md:text-5xl lg:text-6xl dark:text-neutral-50">
            Wyoming invented{" "}
            <span className="block sm:inline">the LLC.</span>
            <span className="text-[#0e7490] dark:text-[#A8F1F7]"> Now it lets AI run one.</span>
          </h2>
          <p className="mx-auto max-w-[640px] text-lg text-neutral-400 md:text-xl">
            The state that created the modern liability shield in 1977 now allows algorithmically managed
            LLCs.
          </p>
        </div>

        {/* Asymmetric Grid: WY 2/3, DE 1/3 */}
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Wyoming — 2/3 width */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="group relative cursor-pointer rounded-2xl border border-dashed border-[#A8F1F7]/30 p-2 md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              onClick={() => selectProduct("WY")}
              transition={{ delay: 0.05, duration: 0.3 }}>
              <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[#A8F1F7]/20 bg-[#A8F1F7]/5 transition-colors group-hover:bg-[#A8F1F7]/10 dark:border-[#A8F1F7]/10 dark:bg-[#A8F1F7]/5 dark:group-hover:bg-[#A8F1F7]/8">
                {/* Header */}
                <div className="border-b border-[#A8F1F7]/10 p-6 md:p-8">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <span className="mb-2 inline-block rounded-full border border-dashed border-[#A8F1F7] bg-[#A8F1F7]/10 px-2.5 py-0.5 text-sm font-medium text-[#0e7490] dark:text-[#A8F1F7]">
                        <span className="sm:hidden">Recommended</span>
                        <span className="hidden sm:inline">Recommended for AI Agents</span>
                      </span>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tighter text-black/80 dark:text-white/80">
                        Wyoming
                      </h3>
                    </div>
                    <span className="text-6xl font-bold tracking-tighter text-black/80 dark:text-white/80">
                      $299
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      "Strongest asset protection in the United States",
                      "Single-member LLC fully protected",
                      "No state income tax, no franchise tax",
                      "Anonymous ownership — names not in public records",
                      "$50/yr annual report",
                      "10-year cost: $500–600",
                    ].map((highlight) => (
                      <div className="flex items-start gap-2.5" key={highlight}>
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A8F1F7]/20">
                          <Check className="h-3 w-3 text-[#0e7490] dark:text-[#A8F1F7]" />
                        </div>
                        <span className="text-base leading-tight text-black/60 dark:text-white/60">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectProduct("WY");
                      }}
                      className="group/btn inline-flex items-center gap-2 rounded-lg bg-[#A8F1F7] px-6 py-3 text-base font-semibold text-neutral-900 transition-all hover:scale-[1.02] hover:bg-[#A8F1F7]/80 hover:shadow-md">
                      Form Wyoming LLC &mdash; $299
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Delaware — 1/3 width */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="group relative cursor-pointer rounded-2xl border border-dashed border-black/5 p-2 md:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              onClick={() => selectProduct("DE")}
              transition={{ delay: 0.1, duration: 0.3 }}>
              <div className="bg-black/3 flex h-full flex-col overflow-hidden rounded-xl border border-black/5 transition-colors group-hover:bg-black/5 dark:border-white/10 dark:bg-white/10 dark:group-hover:bg-white/[0.12]">
                {/* Header */}
                <div className="border-b border-black/5 p-6 dark:border-white/10">
                  <p className="mb-2 text-sm text-black/50 dark:text-white/50">
                    For investor-backed companies
                  </p>
                  <h3 className="text-xl font-semibold tracking-tighter text-black/80 dark:text-white/80">
                    Delaware
                  </h3>
                  <span className="mt-2 block text-4xl font-bold tracking-tighter text-black/80 dark:text-white/80">
                    $399
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="space-y-2.5">
                    {[
                      "Court of Chancery — specialized business court",
                      "Series LLC: one entity, multiple ventures",
                      "60% of Fortune 500 incorporated here",
                      "VC-preferred structure",
                      "$300/yr franchise tax",
                      "10-year cost: $3,000+",
                    ].map((highlight) => (
                      <div className="flex items-start gap-2" key={highlight}>
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                          <Check className="h-2.5 w-2.5 text-black/60 dark:text-white/60" />
                        </div>
                        <span className="text-sm leading-tight text-black/60 dark:text-white/60">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectProduct("DE");
                      }}
                      className="group/btn inline-flex items-center gap-2 rounded-lg border border-black/10 bg-black/5 px-5 py-2.5 text-sm font-medium text-black/80 transition-all hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10">
                      Form Delaware LLC &mdash; $399
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
