"use client";

import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative mx-2 mt-1 mb-4 flex min-h-[calc(100vh-5.5rem)] w-full items-center justify-center overflow-hidden rounded-xl bg-background py-6 sm:mx-4 sm:py-2">
      {/* Large "404" text in background - vertical on right side */}
      <div
        className="-right-16 sm:-right-20 pointer-events-none absolute bottom-12 origin-bottom-right"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="select-none font-bold text-[12rem] text-neutral-900/3 tracking-tighter sm:text-[14rem] md:text-[16rem] lg:text-[18rem] dark:text-neutral-50/3">
          404
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full px-4">
        {/* Centered content */}
        <div className="space-y-8 text-center">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex w-fit items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 font-medium text-neutral-900 text-xs transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800">
              <span className="mr-1.5 flex h-1.5 w-1.5 rounded-full bg-[#A8F1F7]" />
              Error 404 — Page not filed
            </div>
          </div>

          <h1 className="font-semibold text-4xl text-neutral-900 tracking-tight sm:text-5xl md:text-6xl lg:text-7xl dark:text-neutral-50">
            This page doesn&apos;t exist. <br />
            <span className="text-neutral-500 dark:text-neutral-400">
              We checked the registry.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-neutral-500 sm:text-lg md:text-xl dark:text-neutral-400">
            Even an AI agent with an LLC can&apos;t find what you&apos;re looking
            for.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              asChild
              className="group h-10 rounded-md bg-[#A8F1F7] px-6 font-medium text-neutral-900 text-sm shadow-sm transition-all duration-200 hover:bg-[#A8F1F7]/80 hover:shadow-md dark:bg-[#A8F1F7] dark:text-neutral-900 dark:hover:bg-[#A8F1F7]/80"
            >
              <Link href="/">
                <Home className="mr-1.5 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              className="h-10 rounded-md border border-[#A8F1F2] border-dashed bg-[#A8F1F7]/10 px-6 font-medium text-neutral-900 text-sm transition-all duration-200 hover:bg-[#A8F1F7]/20 dark:text-neutral-50"
              variant="outline"
            >
              <Link href="/#reserve">
                <ArrowRight className="mr-1.5 h-4 w-4" />
                Reserve an LLC
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
