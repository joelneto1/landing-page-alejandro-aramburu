import { useLanguage } from "@/i18n/LanguageContext";

export const FooterSection = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-medical-blue-dark py-10 px-4">
      <div className="max-w-4xl mx-auto text-center font-sans-body text-primary-foreground space-y-3">
        <p className="text-sm opacity-80 font-medium">
          © {new Date().getFullYear()} {t("footer_copyright")}
        </p>
        <div className="w-12 h-px bg-white/20 mx-auto" />
        <p className="text-xs opacity-60 leading-relaxed max-w-2xl mx-auto">
          {t("footer_disclaimer")}
        </p>
      </div>
    </footer>
  );
};
