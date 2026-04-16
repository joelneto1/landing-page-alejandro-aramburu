import { useScrollReveal, useSlideIn } from "@/hooks/useGSAP";
import { useBorderDraw } from "@/hooks/useAnime";
import { useLanguage } from "@/i18n/LanguageContext";

interface OriginProps {
  doctorImage: string;
}

export const OriginStory = ({ doctorImage }: OriginProps) => {
  const sectionRef = useScrollReveal({ stagger: 0.18, duration: 1 });
  const imageRef = useSlideIn("left", { distance: 50, duration: 1 });
  const highlightRef = useBorderDraw({ duration: 900 });
  const { t } = useLanguage();

  return (
    <section className="bg-section-alt py-12 sm:py-16 md:py-24 px-4" ref={sectionRef}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8 sm:gap-10 items-start">
        <div ref={imageRef} className="md:col-span-2 flex flex-col items-center md:sticky md:top-8">
          <div className="relative max-w-[240px] sm:max-w-none">
            <div className="absolute -inset-3 bg-gradient-to-br from-blue-100 to-sky-100 rounded-3xl -rotate-2" />
            <img src={doctorImage} alt={t("origin_doctor_name")} className="relative rounded-2xl shadow-lg w-full z-10" loading="lazy" width={640} height={800} />
          </div>
          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-sm sm:text-base font-sans-body font-bold text-foreground">{t("origin_doctor_name")}</p>
            <p className="text-xs sm:text-sm font-sans-body text-muted-foreground mt-1">{t("origin_doctor_role")}</p>
            <p className="text-xs sm:text-sm font-sans-body text-medical-blue font-medium mt-0.5">{t("origin_doctor_exp")}</p>
          </div>
        </div>

        <div className="md:col-span-3 space-y-4 sm:space-y-6 font-sans-body text-foreground leading-relaxed">
          <h2 className="gsap-fade text-2xl sm:text-2xl md:text-4xl text-medical-blue-dark font-bold leading-snug">
            {t("origin_title")}
          </h2>
          <p className="gsap-fade text-[0.95rem] sm:text-base" dangerouslySetInnerHTML={{ __html: t("origin_p1") }} />
          <p className="gsap-fade text-[0.95rem] sm:text-base" dangerouslySetInnerHTML={{ __html: t("origin_p2") }} />
          <p className="gsap-fade text-[0.95rem] sm:text-base" dangerouslySetInnerHTML={{ __html: t("origin_p3") }} />

          <div ref={highlightRef} className="bg-white border-l-4 border-medical-blue rounded-r-xl p-4 sm:p-5 shadow-sm">
            <p className="text-foreground leading-relaxed text-[0.95rem] sm:text-base" dangerouslySetInnerHTML={{ __html: t("origin_highlight") }} />
          </div>

          <p className="gsap-fade text-[0.95rem] sm:text-base" dangerouslySetInnerHTML={{ __html: t("origin_p4") }} />
          <p className="gsap-fade text-[1.05rem] sm:text-lg font-medium text-medical-blue-dark border-b-2 border-medical-blue/20 pb-4 sm:pb-6">
            {t("origin_p5")}
          </p>
        </div>
      </div>
    </section>
  );
};
