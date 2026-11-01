"use client";

import { useTranslations } from "next-intl";

export const HeroSection: React.FC = () => {
  const t = useTranslations("hero");

  return (
    <div className="relative pt-20 pb-32">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 break-words">
          {t("title")}
        </h2>
        <p className="text-2xl sm:text-3xl text-gray-400 mb-8 max-w-2xl mx-auto">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {}}
            className="w-full sm:w-auto h-12 px-8 rounded-lg bg-white text-black text-lg font-bold transition-all shadow-md"
          >
            {t("getStarted")}
          </button>
          <button
            onClick={() => {}}
            className="w-full sm:w-auto h-12 px-8 rounded-lg border border-white/20 text-white text-lg font-bold transition-all"
          >
            {t("learnMore")}
          </button>
        </div>
      </div>
    </div>
  );
};