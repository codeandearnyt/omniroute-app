"use client";

import { StatusChip } from "@/components/molecules/StatusChip";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";
import { MenuIcon, SettingsIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const DashboardHeader: React.FC = () => {
  const t = useTranslations("dashboard");
  const router = useRouter();

  return (
    <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Icon size="md" className="text-white">
              {t("appIcon").toUpperCase()}
            </Icon>
          </div>
          <h1 className="text-xl font-bold">{t("title")}</h1>
        </div>

        <div className="flex items-center gap-4">
          <StatusChip variant="free">Free</StatusChip>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/settings")}
            aria-label={t("settings")}
          >
            <SettingsIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={async () => {
              try {
                const res = await fetch("/api/auth/logout", { method: "POST" });
                if (res.ok) {
                  router.push("/login");
                  router.refresh();
                }
              } catch (err) {
                console.error("Failed to logout:", err);
              }
            }}
            aria-label={t("logout")}
          >
            <LogOutIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
