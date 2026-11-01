"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

type MobileNavProps = {
  isOpen: boolean;
  onToggle: () => void;
  links: Array<{ label: string; href: string }>;
};

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onToggle,
  links,
}) => {
  const t = useTranslations("mobileNav");

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transform translate-x-full duration-500 ease-out md:hidden">
      <div className="flex flex-col h-full p-6 pt-20 gap-6">
        <button
          onClick={onToggle}
          className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-gray-200"
          aria-label={t("closeMenu")}
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">{t("menu")}</h2>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 px-2 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-white/10">
          <Button
            variant="outline"
            size="full"
            onClick={onToggle}
            className="w-full"
          >
            {t("done")}
          </Button>
        </div>
      </div>
    </div>
  );
};