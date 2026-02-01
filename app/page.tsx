import { getReservationCount } from "@/app/lib/db";
import HeroSection from "@/components/HeroSection";
import SocialProofMarquee from "@/components/SocialProofMarquee";
import ProblemSection from "@/components/ProblemSection";
import Feature from "@/components/Feature";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import UseCasesSection from "@/components/UseCasesSection";
import { RoleToggleProvider } from "@/components/RoleToggle";
import { Preloader } from "@/components/Preloader";

export default async function Home() {
  const reservationCount = await getReservationCount();

  return (
    <RoleToggleProvider>
      <Preloader />
      <HeroSection />
      <SocialProofMarquee />
      <ProblemSection />
      <Feature />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <UseCasesSection reservationCount={reservationCount} />
    </RoleToggleProvider>
  );
}
