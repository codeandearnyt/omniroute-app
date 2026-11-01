/**
 * Provider service for handling model routing and fallback logic
 * Integrates with the OmniRoute routing engine
 */

import { Route, Combo, fetchRoutes, fetchCombos, routeRequest, checkProviderHealth, getProviderMetrics, syncPricing } from "./api";
import { useEffect, useState } from "react";
import { betterSqlite3 } from "better-sqlite3";

// Database path configuration
const DEFAULT_DATA_DIR = process.env.DATA_DIR || `${process.env.HOME}/.omniroute`;

// Initialize SQLite database
function getDb() {
  const dbPath = DEFAULT_DATA_DIR;
  return new betterSqlite3(dbPath);
}

/**
 * Get all available providers with their status
 */
export async function getProviders(): Promise<{
  id: string;
  name: string;
  category: "free" | "oauth" | "api-key";
  status: "active" | "idle" | "error";
  monthlyCost: string;
  quota: {
    used: number;
    limit: number;
    remaining: number;
  };
}> {
  const routes = await fetchRoutes();
  
  return routes.map((route) => ({
    id: route.provider,
    name: route.provider,
    category: determineProviderCategory(route.provider),
    status: route.status,
    monthlyCost: route.cost,
    quota: {
      used: Math.floor(Math.random() * 1000),
      limit: 10000,
      remaining: 10000 - Math.floor(Math.random() * 1000),
    },
  }));
}

/**
 * Determine provider category from provider ID
 */
function determineProviderCategory(providerId: string): "free" | "oauth" | "api-key" {
  const freeProviders = ["qoder", "qwen", "gemini-cli", "kiro"];
  const oauthProviders = ["claude-code", "codex", "github-copilot", "cursor"];
  
  if (freeProviders.some(p => providerId.includes(p))) {
    return "free";
  }
  if (oauthProviders.some(p => providerId.includes(p))) {
    return "oauth";
  }
  return "api-key";
}

/**
 * Get optimal route for a given task
 */
export async function getOptimalRoute(
  task: {
    type: "text" | "code" | "analysis" | "creative";
    priority?: "cost" | "speed" | "quality";
  },
  context?: Record<string, unknown>
) {
  const routes = await fetchRoutes();
  
  // Filter active routes
  const activeRoutes = routes.filter((r) => r.status === "active");
  
  if (activeRoutes.length === 0) {
    throw new Error("No active routes available");
  }
  
  // Sort based on priority
  const sortedRoutes = activeRoutes.sort((a, b) => {
    if (task.priority === "cost") {
      return a.cost.localeCompare(b.cost);
    }
    if (task.priority === "speed") {
      // Return random or based on model
      return Math.random() - 0.5;
    }
    return 0; // quality default
  });
  
  return sortedRoutes[0];
}

/**
 * Execute a routing request with fallback
 */
export async function executeWithFallback({
  message,
  task,
  maxFallbacks = 2,
}: {
  message: string;
  task: {
    type: "text" | "code" | "analysis" | "creative";
  };
  maxFallbacks?: number;
}) {
  const primaryRoute = await getOptimalRoute(task);
  
  try {
    const result = await routeRequest({
      message,
      context: {
        taskType: task.type,
        ...(context || {}),
      },
    });
    
    return {
      success: true,
      route: primaryRoute,
      data: result,
    };
  } catch (error) {
    // Attempt fallback routes
    const routes = await fetchRoutes();
    const fallbackRoutes = routes.filter(
      (r) => r.status === "active" && r.id !== primaryRoute.id
    );
    
    for (let i = 0; i < Math.min(maxFallbacks, fallbackRoutes.length); i++) {
      try {
        const result = await routeRequest({
          message,
          context: {
            taskType: task.type,
            fallback: true,
            ...(context || {}),
          },
        });
        
        return {
          success: true,
          route: fallbackRoutes[i],
          data: result,
          fallback: true,
        };
      } catch (fallbackError) {
        continue;
      }
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown routing error",
      primaryRoute,
    };
  }
}

/**
 * Real-time provider health monitoring hook
 */
export function useProviderMonitoring(providerId: string, interval = 30000) {
  const [health, setHealth] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  
  useEffect(() => {
    let cancelled = false;
    
    const fetchHealth = async () => {
      try {
        const [healthData, metricsData] = await Promise.all([
          checkProviderHealth(providerId),
          getProviderMetrics(providerId),
        ]);
        
        if (!cancelled) {
          setHealth(healthData);
          setMetrics(metricsData);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(`Failed to monitor provider ${providerId}:`, error);
        }
      }
    };
    
    // Initial fetch
    fetchHealth();
    
    // Set up interval
    const intervalId = setInterval(fetchHealth, interval);
    
    // Cleanup
    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [providerId, interval]);
  
  return { health, metrics };
}

/**
 * Sync pricing data from the backend
 */
export async function refreshPricing() {
  try {
    const result = await syncPricing();
    return result;
  } catch (error) {
    console.error("Pricing sync failed:", error);
    throw error;
  }
}

export { getDb, DEFAULT_DATA_DIR };