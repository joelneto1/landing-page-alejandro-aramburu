import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export const AlertBar = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 47, s: 33 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="bg-urgency-red py-3 px-3 sm:px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-1.5 sm:flex-row sm:gap-4">
        <p className="text-xs sm:text-base font-sans-body font-bold text-white tracking-wide text-center">
          {t("alert_expires")}
        </p>
        <div className="flex items-center gap-1.5 font-sans-body font-bold text-white">
          <span className="bg-black/20 rounded-md px-2 py-1 text-sm sm:text-lg tabular-nums countdown-pulse min-w-[32px] text-center">
            {pad(timeLeft.h)}
          </span>
          <span className="text-sm sm:text-lg opacity-80">:</span>
          <span className="bg-black/20 rounded-md px-2 py-1 text-sm sm:text-lg tabular-nums countdown-pulse min-w-[32px] text-center">
            {pad(timeLeft.m)}
          </span>
          <span className="text-sm sm:text-lg opacity-80">:</span>
          <span className="bg-black/20 rounded-md px-2 py-1 text-sm sm:text-lg tabular-nums countdown-pulse min-w-[32px] text-center">
            {pad(timeLeft.s)}
          </span>
        </div>
        <p className="text-[10px] sm:text-sm font-sans-body text-white/85 text-center leading-tight">
          {t("alert_subtitle")}
        </p>
      </div>
    </div>
  );
};
