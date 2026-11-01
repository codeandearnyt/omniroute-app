"use client";

import { useTranslations } from "next-intl";

export const GetStarted: React.FC = () => {
  const t = useTranslations("getStarted");

  return (
    <div className="py-16 bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="w-full sm:w-auto h-12 px-8 rounded-lg bg-white text-black text-lg font-bold transition-all shadow-md"
          >
            {t("startNow")}
          </button>
          <button
            className="w-full sm:w-auto h-12 px-8 rounded-lg border border-white/20 text-white text-lg font-bold transition-all"
          >
            {t("watchDemo")}
          </button>
        </div>
      </div>
    </div>
  );
};