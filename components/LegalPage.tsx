"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export interface LegalSection {
  id: string;
  title: string;
  content: string;
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  contactEmail: string;
  contactLabel: string;
  sections: LegalSection[];
}

function SectionBlock({
  section,
  index,
  setActiveIndex,
}: {
  section: LegalSection;
  index: number;
  setActiveIndex: (index: number) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.3,
    margin: "-100px 0px -50% 0px",
  });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  return (
    <div ref={ref} id={section.id} className="space-y-4 md:space-y-6">
      <h3 className="text-xl tracking-tighter text-neutral-900 lg:text-3xl dark:text-neutral-50">
        {section.title}
      </h3>
      <div className="opacity-35">
        <p className="text-sm leading-relaxed lg:text-lg">{section.content}</p>
      </div>
    </div>
  );
}

export default function LegalPage({
  title,
  lastUpdated,
  contactEmail,
  contactLabel,
  sections,
}: LegalPageProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="min-h-screen p-4 lg:p-12">
      {/* Header */}
      <div className="space-y-2 pt-[40px] lg:pt-0">
        <div className="flex items-center gap-3">
          <div className="h-px w-16 bg-linear-to-r from-transparent to-black/10 dark:to-white/10" />
          <span className="text-xs font-medium text-neutral-500">Legal</span>
          <div className="h-px w-16 bg-linear-to-l from-transparent to-black/10 dark:to-white/10" />
        </div>
        <h1 className="text-3xl tracking-tighter text-neutral-900 md:text-5xl dark:text-neutral-50">
          {title}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Last updated: {lastUpdated}
        </p>
      </div>

      {/* Sidebar + Content */}
      <div className="relative mb-[50vh] flex gap-12 py-[40px] md:py-[80px]">
        {/* Sticky sidebar — hidden on mobile */}
        <ul className="sticky top-24 hidden h-fit w-full max-w-[300px] space-y-4 border-l border-foreground/10 md:block">
          {sections.map((section, index) => (
            <li className="relative cursor-pointer pl-3" key={section.id}>
              <a href={`#${section.id}`}>
                {activeIndex === index && (
                  <motion.span
                    layoutId="active-term"
                    className="absolute -left-[1.5px] top-1/2 inline-block h-5 w-[2px] -translate-y-1/2 rounded-2xl bg-foreground"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <p
                  className={cn(
                    "text-sm opacity-50 transition-opacity duration-200",
                    activeIndex === index && "opacity-100"
                  )}
                >
                  {section.title}
                </p>
              </a>
            </li>
          ))}
        </ul>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-[40px] md:gap-[60px]">
          {sections.map((section, index) => (
            <SectionBlock
              key={section.id}
              section={section}
              index={index}
              setActiveIndex={setActiveIndex}
            />
          ))}

          {/* Contact */}
          <div className="border-t border-black/5 pt-6 dark:border-white/10">
            <p className="text-xs text-neutral-400">
              Questions? Email us at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-[#A8F1F7] hover:underline"
              >
                {contactLabel}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
