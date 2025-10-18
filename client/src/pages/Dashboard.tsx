import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MetricCard from "@/components/MetricCard";
import MacroCard from "@/components/MacroCard";
import MacroGoalsDialog from "@/components/MacroGoalsDialog";
import NutritionSummary from "@/components/NutritionSummary";
import MedicationTracker from "@/components/MedicationTracker";
import MoodTracker from "@/components/MoodTracker";
import PersonalizedAlert from "@/components/PersonalizedAlert";
import EducationalCard from "@/components/EducationalCard";
import { useQuery } from "@tanstack/react-query";
import { 
  Weight, 
  Ruler, 
  TrendingDown,
  Target,
  Lightbulb,
  Apple,
  Activity,
  User,
  Calendar,
  Flame,
  Loader2
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { differenceInDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import educationalImage from "@assets/generated_images/GLP-1_mechanism_educational_diagram_01265cd8.png";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("visao-geral");
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
      <div className="flex items-center justify-center min-h-screen">
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
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Zempi 🌱</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Olá, {profile.name.split(' ')[0]}</p>
            </div>
            <Button variant="ghost" size="icon" data-testid="button-profile">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 sm:space-y-8">
          <TabsList className="grid w-full grid-cols-3" data-testid="tabs-navigation">
            <TabsTrigger value="visao-geral" data-testid="tab-overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="educacao" data-testid="tab-education">Educação</TabsTrigger>
            <TabsTrigger value="perfil" data-testid="tab-profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="visao-geral" className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Métricas Principais */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Resumo</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <MetricCard 
                  icon={Weight} 
                  label="Peso Atual" 
                  value={`${currentWeight.toFixed(1)} kg`} 
                />
                <MetricCard 
                  icon={Target} 
                  label="Meta" 
                  value={`${profile.targetWeight} kg`} 
                />
                <MetricCard 
                  icon={TrendingDown} 
                  label="Progresso" 
                  value={`${weightLost > 0 ? '-' : ''}${Math.abs(weightLost).toFixed(1)} kg`} 
                />
                <MetricCard 
                  icon={Calendar} 
                  label="Tratamento" 
                  value={`${treatmentDays} dias`} 
                />
              </div>
            </section>

            {/* Alertas Personalizados */}
            {proteinPerKg < 1.4 && totalProtein > 0 && (
              <section>
                <PersonalizedAlert 
                  type="warning"
                  title="⚠️ Alerta de Massa Muscular"
                  description={`Sua ingestão de proteína está em ${proteinPerKg.toFixed(1)}g/kg (ideal: 1.6g/kg para GLP-1). Isso pode levar à perda muscular junto com a gordura. Aumente para ${Math.round(currentWeight * 1.6)}g/dia.`}
                  action={{
                    label: "Ver recomendações de proteína",
                    onClick: () => setActiveTab("educacao")
                  }}
                />
              </section>
            )}

            {/* Macronutrientes de Hoje */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Macronutrientes Hoje</h2>
                <MacroGoalsDialog 
                  currentGoals={macroGoals}
                  onSave={setMacroGoals}
                />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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

            {/* Grid de Cards - Nutrição, Medicação, Humor */}
            <section className="grid lg:grid-cols-3 gap-4 sm:gap-6">
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

            {/* Gráfico de Evolução de Peso */}
            {weightChartData.length > 0 && (
              <section>
                <Card className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold">Evolução de Peso</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Últimos {weightChartData.length} registros
                      </p>
                    </div>
                    {weightLost > 0 && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-chart-2/10 text-chart-2 w-fit">
                        <TrendingDown className="h-4 w-4" />
                        <span className="text-sm font-semibold tabular-nums">-{weightLost.toFixed(1)} kg</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="h-64" data-testid="chart-weight">
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

            {/* Mais Insights */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Mais Insights</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {profile.bodyType && profile.bodyType !== "Não sei" && (
                  <PersonalizedAlert 
                    type="tip"
                    title="💡 Dica para seu biotipo"
                    description={`Considerando seu biotipo ${profile.bodyType.toLowerCase()}, exercícios de resistência 3x por semana maximizarão seus resultados com GLP-1.`}
                  />
                )}
                {weightLost > 0 && (
                  <PersonalizedAlert 
                    type="success"
                    title="✅ Ótimo progresso!"
                    description={`Você perdeu ${weightLost.toFixed(1)}kg de forma saudável e sustentável. Continue assim!`}
                  />
                )}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="educacao" className="space-y-6 sm:space-y-8 animate-fade-in">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">Entenda seu Tratamento</h2>
              <p className="text-sm text-muted-foreground">Aprenda sobre GLP-1 e como otimizar seus resultados</p>
            </div>

            <Card className="overflow-hidden">
              <div className="p-4 sm:p-6 space-y-4">
                <h3 className="text-lg font-semibold">O que é GLP-1?</h3>
                <div className="w-full max-w-2xl mx-auto">
                  <img 
                    src={educationalImage} 
                    alt="Mecanismo GLP-1" 
                    className="w-full h-auto rounded-lg"
                    data-testid="img-glp1-mechanism"
                  />
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    GLP-1 (Glucagon-Like Peptide-1) é um hormônio natural que seu corpo produz. Medicamentos como 
                    Ozempic e Mounjaro imitam este hormônio para ajudar a controlar o apetite, melhorar o controle 
                    de açúcar no sangue e promover perda de peso sustentável.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <EducationalCard
                icon={Lightbulb}
                title="Redução de Efeitos Colaterais"
                description="Náusea é comum no início. Coma porções menores, evite alimentos gordurosos e mantenha-se hidratado. 80% dos pacientes veem melhora após 2-3 semanas."
              />
              <EducationalCard
                icon={Apple}
                title="Alimentação Inteligente"
                description="Divida sua proteína ao longo do dia. Alvo: 1.6g/kg de peso corporal para preservar massa muscular enquanto perde gordura."
              />
              <EducationalCard
                icon={Activity}
                title="Importância do Exercício"
                description="Exercícios de resistência são essenciais. Eles preservam músculo durante a perda de peso, melhorando sua composição corporal final."
              />
              <EducationalCard
                icon={Calendar}
                title="Paciência no Processo"
                description="Resultados sustentáveis levam tempo. Foque em mudanças de hábitos, não apenas no número da balança. A jornada média é de 6+ meses."
              />
            </div>

            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Perguntas Frequentes</h3>
              <div className="space-y-3">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Por quanto tempo devo usar GLP-1?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A duração varia por pessoa. Muitos pacientes usam por 6-12 meses ou mais, com supervisão médica 
                    contínua para ajustar doses e avaliar progresso.
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Vou recuperar o peso depois de parar?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Manter hábitos saudáveis é fundamental. A Zempi ajuda você a construir uma rotina sustentável 
                    que continua funcionando mesmo após o tratamento.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="perfil" className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">Meu Perfil</h2>
              <p className="text-sm text-muted-foreground">Suas informações pessoais e de tratamento</p>
            </div>

            <Card className="p-4 sm:p-6">
              <h3 className="text-base font-semibold mb-4">Informações Pessoais</h3>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Nome</p>
                  <p className="font-medium" data-testid="text-profile-name">{profile.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Idade</p>
                  <p className="font-medium" data-testid="text-profile-age">
                    {calculateAge(profile.dateOfBirth)} anos
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Altura</p>
                  <p className="font-medium font-mono tabular-nums" data-testid="text-profile-height">
                    {profile.height} cm
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Peso Inicial</p>
                  <p className="font-medium font-mono tabular-nums" data-testid="text-profile-initial-weight">
                    {profile.weight} kg
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <h3 className="text-base font-semibold mb-4">Detalhes do Tratamento</h3>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Medicamento</p>
                  <p className="font-medium" data-testid="text-profile-medication">{profile.medication}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Dose Atual</p>
                  <p className="font-medium font-mono tabular-nums" data-testid="text-profile-dose">
                    {profile.dose}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Tipo Corporal</p>
                  <p className="font-medium" data-testid="text-profile-bodytype">{profile.bodyType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Início do Tratamento</p>
                  <p className="font-medium" data-testid="text-profile-start-date">
                    {profile.treatmentStartDate}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <h3 className="text-base font-semibold mb-4">Preferências Alimentares</h3>
              <div className="flex flex-wrap gap-2">
                {profile.foodPreferences && profile.foodPreferences.length > 0 ? (
                  profile.foodPreferences.map((pref: string) => (
                    <span 
                      key={pref}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium" 
                      data-testid="badge-restriction"
                    >
                      {pref}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhuma preferência registrada</p>
                )}
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <h3 className="text-base font-semibold mb-4">Condições de Saúde</h3>
              <div className="flex flex-wrap gap-2">
                {profile.comorbidities && profile.comorbidities.length > 0 ? (
                  profile.comorbidities.map((condition: string) => (
                    <span 
                      key={condition}
                      className="px-3 py-1.5 bg-chart-3/10 text-chart-3 rounded-lg text-sm font-medium" 
                      data-testid="badge-comorbidity"
                    >
                      {condition}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhuma condição registrada</p>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
