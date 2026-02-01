import Link from "next/link";

export function Logo() {
  return (
    <div className="flex items-center">
      <Link aria-label="Agents & Co." className="flex items-center gap-2" href="/">
        <span className="text-lg" role="img" aria-label="island">
          🏝️
        </span>
        <span className="font-bold text-xl text-black tracking-tighter transition-colors dark:text-white">
          Agents &amp; Co.
        </span>
      </Link>
    </div>
  );
}
