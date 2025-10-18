import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MetricCard from "@/components/MetricCard";
import MacroCard from "@/components/MacroCard";
import MacroGoalsDialog from "@/components/MacroGoalsDialog";
import NutritionSummary from "@/components/NutritionSummary";
import MedicationTracker from "@/components/MedicationTracker";
import MoodTracker from "@/components/MoodTracker";
import PersonalizedAlert from "@/components/PersonalizedAlert";
import EducationalCard from "@/components/EducationalCard";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Weight, 
  Target,
  TrendingDown,
  Lightbulb,
  Apple,
  Activity,
  User,
  Calendar,
  Loader2,
  Home,
  BookOpen,
  Settings
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { differenceInDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import educationalImage from "@assets/generated_images/GLP-1_mechanism_educational_diagram_01265cd8.png";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [macroGoals, setMacroGoals] = useState({
    calories: 1600,
    protein: 120,
    carbs: 180,
    fats: 50,
  });

  // Fetch user profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["/api/profile"],
  });

  // Fetch meals for today
  const today = new Date().toISOString().split('T')[0];
  const { data: meals = [], isLoading: mealsLoading } = useQuery({
    queryKey: ["/api/meals", { date: today }],
  });

  // Fetch medication doses
  const { data: medicationDoses = [], isLoading: dosesLoading } = useQuery({
    queryKey: ["/api/medication-doses"],
  });

  // Fetch mood entries
  const { data: moodEntries = [], isLoading: moodLoading } = useQuery({
    queryKey: ["/api/mood-entries"],
  });

  // Fetch weight entries
  const { data: weightEntries = [], isLoading: weightLoading } = useQuery({
    queryKey: ["/api/weight-entries"],
  });

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="p-6 max-w-md text-center">
          <p className="text-sm text-muted-foreground">
            Perfil não encontrado. Por favor, complete o onboarding primeiro.
          </p>
        </Card>
      </div>
    );
  }

  // Calculate metrics
  const currentWeight = weightEntries.length > 0 ? weightEntries[0].weight : profile.weight;
  const initialWeight = profile.weight;
  const weightLost = initialWeight - currentWeight;
  const treatmentDays = differenceInDays(new Date(), new Date(profile.treatmentStartDate));

  // Calculate macros from today's meals
  const totalCalories = meals.reduce((sum: number, meal: any) => sum + (meal.calories || 0), 0);
  const totalProtein = meals.reduce((sum: number, meal: any) => sum + (meal.protein || 0), 0);
  const totalCarbs = meals.reduce((sum: number, meal: any) => sum + (meal.carbs || 0), 0);
  const totalFats = meals.reduce((sum: number, meal: any) => sum + (meal.fats || 0), 0);

  // Calculate protein per kg
  const proteinPerKg = currentWeight > 0 ? totalProtein / currentWeight : 0;

  // Prepare weight chart data (last 6 entries)
  const weightChartData = weightEntries
    .slice(0, 6)
    .reverse()
    .map((entry: any) => ({
      date: format(new Date(entry.date), "dd/MM", { locale: ptBR }),
      weight: entry.weight,
    }));

  // Calculate age from date of birth
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob.split('/').reverse().join('-'));
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Simplificado */}
      <header className="bg-gradient-to-b from-primary/5 to-transparent">
        <div className="px-5 pt-8 pb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Olá,</p>
              <h1 className="text-3xl font-bold tracking-tight">{profile.name.split(' ')[0]}</h1>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full"
              data-testid="button-profile"
              onClick={() => setActiveTab("perfil")}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>

          {/* Card de Progresso Destacado */}
          {activeTab === "home" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 border-0 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Peso Atual</p>
                    <p className="text-4xl font-bold tabular-nums">{currentWeight.toFixed(1)}</p>
                    <p className="text-xs opacity-75 mt-1">kg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90 mb-1">Meta</p>
                    <p className="text-2xl font-semibold tabular-nums">{profile.targetWeight}</p>
                    <p className="text-xs opacity-75 mt-1">kg</p>
                  </div>
                </div>
                {weightLost > 0 && (
                  <div className="flex items-center gap-2 pt-4 border-t border-primary-foreground/20">
                    <TrendingDown className="h-4 w-4" />
                    <p className="text-sm font-medium">
                      Você já perdeu <span className="font-bold tabular-nums">{weightLost.toFixed(1)} kg</span>
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-5 pb-6">
        <AnimatePresence mode="wait">
          {/* Tab: Home */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Métricas Rápidas */}
              <section>
                <h2 className="text-lg font-semibold mb-4">Resumo</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Target className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground">Faltam</p>
                    </div>
                    <p className="text-2xl font-bold tabular-nums">
                      {(currentWeight - profile.targetWeight).toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">kg para a meta</p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-full bg-chart-2/10">
                        <Calendar className="h-4 w-4 text-chart-2" />
                      </div>
                      <p className="text-xs text-muted-foreground">Tratamento</p>
                    </div>
                    <p className="text-2xl font-bold tabular-nums">{treatmentDays}</p>
                    <p className="text-xs text-muted-foreground mt-1">dias</p>
                  </Card>
                </div>
              </section>

              {/* Alerta de Proteína */}
              {proteinPerKg < 1.4 && totalProtein > 0 && (
                <PersonalizedAlert 
                  type="warning"
                  title="⚠️ Alerta de Massa Muscular"
                  description={`Sua ingestão de proteína está em ${proteinPerKg.toFixed(1)}g/kg (ideal: 1.6g/kg). Aumente para ${Math.round(currentWeight * 1.6)}g/dia.`}
                  action={{
                    label: "Ver recomendações",
                    onClick: () => setActiveTab("educacao")
                  }}
                />
              )}

              {/* Macronutrientes */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Hoje</h2>
                  <MacroGoalsDialog 
                    currentGoals={macroGoals}
                    onSave={setMacroGoals}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MacroCard 
                    label="Calorias" 
                    current={totalCalories} 
                    target={macroGoals.calories} 
                    unit=" kcal" 
                    color="hsl(var(--chart-4))" 
                  />
                  <MacroCard 
                    label="Proteína" 
                    current={totalProtein} 
                    target={macroGoals.protein} 
                    unit="g" 
                    color="hsl(var(--chart-1))" 
                  />
                  <MacroCard 
                    label="Carboidratos" 
                    current={totalCarbs} 
                    target={macroGoals.carbs} 
                    unit="g" 
                    color="hsl(var(--chart-2))" 
                  />
                  <MacroCard 
                    label="Gorduras" 
                    current={totalFats} 
                    target={macroGoals.fats} 
                    unit="g" 
                    color="hsl(var(--chart-3))" 
                  />
                </div>
              </section>

              {/* Cards de Tracking */}
              <section className="space-y-4">
                <NutritionSummary 
                  meals={meals.map((meal: any) => ({
                    name: meal.name,
                    calories: meal.calories,
                    time: meal.time
                  }))}
                  totalCalories={totalCalories}
                  targetCalories={macroGoals.calories}
                />
                
                <MedicationTracker 
                  doses={medicationDoses.map((dose: any) => ({
                    date: new Date(dose.scheduledDate),
                    completed: dose.completed === 1,
                    dose: dose.dose
                  }))}
                />
                
                <MoodTracker 
                  entries={moodEntries.map((entry: any) => ({
                    date: new Date(entry.date),
                    mood: entry.mood,
                    symptoms: entry.symptoms || []
                  }))}
                />
              </section>

              {/* Gráfico de Peso */}
              {weightChartData.length > 0 && (
                <section>
                  <Card className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">Evolução</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Últimos {weightChartData.length} registros
                        </p>
                      </div>
                      {weightLost > 0 && (
                        <Badge variant="secondary" className="gap-1.5">
                          <TrendingDown className="h-3 w-3" />
                          <span className="tabular-nums">-{weightLost.toFixed(1)} kg</span>
                        </Badge>
                      )}
                    </div>
                    
                    <div className="h-48" data-testid="chart-weight">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weightChartData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" opacity={0.3} />
                          <XAxis 
                            dataKey="date" 
                            className="text-xs"
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickLine={false}
                          />
                          <YAxis 
                            className="text-xs"
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              fontSize: "12px"
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="weight" 
                            stroke="hsl(var(--chart-1))" 
                            strokeWidth={2.5}
                            dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </section>
              )}

              {/* Insights */}
              {(profile.bodyType !== "Não sei" || weightLost > 0) && (
                <section>
                  <h3 className="text-lg font-semibold mb-4">Insights</h3>
                  <div className="space-y-3">
                    {profile.bodyType && profile.bodyType !== "Não sei" && (
                      <PersonalizedAlert 
                        type="tip"
                        title="💡 Dica para seu biotipo"
                        description={`Considerando seu biotipo ${profile.bodyType.toLowerCase()}, exercícios de resistência 3x por semana maximizarão seus resultados.`}
                      />
                    )}
                    {weightLost > 0 && (
                      <PersonalizedAlert 
                        type="success"
                        title="✅ Ótimo progresso!"
                        description={`Você perdeu ${weightLost.toFixed(1)}kg de forma saudável. Continue assim!`}
                      />
                    )}
                  </div>
                </section>
              )}
            </motion.div>
          )}

          {/* Tab: Educação */}
          {activeTab === "educacao" && (
            <motion.div
              key="educacao"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-1">Entenda seu Tratamento</h2>
                <p className="text-sm text-muted-foreground">Aprenda sobre GLP-1</p>
              </div>

              <Card className="overflow-hidden">
                <div className="p-5 space-y-4">
                  <h3 className="text-lg font-semibold">O que é GLP-1?</h3>
                  <div className="w-full">
                    <img 
                      src={educationalImage} 
                      alt="Mecanismo GLP-1" 
                      className="w-full h-auto rounded-lg"
                      data-testid="img-glp1-mechanism"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    GLP-1 é um hormônio natural que seu corpo produz. Medicamentos como 
                    Ozempic e Mounjaro imitam este hormônio para ajudar a controlar o apetite, 
                    melhorar o controle de açúcar no sangue e promover perda de peso sustentável.
                  </p>
                </div>
              </Card>

              <div className="space-y-3">
                <EducationalCard
                  icon={Lightbulb}
                  title="Redução de Efeitos Colaterais"
                  description="Náusea é comum no início. Coma porções menores, evite alimentos gordurosos e mantenha-se hidratado."
                />
                <EducationalCard
                  icon={Apple}
                  title="Alimentação Inteligente"
                  description="Divida sua proteína ao longo do dia. Alvo: 1.6g/kg de peso corporal para preservar massa muscular."
                />
                <EducationalCard
                  icon={Activity}
                  title="Importância do Exercício"
                  description="Exercícios de resistência são essenciais para preservar músculo durante a perda de peso."
                />
                <EducationalCard
                  icon={Calendar}
                  title="Paciência no Processo"
                  description="Resultados sustentáveis levam tempo. Foque em mudanças de hábitos, não apenas no número da balança."
                />
              </div>

              <Card className="p-5">
                <h3 className="font-semibold mb-4">Perguntas Frequentes</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Por quanto tempo devo usar GLP-1?</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      A duração varia por pessoa. Muitos pacientes usam por 6-12 meses ou mais, 
                      com supervisão médica contínua.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Vou recuperar o peso depois de parar?</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Manter hábitos saudáveis é fundamental. A Zempi ajuda você a construir uma 
                      rotina sustentável que continua funcionando após o tratamento.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Tab: Perfil */}
          {activeTab === "perfil" && (
            <motion.div
              key="perfil"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              data-testid="tabs-navigation"
            >
              <div>
                <h2 className="text-2xl font-bold mb-1">Meu Perfil</h2>
                <p className="text-sm text-muted-foreground">Suas informações pessoais</p>
              </div>

              <Card className="p-5">
                <h3 className="font-semibold mb-4">Informações Pessoais</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">NOME</p>
                      <p className="font-medium" data-testid="text-profile-name">{profile.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">IDADE</p>
                      <p className="font-medium" data-testid="text-profile-age">
                        {calculateAge(profile.dateOfBirth)} anos
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">ALTURA</p>
                      <p className="font-medium font-mono tabular-nums" data-testid="text-profile-height">
                        {profile.height} cm
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">PESO INICIAL</p>
                      <p className="font-medium font-mono tabular-nums" data-testid="text-profile-initial-weight">
                        {profile.weight} kg
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-4">Detalhes do Tratamento</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">MEDICAMENTO</p>
                      <p className="font-medium" data-testid="text-profile-medication">{profile.medication}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">DOSE ATUAL</p>
                      <p className="font-medium font-mono tabular-nums" data-testid="text-profile-dose">
                        {profile.dose}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">TIPO CORPORAL</p>
                      <p className="font-medium" data-testid="text-profile-bodytype">{profile.bodyType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">INÍCIO</p>
                      <p className="font-medium" data-testid="text-profile-start-date">
                        {profile.treatmentStartDate}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-4">Preferências Alimentares</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.foodPreferences && profile.foodPreferences.length > 0 ? (
                    profile.foodPreferences.map((pref: string) => (
                      <Badge 
                        key={pref}
                        variant="secondary"
                        className="px-3 py-1.5" 
                        data-testid="badge-restriction"
                      >
                        {pref}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhuma preferência registrada</p>
                  )}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-4">Condições de Saúde</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.comorbidities && profile.comorbidities.length > 0 ? (
                    profile.comorbidities.map((condition: string) => (
                      <Badge 
                        key={condition}
                        variant="secondary"
                        className="px-3 py-1.5" 
                        data-testid="badge-comorbidity"
                      >
                        {condition}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhuma condição registrada</p>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation - Estilo Nubank/Apple */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-3">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
              activeTab === "home" 
                ? "text-primary" 
                : "text-muted-foreground"
            }`}
            data-testid="tab-overview"
          >
            <Home className={`h-5 w-5 ${activeTab === "home" ? "fill-current" : ""}`} />
            <span className="text-xs font-medium">Início</span>
          </button>

          <button
            onClick={() => setActiveTab("educacao")}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
              activeTab === "educacao" 
                ? "text-primary" 
                : "text-muted-foreground"
            }`}
            data-testid="tab-education"
          >
            <BookOpen className={`h-5 w-5 ${activeTab === "educacao" ? "fill-current" : ""}`} />
            <span className="text-xs font-medium">Educação</span>
          </button>

          <button
            onClick={() => setActiveTab("perfil")}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
              activeTab === "perfil" 
                ? "text-primary" 
                : "text-muted-foreground"
            }`}
            data-testid="tab-profile"
          >
            <Settings className={`h-5 w-5 ${activeTab === "perfil" ? "fill-current" : ""}`} />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
