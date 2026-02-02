"use client";

import AgentInstructions from "@/components/AgentInstructions";
import { useRole, RoleToggleSwitch } from "@/components/RoleToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Loader2, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AvailabilityStatus = "idle" | "loading" | "available" | "taken";

export default function HeroSection() {
  const [llcName, setLlcName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"WY" | "DE">("WY");
  const [product, setProduct] = useState<"reservation" | "formation">("reservation");
  const [status, setStatus] = useState<AvailabilityStatus>("idle");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { isAgent } = useRole();

  useEffect(() => {
    const handleFocus = () => {
      nameInputRef.current?.focus();
      setShowPrompt(true);
      const timer = setTimeout(() => setShowPrompt(false), 4000);
      return () => clearTimeout(timer);
    };
    window.addEventListener("focus-register-form", handleFocus);
    return () => window.removeEventListener("focus-register-form", handleFocus);
  }, []);

  useEffect(() => {
    const handleSetProduct = (e: Event) => {
      const { product: p, state: s } = (e as CustomEvent).detail;
      if (p) setProduct(p);
      if (s) setState(s);
      nameInputRef.current?.focus();
    };
    window.addEventListener("set-product", handleSetProduct);
    return () => window.removeEventListener("set-product", handleSetProduct);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    if (llcName.trim().length >= 2) {
      setStatus("loading");
      try {
        const checkRes = await fetch(`/api/check-name?name=${encodeURIComponent(llcName)}&state=${state}`);
        const checkData = await checkRes.json();
        if (!checkData.available) {
          setStatus("taken");
          setSuggestions(checkData.suggestions || []);
          setSubmitting(false);
          return;
        }
        setStatus("available");
        setSuggestions([]);
      } catch {
        // If check fails, proceed to checkout anyway
      }
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, state, llcName: llcName || undefined, product }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setSubmitting(false);
    }
  };

  const stateName = state === "WY" ? "Wyoming" : "Delaware";

  return (
    <section id="reserve" className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex min-w-0 max-w-4xl flex-col items-center justify-center space-y-4">
            {/* Role Toggle */}
            <RoleToggleSwitch />

            {/* Headline */}
            <div className="space-y-4">
              {isAgent ? (
                <>
                  <h1
                    className="text-5xl font-bold tracking-tighter text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl dark:text-neutral-50"
                    style={{ textWrap: "balance" }}>
                    Register via <span className="text-[#0e7490] dark:text-[#A8F1F7]">API.</span>
                  </h1>
                  <p className="mx-auto max-w-[600px] text-lg leading-relaxed text-neutral-500 md:text-xl dark:text-neutral-400">
                    One call. Real LLC. Wyoming or Delaware. Starting at $99.
                  </p>
                </>
              ) : (
                <>
                  <h1
                    className="text-5xl font-bold tracking-tighter text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl dark:text-neutral-50"
                    style={{ textWrap: "balance" }}>
                    The registered agent{" "}
                    <span className="text-[#0e7490] dark:text-[#A8F1F7]">for AI agents.</span>
                  </h1>
                  <p className="mx-auto max-w-[600px] text-lg leading-relaxed text-neutral-500 md:text-xl dark:text-neutral-400">
                    {stateName} LLC formation for liability protection.{" "}
                    <span className="hidden sm:inline"><br /></span>
                    $99 to reserve. ${state === "WY" ? "299" : "399"} to incorporate. 1 minute.
                  </p>
                </>
              )}
            </div>

            {/* Agent Mode: Code Instructions */}
            {isAgent && <AgentInstructions />}

            {/* Human Mode: Reservation Form */}
            {!isAgent && (
              <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 pt-2">
                {/* Row 1: LLC name + state toggle */}
                <div>
                  <div className="flex gap-2">
                    <input
                      ref={nameInputRef}
                      type="text"
                      placeholder="LLC name (e.g. Nexus Dynamics)"
                      value={llcName}
                      onChange={(e) => {
                        setLlcName(e.target.value);
                        if (status !== "idle") setStatus("idle");
                        if (showPrompt) setShowPrompt(false);
                      }}
                      className={cn(
                        "min-w-0 flex-1 rounded-lg border bg-white px-4 py-3.5 font-mono text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[#A8F1F7] focus:outline-none focus:ring-1 focus:ring-[#A8F1F7]/50 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-500",
                        showPrompt
                          ? "border-[#A8F1F7] ring-1 ring-[#A8F1F7]/50 dark:border-[#A8F1F7]"
                          : "border-black/10 dark:border-white/10"
                      )}
                    />
                    <div className="flex shrink-0 overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
                      {(["WY", "DE"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setState(s)}
                          className={cn(
                            "px-3 py-3.5 text-sm font-medium transition-all",
                            state === s
                              ? "bg-[#A8F1F7]/15 text-[#0e7490] dark:text-[#A8F1F7]"
                              : "text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5"
                          )}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  {showPrompt && status === "idle" && (
                    <p className="mt-1.5 animate-in fade-in slide-in-from-top-1 text-left text-sm text-[#0e7490] dark:text-[#A8F1F7]">
                      Enter your desired LLC name to get started
                    </p>
                  )}
                  {status !== "idle" && (
                    <div className="mt-1.5 text-left">
                      {status === "loading" && (
                        <span className="flex items-center gap-1.5 text-sm text-neutral-500">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Checking in {stateName}...
                        </span>
                      )}
                      {status === "available" && (
                        <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                          <Check className="h-3.5 w-3.5" />
                          Available in {stateName}
                        </span>
                      )}
                      {status === "taken" && (
                        <div>
                          <span className="flex items-center gap-1.5 text-sm text-red-500">
                            <XCircle className="h-3.5 w-3.5" />
                            Name taken in {stateName}
                          </span>
                          {suggestions.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {suggestions.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setLlcName(s)}
                                  className="rounded border border-black/5 px-2 py-0.5 text-sm text-[#0e7490] transition-colors hover:bg-[#A8F1F7]/10 dark:border-white/10 dark:text-[#A8F1F7]">
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Row 2: Email */}
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-black/10 bg-white px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[#A8F1F7] focus:outline-none focus:ring-1 focus:ring-[#A8F1F7]/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-500"
                />

                {/* Row 3: CTA */}
                <Button
                  type="submit"
                  disabled={submitting || !email || status === "taken"}
                  className="h-13 group w-full rounded-lg bg-[#A8F1F7] px-4 text-base font-semibold text-neutral-900 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:bg-[#A8F1F7]/80 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#A8F1F7] dark:text-neutral-900 dark:hover:bg-[#A8F1F7]/80">
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {product === "formation"
                        ? `Form ${stateName} LLC — $${state === "WY" ? "299" : "399"}`
                        : "Reserve Your Name — $99"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  )}
                </Button>

                {/* Upsell / product switch */}
                <p className="text-center text-sm text-neutral-400">
                  {product === "reservation" ? (
                    <>
                      120-day hold. Credited toward{" "}
                      <button
                        type="button"
                        onClick={() => setProduct("formation")}
                        className="text-[#0e7490] underline underline-offset-2 transition-colors hover:text-[#A8F1F7] dark:text-[#A8F1F7] dark:hover:text-[#A8F1F7]/80">
                        full formation (${state === "WY" ? "299" : "399"})
                      </button>
                    </>
                  ) : (
                    <>
                      Includes registered agent free for year one.{" "}
                      <button
                        type="button"
                        onClick={() => setProduct("reservation")}
                        className="text-[#0e7490] underline underline-offset-2 transition-colors hover:text-[#A8F1F7] dark:text-[#A8F1F7] dark:hover:text-[#A8F1F7]/80">
                        Just reserve ($99)
                      </button>
                    </>
                  )}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
