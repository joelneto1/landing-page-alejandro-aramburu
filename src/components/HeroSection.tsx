import { useHeroTimeline } from "@/hooks/useGSAP";
import { useLanguage } from "@/i18n/LanguageContext";
import { Shield, Clock, Zap } from "lucide-react";

interface HeroProps {
  heroImage: string;
  checkoutUrl: string;
}

export const HeroSection = ({ heroImage, checkoutUrl }: HeroProps) => {
  const ref = useHeroTimeline();
  const { t } = useLanguage();

  return (
    <section className="bg-hero-gradient relative overflow-hidden grain-overlay">
      <div className="hidden sm:block absolute top-[-120px] right-[-80px] w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute bottom-[-80px] left-[-60px] w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 py-10 sm:py-16 md:py-24 grid md:grid-cols-2 gap-6 sm:gap-10 items-center relative z-10">
        <div className="text-primary-foreground space-y-4 sm:space-y-6">
          <p className="hero-subtitle text-sm sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] font-sans-body opacity-80 flex items-center gap-2">
            <span className="w-6 sm:w-8 h-px bg-white/60 inline-block" />
            {t("hero_doctor_title")}
          </p>
          <h1 className="hero-headline text-[1.7rem] sm:text-3xl md:text-5xl lg:text-[3.4rem] leading-[1.15] font-bold text-shadow-hero">
            {t("hero_headline_1")} <span className="text-yellow-300">{t("hero_headline_highlight")}</span> {t("hero_headline_2")}
          </h1>
          <p className="hero-body text-[1.05rem] sm:text-lg md:text-xl font-sans-body opacity-90 leading-relaxed">
            {t("hero_subheadline")}
          </p>

          <div className="hero-badges flex flex-wrap gap-2 sm:gap-4 text-sm sm:text-sm font-sans-body opacity-85">
            <span className="flex items-center gap-1 sm:gap-1.5 bg-white/10 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t("hero_badge_guarantee")}
            </span>
            <span className="flex items-center gap-1 sm:gap-1.5 bg-white/10 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t("hero_badge_time")}
            </span>
            <span className="flex items-center gap-1 sm:gap-1.5 bg-white/10 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t("hero_badge_access")}
            </span>
          </div>

          <div className="hero-cta-wrap">
            <a href={checkoutUrl} className="inline-block btn-shine cta-gold-pulse font-sans-body font-bold text-gray-900 px-6 py-4 sm:px-10 sm:py-5 rounded-xl text-lg sm:text-xl shadow-xl hover:scale-[1.03] transition-transform w-full sm:w-auto text-center" style={{ backgroundColor: 'hsl(38, 85%, 52%)' }}>
              {t("hero_cta")}
            </a>
            <p className="text-sm sm:text-sm font-sans-body opacity-70 mt-3">{t("hero_secure")}</p>
          </div>
        </div>

        <div className="hero-image-wrap relative">
          <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl" />
          <img src={heroImage} alt={t("hero_img_alt")} className="rounded-2xl shadow-2xl w-full relative z-10" width={1280} height={720} />
          <div className="hero-float-badge absolute -bottom-3 -left-2 sm:-bottom-6 sm:-left-6 bg-white rounded-xl sm:rounded-2xl shadow-xl p-2.5 sm:p-4 z-20">
            <p className="text-xs sm:text-sm font-sans-body font-bold text-medical-blue-dark">{t("hero_patients")}</p>
            <p className="text-[10px] sm:text-xs font-sans-body text-muted-foreground">{t("hero_patients_sub")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
