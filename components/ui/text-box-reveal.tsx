"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import React, { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

export interface TextBoxRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  highlight?: string;
  highlightTextClass?: string;
  highlightBgClass?: string;
}

export const TextBoxReveal: FC<TextBoxRevealProps> = ({
  children,
  className,
  highlight,
  highlightTextClass,
  highlightBgClass,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textContent =
    typeof children === "string"
      ? children
      : React.Children.toArray(children)
          .map((child: ReactNode) => {
            if (typeof child === "string") return child;
            if (
              typeof child === "object" &&
              child !== null &&
              "props" in child
            ) {
              const childElement = child as {
                type: string;
                props: { children?: ReactNode };
              };
              if (childElement.type === "br") return "\n";
              if (childElement.type === "span")
                return childElement.props.children || "";
              return childElement.props.children || "";
            }
            return String(child);
          })
          .join("");

  const lines = textContent.split(/\n+/);
  const allWords: { word: string; lineIndex: number; wordIndex: number }[] = [];

  lines.forEach((line, lineIndex) => {
    const words = line.split(/\s+/).filter((word) => word.length > 0);
    words.forEach((word, wordIndex) => {
      allWords.push({ word, lineIndex, wordIndex });
    });
  });

  return (
    <div ref={containerRef} className={cn("relative z-0 h-[400vh]")}>
      <div className="sticky top-0 mx-auto flex h-screen max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]">
        <div
          className={cn(
            "flex flex-col gap-20 p-5 text-2xl tracking-tight text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20",
            className,
          )}
        >
          {lines.map((line, lineIndex) => {
            const lineWords = line
              .split(/\s+/)
              .filter((word) => word.length > 0);
            return (
              <div key={lineIndex} className="flex flex-wrap">
                {lineWords.map((word, wordIndex) => {
                  const globalWordIndex = allWords.findIndex(
                    (w) =>
                      w.lineIndex === lineIndex && w.wordIndex === wordIndex,
                  );
                  return (
                    <AnimatedWord
                      key={`${lineIndex}-${wordIndex}`}
                      progress={scrollYProgress}
                      wordIndex={globalWordIndex}
                      totalWords={allWords.length}
                      highlight={highlight}
                      highlightTextClass={highlightTextClass}
                      highlightBgClass={highlightBgClass}
                    >
                      {word}
                    </AnimatedWord>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface AnimatedWordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  wordIndex: number;
  totalWords: number;
  highlight?: string;
  highlightTextClass?: string;
  highlightBgClass?: string;
}

const AnimatedWord: FC<AnimatedWordProps> = ({
  children,
  progress,
  wordIndex,
  totalWords,
  highlight,
  highlightTextClass,
  highlightBgClass,
}) => {
  const overlapWords = 15;

  const wordStart = wordIndex / totalWords;
  const wordEnd = wordStart + overlapWords / totalWords;
  const totalAnimationLength = 1 + overlapWords / totalWords;
  const timelineScale =
    1 /
    Math.min(
      totalAnimationLength,
      1 + (totalWords - 1) / totalWords + overlapWords / totalWords,
    );
  const adjustedStart = wordStart * timelineScale;
  const adjustedEnd = wordEnd * timelineScale;
  const duration = adjustedEnd - adjustedStart;

  const opacity = useTransform(progress, [adjustedStart, adjustedEnd], [0, 1]);

  const bgOpacity = useTransform(
    progress,
    [adjustedStart + duration * 0.9, adjustedEnd],
    [1, 0],
  );

  const textOpacity = useTransform(
    progress,
    [adjustedStart + duration * 0.9, adjustedEnd],
    [0, 1],
  );

  return (
    <motion.span
      className={cn(
        "relative mx-1 inline-block text-black lg:mx-1.5 dark:text-white",
        highlight === children && highlightTextClass,
      )}
      style={{ opacity }}
    >
      <motion.div
        className={cn(
          "absolute left-1/2 top-1/2 h-[80%] w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black dark:bg-white",
          highlight === children && highlightBgClass,
        )}
        style={{ opacity: bgOpacity }}
      />
      <motion.span
        className={cn("relative z-10")}
        style={{ opacity: textOpacity }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
};
