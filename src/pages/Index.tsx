import heroCoupleImg from "@/assets/hero-couple-walking.jpg";
import drAlejandroImg from "@/assets/dr-alejandro.jpg";
import ebookBundleImg from "@/assets/ebook-bundle.jpg";
import bloodFlowEs from "@/assets/blood-flow-es.png";
import bloodFlowEn from "@/assets/blood-flow-en.png";
import { LanguageToggle } from "@/components/LanguageToggle";
import { AlertBar } from "@/components/AlertBar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { OriginStory } from "@/components/OriginStory";
import { MechanismSection } from "@/components/MechanismSection";
import { WhatYouGet } from "@/components/WhatYouGet";
import { ValueStack } from "@/components/ValueStack";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { FinalCTA } from "@/components/FinalCTA";
import { FooterSection } from "@/components/FooterSection";
import { StickyCTA } from "@/components/StickyCTA";

const CHECKOUT_URL = "#";

const Divider = () => <hr className="section-divider" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LanguageToggle />
      <AlertBar />
      <HeroSection heroImage={heroCoupleImg} checkoutUrl={CHECKOUT_URL} />
      <Divider />
      <ProblemSection />
      <OriginStory doctorImage={drAlejandroImg} />
      <Divider />
      <MechanismSection bloodFlowImageEs={bloodFlowEs} bloodFlowImageEn={bloodFlowEn} />
      <WhatYouGet bundleImage={ebookBundleImg} />
      <Divider />
      <ValueStack checkoutUrl={CHECKOUT_URL} />
      <TestimonialsSection />
      <Divider />
      <GuaranteeSection />
      <FinalCTA checkoutUrl={CHECKOUT_URL} />
      <FooterSection />
      <StickyCTA checkoutUrl={CHECKOUT_URL} />
    </div>
  );
};

export default Index;
