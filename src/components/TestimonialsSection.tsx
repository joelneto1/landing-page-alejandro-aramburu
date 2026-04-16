import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useGSAP";
import { useStaggerReveal, useStarFill } from "@/hooks/useAnime";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

const testimonials: { text: TranslationKey; name: TranslationKey; location: TranslationKey }[] = [
  { text: "testimonial_1_text", name: "testimonial_1_name", location: "testimonial_1_location" },
  { text: "testimonial_2_text", name: "testimonial_2_name", location: "testimonial_2_location" },
  { text: "testimonial_3_text", name: "testimonial_3_name", location: "testimonial_3_location" },
];

export const TestimonialsSection = () => {
  const sectionRef = useScrollReveal();
  const cardsRef = useStaggerReveal({ translateY: 40, stagger: 120 });
  const { t } = useLanguage();

  return (
    <section className="bg-section-alt py-12 sm:py-16 md:py-24 px-4" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <h2 className="gsap-fade text-2xl sm:text-2xl md:text-4xl text-center text-medical-blue-dark font-bold mb-3 sm:mb-4">
          {t("testimonials_title")}
        </h2>
        <p className="gsap-fade text-center text-muted-foreground font-sans-body mb-8 sm:mb-12 text-base sm:text-lg">
          {t("testimonials_subtitle")}
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6" ref={cardsRef}>
          {testimonials.map((item, i) => (
            <TestimonialCard key={i} item={item} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

function TestimonialCard({ item, t }: { item: { text: TranslationKey; name: TranslationKey; location: TranslationKey }; t: (k: TranslationKey) => string }) {
  const starsRef = useStarFill();

  return (
    <div data-anime="stagger" className="bg-card p-5 sm:p-7 rounded-xl sm:rounded-2xl border shadow-sm hover:shadow-md transition-shadow relative">
      <Quote className="absolute top-4 right-4 sm:top-5 sm:right-5 w-6 h-6 sm:w-8 sm:h-8 text-medical-blue/10" />
      <div className="flex gap-0.5 mb-3 sm:mb-4" ref={starsRef}>
        {[...Array(5)].map((_, j) => (
          <Star key={j} data-star className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-warm-gold" />
        ))}
      </div>
      <p className="font-sans-body text-foreground leading-relaxed mb-4 sm:mb-5 text-sm sm:text-sm italic">
        "{t(item.text)}"
      </p>
      <div className="pt-3 sm:pt-4 border-t border-border">
        <p className="font-sans-body font-bold text-foreground text-sm sm:text-sm">{t(item.name)}</p>
        <p className="font-sans-body text-muted-foreground text-xs sm:text-xs mt-0.5">{t(item.location)}</p>
      </div>
    </div>
  );
}
