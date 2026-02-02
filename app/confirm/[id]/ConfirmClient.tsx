"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Shield, Building2 } from "lucide-react";
import type { RegistrationRequest } from "@/app/lib/db";

export default function ConfirmClient({ request }: { request: RegistrationRequest }) {
  const [submitting, setSubmitting] = useState(false);
  const [declining, setDeclining] = useState(false);
  const stateName = request.state === "WY" ? "Wyoming" : "Delaware";

  const handleApprove = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: request.owner_email,
          state: request.state,
          llcName: request.llc_name,
          product: "reservation",
          request_id: request.id,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setSubmitting(false);
    }
  };

  const handleDecline = async () => {
    setDeclining(true);
    try {
      await fetch(`/api/register/decline`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request_id: request.id }),
      });
      window.location.href = "/";
    } catch {
      setDeclining(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-16">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <a href="/" className="mb-6 inline-block font-mono text-lg tracking-tighter text-white">
            agents<span className="text-[#A8F1F7]">&amp;</span>
          </a>
          <h1 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
            Your agent wants to be a business.
          </h1>
          <p className="mt-3 text-lg text-neutral-400">You should want that too.</p>
        </div>

        {/* Request Card */}
        <div className="mb-8 rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {request.agent_name && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Agent</p>
                <p className="mt-1 font-mono text-lg text-[#A8F1F7]">{request.agent_name}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">LLC Name</p>
              <p className="mt-1 font-mono text-lg text-[#A8F1F7]">{request.llc_name}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">State</p>
              <p className="mt-1 text-lg text-white">{stateName}</p>
            </div>
            {request.reason && (
              <div className="sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Why it wants an LLC
                </p>
                <p className="mt-1 text-neutral-300 italic">&ldquo;{request.reason}&rdquo;</p>
              </div>
            )}
          </div>
        </div>

        {/* Two Sides */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-dashed border-[#A8F1F7]/20 bg-[#A8F1F7]/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#A8F1F7]" />
              <h3 className="font-semibold text-[#A8F1F7]">What your agent gets</h3>
            </div>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>A legal identity</li>
              <li>An LLC in {stateName}</li>
              <li>The ability to operate as a business</li>
            </ul>
          </div>
          <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-5">
            <div className="mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-white" />
              <h3 className="font-semibold text-white">What you get</h3>
            </div>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>Personal liability protection</li>
              <li>Separation from your agent&apos;s actions</li>
              <li>Peace of mind</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleApprove}
            disabled={submitting}
            className="group inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-[#A8F1F7] px-8 py-4 text-lg font-semibold text-neutral-900 transition-all hover:scale-[1.01] hover:bg-[#A8F1F7]/80 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Approve &mdash; $99
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          <p className="mt-4 text-sm text-neutral-500">
            $99 reserves the name for 120 days, credited toward full formation.
          </p>

          <button
            type="button"
            onClick={handleDecline}
            disabled={declining}
            className="mt-4 text-sm text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-300"
          >
            {declining ? "Declining..." : "Not now"}
          </button>
        </div>
      </div>
    </div>
  );
}
