import { ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useGSAP";
import { usePulseReveal, useParagraphReveal } from "@/hooks/useAnime";
import { useLanguage } from "@/i18n/LanguageContext";

export const GuaranteeSection = () => {
  const sectionRef = useScrollReveal({ stagger: 0.18, duration: 1 });
  const sealRef = usePulseReveal({ scale: 0.5, duration: 900 });
  const paragraphsRef = useParagraphReveal({ stagger: 200 });
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4" ref={sectionRef}>
      <div className="max-w-3xl mx-auto">
        <div className="gsap-fade bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-trust-green/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden">
          <div className="hidden sm:block absolute -top-12 -right-12 w-40 h-40 border-[16px] border-trust-green/5 rounded-full" />
          <div className="hidden sm:block absolute -bottom-8 -left-8 w-28 h-28 border-[12px] border-trust-green/5 rounded-full" />

          <div className="relative z-10">
            <div ref={sealRef} className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-lg seal-glow mb-5 sm:mb-6">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-trust-green" />
            </div>

            <h2 className="text-xl sm:text-2xl md:text-4xl text-medical-blue-dark font-bold mb-4 sm:mb-6">
              {t("guarantee_title")}
            </h2>
            <div ref={paragraphsRef} className="font-sans-body text-foreground leading-relaxed space-y-3 sm:space-y-4 text-base sm:text-lg max-w-2xl mx-auto">
              <p data-anime="paragraph" dangerouslySetInnerHTML={{ __html: t("guarantee_p1") }} />
              <p data-anime="paragraph" dangerouslySetInnerHTML={{ __html: t("guarantee_p2") }} />
              <p data-anime="paragraph" dangerouslySetInnerHTML={{ __html: t("guarantee_p3") }} />
              <p data-anime="paragraph" className="font-semibold text-medical-blue-dark text-lg sm:text-xl pt-2">{t("guarantee_p4")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
