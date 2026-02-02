"use client";

import { ACTIVITY_FEED } from "@/app/lib/constants";

const styles = `
  @keyframes ticker-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes ticker-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .animate-ticker-left {
    animation: ticker-left 25s linear infinite;
  }
  .animate-ticker-right {
    animation: ticker-right 22s linear infinite;
  }
  .ticker-strip:hover .animate-ticker-left,
  .ticker-strip:hover .animate-ticker-right {
    animation-play-state: paused;
  }
`;

const mid = Math.ceil(ACTIVITY_FEED.length / 2);
const row1 = ACTIVITY_FEED.slice(0, mid);
const row2 = ACTIVITY_FEED.slice(mid);

function repeat<T>(arr: T[], n: number): T[] {
  return Array.from({ length: n }, () => arr).flat();
}

function TickerItem({ item }: { item: { message: string; url: string } }) {
  return (
    <>
      <span className="mx-3 shrink-0 text-red-500/40 dark:text-red-400/30" aria-hidden>
        ///
      </span>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 whitespace-nowrap text-[13px] font-medium tracking-tight text-white/80 transition-colors hover:text-white hover:underline decoration-red-400/50 underline-offset-2"
      >
        {item.message}
      </a>
    </>
  );
}

export default function SocialProofMarquee() {
  return (
    <>
      <style>{styles}</style>
      <section className="w-full space-y-1.5 py-6 md:py-8">
        {/* Row 1 — needs exactly 2N copies so -50% loops seamlessly */}
        <div className="ticker-strip relative overflow-hidden rounded-md bg-zinc-950 dark:bg-white/[0.03]">
          <div className="flex animate-ticker-left items-center py-2">
            {repeat(row1, 8).map((item, i) => (
              <TickerItem key={`t1-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="ticker-strip relative overflow-hidden rounded-md bg-zinc-950 dark:bg-white/[0.03]">
          <div className="flex animate-ticker-right items-center py-2">
            {repeat(row2, 8).map((item, i) => (
              <TickerItem key={`t2-${i}`} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
