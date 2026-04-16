import { useLanguage } from "@/i18n/LanguageContext";

export const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-[60]">
      <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-border overflow-hidden text-xs font-sans-body font-semibold">
        <button
          onClick={() => setLang("es")}
          className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 transition-colors ${
            lang === "es"
              ? "bg-medical-blue-dark text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          ES
        </button>
        <button
          onClick={() => setLang("en")}
          className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 transition-colors ${
            lang === "en"
              ? "bg-medical-blue-dark text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};
