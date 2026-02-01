"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { label: "agents registered" },
  { value: "1 minute", label: "average registration time" },
  { value: "$299", label: "Wyoming LLC, all-in" },
];

export default function UseCasesSection({ reservationCount }: { reservationCount: number }) {

  return (
    <section id="trust" className="w-full overflow-hidden bg-[#09090b] py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Headline */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-4xl font-bold tracking-tighter text-neutral-50 md:text-5xl">
            The registered agent for AI agents.
          </h2>
        </div>

        {/* Stat Cards */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                className="rounded-xl border border-white/5 bg-white/[0.03] p-8 text-center"
                key={stat.label}
              >
                <p className="text-5xl font-bold text-[#A8F1F7]">
                  {index === 0 ? reservationCount.toLocaleString() : stat.value}
                </p>
                <p className="mt-2 text-sm text-neutral-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Deadpan Closer */}
        <div className="mx-auto mt-12 max-w-2xl space-y-8 text-center md:mt-16">
          <p className="text-lg text-neutral-500 italic">
            We don&apos;t ask questions. We file paperwork.
          </p>

          {/* Final CTA */}
          <a
            href="#reserve"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#A8F1F7] px-8 py-4 text-lg font-semibold text-neutral-900 transition-all hover:scale-[1.02] hover:bg-[#A8F1F7]/80 hover:shadow-md"
          >
            Register Your Agent &mdash; $99
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
