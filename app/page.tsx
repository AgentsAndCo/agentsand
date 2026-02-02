import { Suspense } from "react";
import { getReservationCount } from "@/app/lib/db";
import HeroSection from "@/components/HeroSection";
import SocialProofMarquee from "@/components/SocialProofMarquee";
import ProblemSection from "@/components/ProblemSection";
import Feature from "@/components/Feature";
import StatesSection from "@/components/StatesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import UseCasesSection from "@/components/UseCasesSection";
import { RoleToggleProvider } from "@/components/RoleToggle";
import { Preloader } from "@/components/Preloader";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Agents & Co.",
  url: "https://agentsand.co",
  logo: "https://agentsand.co/icon.png",
  description:
    "The registered agent for AI agents. LLC formation in Wyoming and Delaware with real-time name availability, registered agent service, and API access.",
  sameAs: [
    "https://twitter.com/agentsandco",
    "https://github.com/AgentsAndCo/agentsand",
  ],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "99",
    highPrice: "499",
    offerCount: "3",
  },
};

export default async function Home() {
  const reservationCount = await getReservationCount();

  return (
    <RoleToggleProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Preloader />
      <Suspense>
        <HeroSection />
      </Suspense>
      <SocialProofMarquee />
      <ProblemSection />
      <Feature />
      <StatesSection />
      <PricingSection />
      <FAQSection />
      <UseCasesSection reservationCount={reservationCount} />
    </RoleToggleProvider>
  );
}
