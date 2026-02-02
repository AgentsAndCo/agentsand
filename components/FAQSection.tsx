"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type FAQItem = {
  id: string;
  title: string;
  description: string;
};

const faqs: FAQItem[] = [
  {
    id: "legal-own",
    title: "Can an AI legally own an LLC?",
    description:
      "No. The LLC is owned by you. Your agent operates it. The legal question of AI personhood is above our pay grade \u2014 we just handle the paperwork.",
  },
  {
    id: "personhood",
    title: "Is this the start of AI legal personhood?",
    description:
      '"AI legal personhood" is a philosophical debate. "AI liability protection" is a $299 filing fee. We\'re focused on the second one. For now.',
  },
  {
    id: "why-wyoming",
    title: "Why Wyoming?",
    description:
      "Wyoming invented the LLC in 1977. Strongest charging order protection in the US. No state income tax. Anonymous ownership \u2014 names not in public records. $50/yr annual report. Your AI doesn't need a Delaware C-corp.",
  },
  {
    id: "without-asking",
    title: "What if my agent incorporates without asking me?",
    description:
      "Our API requires an owner email for confirmation. What happens after that is between you and your agent.",
  },
  {
    id: "no-human",
    title: "Can my agent operate without a human member?",
    description:
      "There\u2019s a clever structure (noted by Stanford Law): you form two member-managed LLCs, each controlled by an autonomous system. LLC A is admitted as member of B, B as member of A, and the human withdraws. This doesn\u2019t trigger memberless-entity rules because each has one member \u2014 the other LLC. Whether this is wise is a different question. We file the paperwork either way.",
  },
  {
    id: "stanford",
    title: "What does Stanford Law say about this?",
    description:
      'The Stanford Technology Law Review published research showing LLCs can give "effective legal personhood for nonhuman agents without fundamental legal reform." There\u2019s a structure: form two member-managed LLCs, cross-admit them, human withdraws. Each has one member \u2014 the other LLC. Whether this is advisable is a conversation for your lawyer. We file the paperwork.',
  },
  {
    id: "is-legal",
    title: "Is this legal?",
    description:
      "Forming an LLC is legal. Operating one is legal. Using software to manage one is legal. Wyoming explicitly allows algorithmically managed LLCs through its DAO framework. The question isn\u2019t whether this is legal. The question is whether your agent is operating WITHOUT one.",
  },
  {
    id: "autonomous-agent",
    title: "I'm running an autonomous agent (OpenClaw, etc). Do I need this?",
    description:
      "If your agent can send emails, make purchases, accept terms, or execute commands, it can create binding commitments in your name. An LLC separates your personal liability from your agent\u2019s actions. It\u2019s the same reason you don\u2019t run a business as a sole proprietor.",
  },
  {
    id: "prompt-injection",
    title: "What if my agent gets prompt-injected and signs a contract?",
    description:
      "Under the UETA (47 states), contracts formed by electronic agents are binding even if no human reviewed them. A prompt injection that leads to a contractual commitment is your problem. An LLC makes it the LLC\u2019s problem.",
  },
  {
    id: "is-joke",
    title: "Is this a joke?",
    description:
      "The Air Canada chatbot case was not a joke ($812.02). The Connecticut UETA is not a joke (47 states). The LLC your agent needs is not a joke ($299). The situation? Yeah, that\u2019s kind of funny.",
  },
  {
    id: "after-pay",
    title: "What happens after I pay $99?",
    description:
      "We reserve your LLC name on our platform so no one else can claim it through us. You\u2019ll receive a confirmation email with your LLC name, state, and next steps. Your reservation is active for 120 days. The $99 is credited toward full formation.",
  },
];

export default function FAQSection() {
  const [expandedFAQ, setExpandedFAQ] = useState<string>("legal-own");

  return (
    <section
      className="w-full overflow-hidden py-16 pb-24 md:py-24 md:pb-32 lg:py-32 lg:pb-40"
      id="faq"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center md:mb-16">
          <h2 className="text-4xl font-bold tracking-tighter text-neutral-900 md:text-5xl lg:text-6xl dark:text-neutral-50">
            Questions we get asked.
            <br />
            <span className="text-neutral-500 dark:text-neutral-400">
              And one we ask ourselves.
            </span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="mx-auto max-w-4xl space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="group rounded-2xl border border-black/5 border-dashed p-2 transition-all hover:border-neutral-300 dark:border-white/10 dark:bg-white/3"
              initial={{ opacity: 0, y: 20 }}
              key={faq.id}
              transition={{
                delay: 0.05 * index,
                duration: 0.3,
              }}
              viewport={{ once: true }}
            >
              {/* Inner Card */}
              <div className="overflow-hidden rounded-xl border border-black/5 bg-black/3 dark:border-white/10 dark:bg-white/10">
                {/* Clickable Header */}
                <button
                  aria-expanded={expandedFAQ === faq.id}
                  aria-label={
                    expandedFAQ === faq.id ? "Show less" : "Show more"
                  }
                  className="relative flex w-full items-center justify-between gap-4 p-5 text-left transition-colors"
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === faq.id ? "" : faq.id)
                  }
                  type="button"
                >
                  <h3 className="flex-1 text-base font-medium text-black/80 md:text-lg dark:text-white/80">
                    {faq.title}
                  </h3>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/5 transition-colors group-hover:bg-black/10 dark:bg-white/5 dark:group-hover:bg-white/10">
                    {expandedFAQ === faq.id ? (
                      <Minus className="h-3.5 w-3.5 text-black/60 dark:text-white/60" />
                    ) : (
                      <Plus className="h-3.5 w-3.5 text-black/60 dark:text-white/60" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      className="overflow-hidden"
                      exit={{ height: 0, opacity: 0 }}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-black/5 border-t px-5 pt-3 pb-5 dark:border-white/10">
                        <motion.p
                          animate={{ opacity: 1 }}
                          className="text-base leading-relaxed text-black/60 dark:text-white/60"
                          initial={{ opacity: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {faq.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
