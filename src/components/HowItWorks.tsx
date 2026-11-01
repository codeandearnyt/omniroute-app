"use client";

import { useTranslations } from "next-intl";

export const HowItWorks: React.FC = () => {
  const t = useTranslations("howItWorks");

  return (
    <div className="py-16 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0"
              >
                {num}
              </div>
              <div>
                <h3 className="font-medium mb-1">{t(`step${num}`)}</h3>
                <p className="text-sm text-gray-400">
                  {t(`step${num}Desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};