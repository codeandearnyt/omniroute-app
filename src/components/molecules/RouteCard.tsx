"use client";

import { motion } from "framer-motion";
import { StatusChip } from "@/components/molecules/StatusChip";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface RouteCardProps {
  title: string;
  provider: string;
  status?: "active" | "idle" | "error";
  cost?: string;
  onSelect?: () => void;
  className?: string;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  title,
  provider,
  status = "idle",
  cost,
  onSelect,
  className,
}) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800",
    idle: "bg-gray-100 text-gray-700",
    error: "bg-red-100 text-red-800",
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 4 20px rgba(0,0,0,0.1)" }}
      whileTap={{ y: 2 }}
      className={cn(
        "group rounded-lg border bg-card p-4 hover:bg-muted transition-all cursor-pointer",
        "shadow-sm",
        statusStyles[status],
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <Icon size="sm" className="text-muted-foreground">
            {provider.charAt(0).toUpperCase()}
          </Icon>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{provider}</p>
        </div>
      </div>

      {cost && (
        <span className="mt-2 inline-flex items-center rounded-full bg-background px-2 py-1 text-xs font-medium">
          {cost}
        </span>
      )}

      {onSelect && (
        <StatusChip variant="outline" className="ml-auto">
          Select
        </StatusChip>
      )}
    </motion.div>
  );
};
