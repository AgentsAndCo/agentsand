"use client";

import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { ACTIVITY_FEED } from "@/app/lib/constants";

const mid = Math.ceil(ACTIVITY_FEED.length / 2);
const row1 = ACTIVITY_FEED.slice(0, mid);
const row2 = ACTIVITY_FEED.slice(mid);

function TickerItem({ item }: { item: { message: string; url: string } }) {
  return (
    <>
      <span
        className="mx-3 shrink-0 text-red-500/40 dark:text-red-400/30"
        aria-hidden
      >
        ///
      </span>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 whitespace-nowrap text-[13px] font-medium tracking-tight text-white/80 decoration-red-400/50 underline-offset-2 transition-colors hover:text-white hover:underline"
      >
        {item.message}
      </a>
    </>
  );
}

function TickerRow({
  items,
  speed = 200,
  direction = "left",
}: {
  items: { message: string; url: string }[];
  speed?: number;
  direction?: "left" | "right";
}) {
  const x = useMotionValue(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const w = contentRef.current.offsetWidth;
      setContentWidth(w);
      if (direction === "right") x.set(-w);
    }
  }, [direction, x]);

  useAnimationFrame((_, delta) => {
    if (isPaused || contentWidth === 0) return;
    const move = speed * (delta / 1000);
    let next = x.get() + (direction === "left" ? -move : move);

    if (direction === "left" && next <= -contentWidth) {
      next += contentWidth;
    } else if (direction === "right" && next >= 0) {
      next -= contentWidth;
    }

    x.set(next);
  });

  const copies = [0, 1, 2, 3];

  return (
    <div
      className="relative overflow-hidden rounded-md bg-zinc-950 dark:bg-white/[0.03]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div className="flex items-center py-2" style={{ x }}>
        {copies.map((copy) => (
          <div
            key={copy}
            ref={copy === 0 ? contentRef : undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((item, i) => (
              <TickerItem key={`${copy}-${i}`} item={item} />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function SocialProofMarquee() {
  return (
    <section className="w-full space-y-1.5 py-6 md:py-8">
      <TickerRow items={row1} speed={55} direction="left" />
      <TickerRow items={row2} speed={45} direction="right" />
    </section>
  );
}
