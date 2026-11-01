/**
 * API client for OmniRoute backend integration
 * Handles routing, provider requests, and combo management
 */

import { betterSqlite3 } from "better-sqlite3";
import { z } from "zod";

// API base URL - configurable via environment
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:20128";

// Zod schemas for API validation
export const RouteSchema = z.object({
  id: z.string(),
  title: z.string(),
  provider: z.string(),
  model: z.string(),
  status: z.enum(["active", "idle", "error"]),
  cost: z.string(),
});

export type Route = z.infer<typeof RouteSchema>;

export const ComboSchema = z.object({
  id: z.string(),
  name: z.string(),
  routes: z.array(RouteSchema),
  createdAt: z.date(),
});

export type Combo = z.infer<typeof ComboSchema>;

/**
 * Fetch available routes from the backend
 */
export async function fetchRoutes(): Promise<Route[]> {
  const response = await fetch(`${API_BASE}/api/routes`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch routes");
  }

  const data = await response.json();
  return RouteSchema.array().parse(data);
}

/**
 * Fetch available combos from the backend
 */
export async function fetchCombos(): Promise<Combo[]> {
  const response = await fetch(`${API_BASE}/api/combos`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch combos");
  }

  const data = await response.json;
  return ComboSchema.array().parse(data);
}

/**
 * Route a request through the optimal provider
 */
export async function routeRequest({
  message,
  context,
}: {
  message: string;
  context?: Record<string, unknown>;
}) {
  const response = await fetch(`${API_BASE}/api/route`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, context }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Routing failed");
  }

  return response.json();
}

/**
 * Check provider health and quotas
 */
export async function checkProviderHealth(providerId: string) {
  const response = await fetch(
    `${API_BASE}/api/provider/${providerId}/health`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to check provider health");
  }

  return response.json();
}

/**
 * Get provider metrics and performance data
 */
export async function getProviderMetrics(providerId: string) {
  const response = await fetch(
    `${API_BASE}/api/provider/${providerId}/metrics`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get provider metrics");
  }

  return response.json();
}

/**
 * Sync pricing data from LiteLLM
 */
export async function syncPricing() {
  const response = await fetch(`${API_BASE}/api/pricing/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to sync pricing");
  }

  return response.json();
}

export { API_BASE };