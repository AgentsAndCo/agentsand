import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getStripe } from "@/app/lib/stripe";
import { getPositionBySessionId } from "@/app/lib/db";
import { COPY, SITE_URL } from "@/app/lib/constants";
import SuccessClient from "./SuccessClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}): Promise<Metadata> {
  const { session_id } = await searchParams;
  if (!session_id) return {};

  let llcName = "Your Agent LLC";
  let state = "WY";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);
    llcName = (session.metadata?.llcName as string) || llcName;
    state = (session.metadata?.state as string) || state;
  } catch {
    // Use defaults
  }

  const ogUrl = `${SITE_URL}/api/og?name=${encodeURIComponent(llcName)}&state=${encodeURIComponent(state)}`;

  return {
    title: `${llcName} — Registered | Agents & Co.`,
    description: `${llcName} is now a registered agent. agentsand.co`,
    openGraph: {
      title: `${llcName} is now a registered agent.`,
      description: "The registered agent for AI agents. agentsand.co",
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${llcName} is now a registered agent.`,
      description: "The registered agent for AI agents. agentsand.co",
      images: [ogUrl],
    },
  };
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  let llcName = "Your Agent LLC";
  let state = "WY";
  let email = "";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);
    llcName = (session.metadata?.llcName as string) || llcName;
    state = (session.metadata?.state as string) || state;
    email = (session.metadata?.email as string) || (session.customer_email as string) || email;
  } catch {
    // If Stripe fails, show page with defaults
  }

  const stateName = state === "WY" ? "Wyoming" : "Delaware";
  const agentNumber = await getPositionBySessionId(session_id);

  return (
    <SuccessClient
      llcName={llcName}
      stateName={stateName}
      email={email}
      siteUrl={SITE_URL}
      postPurchaseCopy={COPY.postPurchase}
      agentNumber={agentNumber}
    />
  );
}
