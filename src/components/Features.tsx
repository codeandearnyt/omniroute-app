"use client";

import { useTranslations } from "next-intl";

type Feature = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export const Features: React.FC = () => {
  const t = useTranslations("features");

  const features: Feature[] = [
    {
      id: 1,
      title: t("feature1Title"),
      description: t("feature1Desc"),
      icon: "Lightning",
    },
    {
      id: 2,
      title: t("feature2Title"),
      description: t("feature2Desc"),
      icon: "Shield",
    },
    {
      id: 3,
      title: t("feature3Title"),
      description: t("feature3Desc"),
      icon: "Zap",
    },
  ];

  return (
    <div className="py-16 bg-white/5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="group rounded-lg bg-card p-6 hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mb-4">
              {feature.icon}
            </div>
            <h3 className="font-medium mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};