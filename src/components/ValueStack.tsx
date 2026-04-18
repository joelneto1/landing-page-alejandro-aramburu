import { useScrollReveal } from "@/hooks/useGSAP";
import { useCounterAnimation } from "@/hooks/useAnime";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowDown } from "lucide-react";

interface ValueStackProps {
  checkoutUrl: string;
}

export const ValueStack = ({ checkoutUrl }: ValueStackProps) => {
  const sectionRef = useScrollReveal();
  const counterRef = useCounterAnimation(25, 9, { duration: 1800, prefix: "US$ ", suffix: ".99" });
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4" ref={sectionRef}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="gsap-fade text-2xl md:text-4xl text-medical-blue-dark font-bold mb-8 sm:mb-10">
          {t("value_title")}
        </h2>

        <div className="gsap-fade space-y-2 sm:space-y-3 font-sans-body text-[1.05rem] sm:text-lg mb-6">
          <p className="text-muted-foreground"><span className="line-through">{t("value_ebook")}</span></p>
          <p className="text-muted-foreground"><span className="line-through">{t("value_exercises")}</span></p>
          <p className="text-muted-foreground"><span className="line-through">{t("value_list")}</span></p>
        </div>

        <div className="gsap-fade flex justify-center mb-4 sm:mb-6">
          <ArrowDown className="w-7 h-7 sm:w-8 sm:h-8 text-medical-blue animate-bounce" />
        </div>

        <div className="gsap-fade bg-gradient-to-br from-blue-50 via-sky-50 to-blue-50 border-2 border-medical-blue rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 mb-6 sm:mb-8 relative overflow-hidden">
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-urgency-red text-white text-[10px] sm:text-xs font-sans-body font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md">60% OFF</div>
          <p className="font-sans-body text-medical-blue-dark text-[1.05rem] sm:text-lg mb-3 font-medium">{t("value_today")}</p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
            <span className="text-2xl sm:text-3xl md:text-4xl font-sans-body text-muted-foreground line-through opacity-60">US$ 25</span>
            <span ref={counterRef} className="text-5xl sm:text-6xl md:text-8xl font-bold text-medical-blue-dark font-serif-display leading-none">
              US$ 25
            </span>
          </div>
          <p className="font-sans-body text-trust-green font-bold text-xs sm:text-sm mb-3 sm:mb-4">{t("value_savings")}</p>
          <div className="font-sans-body text-muted-foreground text-xs sm:text-sm space-y-0.5 sm:space-y-1">
            <p>{t("value_compare_1")}</p>
            <p>{t("value_compare_2")}</p>
            <p>{t("value_compare_3")}</p>
          </div>
        </div>

        <div className="gsap-fade">
          <a href={checkoutUrl} className="inline-block btn-shine cta-pulse font-sans-body font-bold text-white px-8 py-5 sm:px-12 sm:py-6 rounded-xl sm:rounded-2xl text-xl sm:text-2xl shadow-xl hover:scale-[1.03] transition-transform w-full sm:w-auto text-center" style={{ backgroundColor: 'hsl(152, 50%, 38%)' }}>
            {t("value_cta")}
          </a>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground font-sans-body">{t("value_secure")}</p>
        </div>
      </div>
    </section>
  );
};
