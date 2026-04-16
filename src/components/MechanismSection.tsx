import { Activity, Salad, Moon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useGSAP";
import { useStaggerReveal } from "@/hooks/useAnime";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

interface MechanismProps {
  bloodFlowImageEs: string;
  bloodFlowImageEn: string;
}

const pillars: { step: TranslationKey; title: TranslationKey; icon: typeof Activity; desc: TranslationKey; accent: string }[] = [
  { step: "pillar_1_step", title: "pillar_1_title", icon: Activity, desc: "pillar_1_desc", accent: "from-blue-500 to-blue-600" },
  { step: "pillar_2_step", title: "pillar_2_title", icon: Salad, desc: "pillar_2_desc", accent: "from-emerald-500 to-emerald-600" },
  { step: "pillar_3_step", title: "pillar_3_title", icon: Moon, desc: "pillar_3_desc", accent: "from-violet-500 to-violet-600" },
];

export const MechanismSection = ({ bloodFlowImageEs, bloodFlowImageEn }: MechanismProps) => {
  const sectionRef = useScrollReveal();
  const pillarsRef = useStaggerReveal({ translateY: 50, stagger: 150 });
  const { t, lang } = useLanguage();
  const bloodFlowImage = lang === "en" ? bloodFlowImageEn : bloodFlowImageEs;

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <h2 className="gsap-fade text-2xl sm:text-2xl md:text-4xl text-center text-medical-blue-dark font-bold mb-3 sm:mb-4">
          {t("mechanism_title")}
        </h2>
        <p className="gsap-fade text-center text-muted-foreground font-sans-body mb-8 sm:mb-12 text-base sm:text-lg max-w-3xl mx-auto">
          {t("mechanism_subtitle")}
        </p>

        <div className="gsap-fade grid md:grid-cols-2 gap-6 sm:gap-10 items-center mb-10 sm:mb-14">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-blue-100/60 to-sky-100/60 rounded-2xl" />
            <div className="relative rounded-2xl shadow-lg overflow-hidden z-10 border-4 border-white">
              <img
                src={bloodFlowImage}
                alt={t("mechanism_img_alt")}
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4 font-sans-body">
            <p className="text-foreground leading-relaxed text-[1.05rem] sm:text-lg">{t("mechanism_body_1")}</p>
            <p className="text-foreground leading-relaxed text-[1.05rem] sm:text-lg" dangerouslySetInnerHTML={{ __html: t("mechanism_body_2") }} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6" ref={pillarsRef}>
          {pillars.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} data-anime="stagger" className="bg-card p-5 sm:p-7 rounded-xl sm:rounded-2xl border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-center group">
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.accent} mb-4 sm:mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <p className="text-xs sm:text-xs font-sans-body text-medical-blue font-bold uppercase tracking-[0.15em] mb-1 sm:mb-1.5">{t(item.step)}</p>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 font-serif-display">{t(item.title)}</h3>
                <p className="font-sans-body text-muted-foreground leading-relaxed text-sm sm:text-sm">{t(item.desc)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
