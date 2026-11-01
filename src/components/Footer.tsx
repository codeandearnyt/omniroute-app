"use client";

import { useTranslations } from "next-intl";

export const Footer: React.FC = () => {
  const t = useTranslations("footer");

  return (
    <footer className="border-t bg-card/80 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-medium mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {t("about")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {t("careers")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">{t("product")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {t("features")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {t("integrations")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">{t("resources")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {t("docs")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {t("apiReference")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {t("twitter")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {t("linkedin")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {t("discord")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-xs text-gray-500">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};