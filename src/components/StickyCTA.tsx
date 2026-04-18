import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface StickyCTAProps {
  checkoutUrl: string;
}

export const StickyCTA = ({ checkoutUrl }: StickyCTAProps) => {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t shadow-2xl px-3 sm:px-4 py-2.5 sm:py-3 sticky-cta ${visible ? "visible" : ""}`}>
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
        <div className="hidden sm:block flex-shrink-0">
          <p className="font-sans-body text-sm font-bold text-foreground">{t("sticky_title")}</p>
          <p className="font-sans-body text-xs text-muted-foreground">
            <span className="line-through">US$ 25</span> <strong className="text-medical-blue-dark">US$ 9.99</strong>
          </p>
        </div>
        <p className="sm:hidden font-sans-body text-xs text-foreground flex-shrink-0">
          <span className="line-through text-muted-foreground">US$ 25</span>{" "}
          <strong className="text-medical-blue-dark text-sm">US$ 9.99</strong>
        </p>
        <a href={checkoutUrl} className="inline-block btn-shine cta-pulse font-sans-body font-bold text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-base shadow-lg hover:scale-[1.02] transition-transform whitespace-nowrap flex-shrink-0" style={{ backgroundColor: 'hsl(152, 50%, 38%)' }}>
          {t("sticky_cta")}
        </a>
      </div>
    </div>
  );
};
