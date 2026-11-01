import DashboardHeader from "@/components/organisms/DashboardHeader";
import RouteExplorer from "@/components/organisms/RouteExplorer";

export default function DashboardPage() {
  const routes = [
    {
      id: "1",
      title: "Primary Route",
      provider: "OpenAI GPT-4",
      status: "active",
      cost: "$0.03/1K tokens",
    },
    {
      id: "2",
      title: "Fallback Route",
      provider: "Anthropic Claude",
      status: "idle",
      cost: "$0.02/1K tokens",
    },
    {
      id: "3",
      title: "Cost Optimized",
      provider: "Groq Llama",
      status: "idle",
      cost: "$0.01/1K tokens",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <RouteExplorer routes={routes} />
      </main>
    </div>
  );
}