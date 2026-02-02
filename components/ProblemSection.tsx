"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { EVIDENCE } from "@/app/lib/constants";

export default function ProblemSection() {
  return (
    <section className="w-full overflow-hidden bg-[#09090b] py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Headline */}
        <div className="mb-12 space-y-4 text-center md:mb-16">
          <h2 className="text-4xl font-bold tracking-tighter text-neutral-50 md:text-5xl lg:text-6xl">
            Your AI agent just signed a contract
            <br />
            you never read.
          </h2>
          <p className="text-xl text-red-400/80 md:text-2xl">And you&apos;re personally liable for it.</p>
        </div>

        {/* Evidence Cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {EVIDENCE.map((card, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              key={card.id}
              transition={{
                delay: 0.1 + index * 0.1,
                duration: 0.4,
              }}
            >
              {/* Title */}
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-neutral-500">
                {card.title}
              </p>

              {/* Quote */}
              <blockquote className="mb-6 flex-1 text-base leading-relaxed text-neutral-300 italic">
                &ldquo;{card.quote}&rdquo;
              </blockquote>

              {/* Source */}
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 inline-flex items-center gap-1.5 rounded-md border border-[#A8F1F7]/20 bg-[#A8F1F7]/5 px-3 py-1.5 text-sm font-medium text-[#A8F1F7] transition-colors hover:border-[#A8F1F7]/40 hover:bg-[#A8F1F7]/10"
              >
                {card.source}
                <ExternalLink className="h-3 w-3" />
              </a>

              {/* Footnote */}
              <p className="text-sm text-neutral-500">{card.footnote}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Copy + CTA */}
        <div className="mx-auto mt-12 max-w-3xl space-y-6 text-center md:mt-16">
          <div className="space-y-1">
            <p className="text-lg text-neutral-400 md:text-xl">
              The LLC is the oldest liability shield in American law.
            </p>
            <p className="text-lg text-[#0e7490] md:text-xl dark:text-[#A8F1F7]">
              It works for AI too.
            </p>
          </div>

          <a
            href="#reserve"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#A8F1F7] px-6 py-3 text-base font-semibold text-neutral-900 transition-all hover:scale-[1.02] hover:bg-[#A8F1F7]/80 hover:shadow-md"
          >
            Shield Your Agent &mdash; $99
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
