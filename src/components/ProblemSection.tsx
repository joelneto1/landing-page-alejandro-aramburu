import { AlertTriangle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useGSAP";
import { useStaggerReveal } from "@/hooks/useAnime";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

const problems: { title: TranslationKey; text: TranslationKey }[] = [
  { title: "problem_1_title", text: "problem_1_text" },
  { title: "problem_2_title", text: "problem_2_text" },
  { title: "problem_3_title", text: "problem_3_text" },
];

export const ProblemSection = () => {
  const sectionRef = useScrollReveal();
  const cardsRef = useStaggerReveal({ translateY: 40, stagger: 150 });
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 max-w-4xl mx-auto" ref={sectionRef}>
      <h2 className="gsap-fade text-2xl sm:text-2xl md:text-4xl text-center text-medical-blue-dark mb-3 sm:mb-4 font-bold">
        {t("problem_title")}
      </h2>
      <p className="gsap-fade text-center text-muted-foreground font-sans-body mb-8 sm:mb-12 text-[1.05rem] sm:text-lg">
        {t("problem_subtitle")}
      </p>

      <div className="space-y-4 sm:space-y-6" ref={cardsRef}>
        {problems.map((item, i) => (
          <div key={i} data-anime="stagger" className="flex gap-3 sm:gap-5 bg-card p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-urgency-red" />
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 sm:mb-2 font-serif-display">{t(item.title)}</h3>
              <p className="font-sans-body text-muted-foreground leading-relaxed text-[0.95rem] sm:text-base">{t(item.text)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="gsap-fade mt-8 sm:mt-12 text-center bg-gradient-to-br from-blue-50 to-sky-50 p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl border border-medical-blue/15 shadow-sm">
        <p className="text-[1.05rem] sm:text-lg font-sans-body text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t("problem_callout") }} />
      </div>
    </section>
  );
};
