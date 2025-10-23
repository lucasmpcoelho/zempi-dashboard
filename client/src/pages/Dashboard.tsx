import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, LayoutGrid, Beef, Heart, Pill } from "lucide-react";
import TabNavigation, { Tab } from "@/components/ui/TabNavigation";
import OverviewPanel from "@/components/panels/OverviewPanel";
import ProteinPanel from "@/components/panels/ProteinPanel";
import WellnessPanel from "@/components/panels/WellnessPanel";
import TreatmentPanel from "@/components/panels/TreatmentPanel";

const tabs: Tab[] = [
  { id: "overview", label: "Resumo", icon: LayoutGrid },
  { id: "protein", label: "Proteína", icon: Beef },
  { id: "wellness", label: "Bem-estar", icon: Heart },
  { id: "treatment", label: "Tratamento", icon: Pill }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch user to check auth
  const { data: user, isLoading: userLoading, error } = useQuery({
    queryKey: ["/api/user"]
  });

  console.log("Dashboard render:", { user, isLoading: userLoading, error, activeTab });

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error loading user:", error);
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">Erro ao carregar usuário</p>
          <pre className="text-xs">{JSON.stringify(error, null, 2)}</pre>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">Nenhum usuário encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-b from-primary/5 to-transparent px-5 pt-8 pb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Olá,</p>
          <h1 className="text-3xl font-bold tracking-tight">{user.profile?.name?.split(' ')[0] || 'Usuário'}</h1>
        </div>
      </header>

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Content */}
      <main className="px-5">
        {activeTab === "overview" && <OverviewPanel />}
        {activeTab === "protein" && <ProteinPanel />}
        {activeTab === "wellness" && <WellnessPanel />}
        {activeTab === "treatment" && <TreatmentPanel />}
      </main>
    </div>
  );
}
