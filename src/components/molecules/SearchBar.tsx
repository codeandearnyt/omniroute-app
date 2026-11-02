"use client";

import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { useState } from "react";

type SearchBarProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
  disabled?: boolean;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search providers or models...",
  onSearch,
  disabled,
}) => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative flex items-center rounded-lg border bg-background px-3">
      <Icon size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </Icon>
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(value) => setQuery(value)}
        disabled={disabled}
      />
      <Button
        variant="outline"
        size="sm"
        disabled={!query || disabled}
        onClick={() => onSearch(query)}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        <Icon size="sm">Search</Icon>
      </Button>
    </div>
  );
};
