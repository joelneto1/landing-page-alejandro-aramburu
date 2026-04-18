import { BookOpen, Dumbbell, Apple } from "lucide-react";
import { useScrollReveal, useSlideIn } from "@/hooks/useGSAP";
import { useStaggerReveal } from "@/hooks/useAnime";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

interface WhatYouGetProps {
  bundleImage: string;
}

const items: { icon: typeof BookOpen; title: TranslationKey; desc: TranslationKey; value: string; color: string }[] = [
  { icon: BookOpen, title: "item_1_title", desc: "item_1_desc", value: "US$ 13", color: "from-blue-500 to-blue-600" },
  { icon: Dumbbell, title: "item_2_title", desc: "item_2_desc", value: "US$ 7", color: "from-emerald-500 to-emerald-600" },
  { icon: Apple, title: "item_3_title", desc: "item_3_desc", value: "US$ 5", color: "from-amber-500 to-orange-500" },
];

export const WhatYouGet = ({ bundleImage }: WhatYouGetProps) => {
  const sectionRef = useScrollReveal();
  const imageRef = useSlideIn("left", { distance: 40 });
  const cardsRef = useStaggerReveal({ translateY: 35, stagger: 130 });
  const { t } = useLanguage();

  return (
    <section className="bg-section-alt py-12 sm:py-16 md:py-24 px-4" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <h2 className="gsap-fade text-2xl sm:text-2xl md:text-4xl text-center text-medical-blue-dark font-bold mb-3 sm:mb-4">
          {t("whatyouget_title")}
        </h2>
        <p className="gsap-fade text-center text-muted-foreground font-sans-body mb-8 sm:mb-12 text-base sm:text-lg">
          {t("whatyouget_subtitle")}
        </p>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
          <div ref={imageRef} className="relative">
            <div className="absolute -inset-3 bg-gradient-to-br from-amber-100/50 to-yellow-100/50 rounded-3xl -rotate-1" />
            <img src={bundleImage} alt={t("whatyouget_img_alt")} className="relative rounded-xl w-full z-10 shadow-lg" loading="lazy" width={800} height={640} />
          </div>
          <div className="space-y-4 sm:space-y-5" ref={cardsRef}>
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} data-anime="stagger" className="flex gap-3 sm:gap-4 bg-card p-4 sm:p-5 rounded-xl sm:rounded-2xl border shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground font-serif-display text-lg sm:text-lg leading-snug">{t(item.title)}</h3>
                    <p className="font-sans-body text-muted-foreground text-sm sm:text-sm leading-relaxed mt-1 sm:mt-1.5">{t(item.desc)}</p>
                    <p className="font-sans-body text-medical-blue font-bold text-sm sm:text-sm mt-1.5 sm:mt-2">{t("item_value")} {item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
