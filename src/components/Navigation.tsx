"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Logo } from "lucide-react";
import { useIsMobile } from "@/components/responsive/use-resize";
import { MobileNav } from "@/components/mobile/MobileNav";

export const Navigation: React.FC = () => {
  const t = useTranslations("navigation");
  const router = useRouter();
  const { breakpoint } = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold">{t("omniroute")}</h1>
          </div>

          {!breakpoint && (
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-full bg-white hover:bg-gray-200"
              aria-label={t("menu")}
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              {t("features")}
            </a>
            <a href="#routes" className="text-muted-foreground hover:text-primary transition-colors">
              {t("routes")}
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
              {t("pricing")}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              {t("tryFree")}
            </Button>
          </div>
        </div>
      </header>

      {breakpoint && mobileOpen && (
        <MobileNav
          isOpen={mobileOpen}
          onToggle={() => setMobileOpen(false)}
          links={[
            { label: t("features"), href: "#features" },
            { label: t("routes"), href: "#routes" },
            { label: t("pricing"), href: "#pricing" },
            { label: t("settings"), href: "/dashboard/settings" },
          ]}
        />
      )}
    </div>
  );
};