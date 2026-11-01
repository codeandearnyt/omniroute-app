"use client";

import { SearchBar } from "@/components/molecules/SearchBar";
import { RouteCard } from "@/components/molecules/RouteCard";
import { StatusChip } from "@/components/molecules/StatusChip";
import { useState } from "react";

type RouteExplorerProps = {
  routes: Array<{
    id: string;
    title: string;
    provider: string;
    status: "active" | "idle" | "error";
    cost: string;
  }>;
};

export const RouteExplorer: React.FC<RouteExplorerProps> = ({
  routes,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoutes = routes.filter((route) =>
    route.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <SearchBar
        placeholder="Search routes..."
        onSearch={(query) => setSearchQuery(query)}
        disabled={false}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRoutes.map((route) => (
          <RouteCard
            key={route.id}
            title={route.title}
            provider={route.provider}
            status={route.status}
            cost={route.cost}
          />
        ))}
      </div>
    </div>
  );
};