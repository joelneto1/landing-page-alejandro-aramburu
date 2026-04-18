import { useScrollReveal } from "@/hooks/useGSAP";
import { useCounterAnimation } from "@/hooks/useAnime";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  checkoutUrl: string;
}

export const FinalCTA = ({ checkoutUrl }: FinalCTAProps) => {
  const sectionRef = useScrollReveal({ stagger: 0.15, y: 30 });
  const priceRef = useCounterAnimation(25, 9, { duration: 1400, prefix: "US$ ", suffix: ".99" });
  const { t } = useLanguage();

  return (
    <section className="bg-hero-gradient py-12 sm:py-16 md:py-24 px-4 relative overflow-hidden grain-overlay">
      <div className="hidden sm:block absolute top-[-100px] left-[10%] w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute bottom-[-60px] right-[15%] w-[250px] h-[250px] rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div ref={sectionRef} className="max-w-3xl mx-auto text-center text-primary-foreground relative z-10">
        <h2 className="gsap-fade text-2xl sm:text-2xl md:text-4xl font-bold mb-4 sm:mb-6 text-shadow-hero leading-snug">
          {t("final_title")}
        </h2>
        <p className="gsap-fade font-sans-body text-[1.05rem] sm:text-lg opacity-90 leading-relaxed mb-4 sm:mb-6 max-w-2xl mx-auto">
          {t("final_p1")}
        </p>
        <p className="font-sans-body text-[1.15rem] sm:text-xl opacity-95 leading-relaxed mb-8 sm:mb-10 font-medium">
          {t("final_p2_pre")} <strong ref={priceRef} className="text-yellow-300 text-xl sm:text-2xl">US$ 25</strong>.
        </p>
        <div className="gsap-fade">
          <a href={checkoutUrl} className="inline-flex items-center justify-center gap-2 btn-shine cta-gold-pulse font-sans-body font-bold text-gray-900 px-8 py-5 sm:px-12 sm:py-6 rounded-xl sm:rounded-2xl text-xl sm:text-2xl shadow-xl hover:scale-[1.03] transition-transform w-full sm:w-auto text-center" style={{ backgroundColor: 'hsl(38, 85%, 52%)' }}>
            {t("final_cta")}
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
};
