"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div className="fixed inset-0 z-50">
          <div className="absolute z-10 flex h-full w-full items-center justify-center text-center text-white">
            <motion.h1
              className="text-3xl font-semibold tracking-tighter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 4 } }}
              exit={{ opacity: 0, transition: { duration: 0.6 } }}>
              {["Liability", "protection."].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.2 * index }}
                  className="mr-2 inline-block">
                  {word}
                </motion.span>
              ))}
              <span className="block sm:inline" />
              {["For", "your", "AI."].map((word, index) => (
                <motion.span
                  key={index + 2}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.2 * (index + 2) }}
                  className="mr-2 inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.div className="pointer-events-none fixed left-0 top-0 z-[2] flex h-screen">
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ height: "100%" }}
                animate={{ height: "100%" }}
                exit={{ height: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + 0.05 * (4 - index),
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="h-full w-[20vw] bg-black"
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
