import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Beef, TrendingUp, Target } from "lucide-react";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import MusclePreservationDashboard from "@/components/dashboards/MusclePreservationDashboard";
import MealSuggestions from "@/components/cards/MealSuggestions";

export default function ProteinPanel() {
  const today = format(new Date(), "yyyy-MM-dd");
  const thirtyDaysAgo = format(subDays(new Date(), 29), "yyyy-MM-dd");

  // Fetch user profile
  const { data: user } = useQuery({
    queryKey: ["/api/user"]
  });

  const userProfile = user?.profile;
  const weight = userProfile?.weight || 70;
  const startWeight = userProfile?.initialWeight || userProfile?.weight || 95;
  const proteinGoal = userProfile?.proteinGoal || 1.6;
  const dailyProteinTarget = Math.round(weight * proteinGoal);

  // Fetch today's meals
  const { data: todayMeals = [] } = useQuery({
    queryKey: ["/api/meals", { date: today }]
  });

  // Fetch last 30 days meals
  const { data: last30DaysMeals = [] } = useQuery({
    queryKey: ["/api/meals", { startDate: thirtyDaysAgo, endDate: today }]
  });

  // Fetch weight entries for muscle preservation dashboard
  const { data: weightEntries = [] } = useQuery({
    queryKey: ["/api/weight", { startDate: thirtyDaysAgo, endDate: today }]
  });

  // Fetch today's mood for symptoms
  const { data: todayMood } = useQuery({
    queryKey: ["/api/mood", { date: today }]
  });

  const currentSymptoms = todayMood?.[0]?.symptoms || [];

  // Calculate today's protein
  const todayProtein = todayMeals.reduce((sum: number, meal: any) => sum + (meal.protein || 0), 0);
  const todayProteinPerKg = weight > 0 ? todayProtein / weight : 0;

  // Calculate weekly average
  const last7Days = last30DaysMeals.filter((meal: any) => {
    const mealDate = new Date(meal.date);
    const sevenDaysAgo = subDays(new Date(), 7);
    return mealDate >= sevenDaysAgo;
  });

  const weeklyProtein = last7Days.reduce((sum: number, meal: any) => sum + (meal.protein || 0), 0);
  const avgProteinPerDay = last7Days.length > 0 ? weeklyProtein / 7 : 0;

  // Calculate protein remaining
  const proteinRemaining = Math.max(0, dailyProteinTarget - todayProtein);

  // Get recent meal IDs for variety
  const threeDaysAgo = format(subDays(new Date(), 3), "yyyy-MM-dd");
  const recentMealIds = last30DaysMeals
    .filter((meal: any) => meal.date >= threeDaysAgo)
    .map((meal: any) => meal.name?.toLowerCase().replace(/\s+/g, '-') || '');

  // Determine time of day
  const hour = new Date().getHours();
  const timeOfDay =
    hour < 10 ? "breakfast" :
    hour < 14 ? "lunch" :
    hour < 19 ? "snack" : "dinner";

  return (
    <div className="space-y-6 pb-6">
      {/* Hero: Today's Protein */}
      <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 border-0 shadow-xl shadow-green-500/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
        </div>

        <div className="relative flex items-start justify-between mb-6">
          <div className="text-white">
            <p className="text-sm font-medium opacity-90 mb-2">Proteína Hoje</p>
            <p className="text-6xl font-bold tabular-nums tracking-tight">{todayProtein.toFixed(0)}</p>
            <p className="text-sm opacity-80 mt-2 font-medium">
              de {dailyProteinTarget}g • {todayProteinPerKg.toFixed(1)} g/kg
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
            <Beef className="h-7 w-7 text-white" />
          </div>
        </div>

        <div className="relative space-y-3">
          <div className="flex items-center justify-between text-sm text-white/90 font-medium">
            <span>Progresso</span>
            <span className="text-base font-bold">
              {Math.min((todayProtein / dailyProteinTarget) * 100, 100).toFixed(0)}%
            </span>
          </div>
          <div className="h-3 bg-white/30 backdrop-blur-sm rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-white rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${Math.min((todayProtein / dailyProteinTarget) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="relative mt-6 pt-5 border-t border-white/20">
          <Badge
            variant="secondary"
            className={
              todayProteinPerKg >= 1.6
                ? "bg-white text-green-700 hover:bg-white/90 font-semibold px-4 py-1.5 shadow-lg"
                : todayProteinPerKg >= 1.4
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/90 font-semibold px-4 py-1.5"
                : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 font-semibold px-4 py-1.5"
            }
          >
            {todayProteinPerKg >= 1.6 ? "💪 Excelente" : todayProteinPerKg >= 1.4 ? "👍 Bom" : "⚠️ Atenção"}
          </Badge>
        </div>
      </Card>

      {/* Weekly Average */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border-l-4 border-l-teal-500">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950 group-hover:scale-110 transition-transform duration-300">
            <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          </div>
          <h2 className="text-lg font-semibold">Média Semanal</h2>
        </div>
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-gradient-to-br from-teal-50/50 to-blue-50/50 dark:from-teal-950/30 dark:to-blue-950/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Proteína por dia</span>
              <span className="text-3xl font-bold tabular-nums text-teal-700 dark:text-teal-300">{avgProteinPerDay.toFixed(0)}g</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-teal-100 dark:border-teal-900">
              <span className="text-sm font-medium text-muted-foreground">Por kg de peso</span>
              <span className="text-xl font-bold tabular-nums">
                {(avgProteinPerDay / weight).toFixed(1)} g/kg
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Today's Meals */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950">
            <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h2 className="text-lg font-semibold">Refeições Hoje</h2>
        </div>
        {todayMeals.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/30 mb-4">
              <Target className="h-8 w-8 text-orange-400" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Nenhuma refeição registrada hoje</p>
            <p className="text-xs text-muted-foreground">Comece registrando sua primeira refeição</p>
          </div>
        ) : (
          <div className="space-y-2">
            {todayMeals.map((meal: any, i: number) => (
              <div
                key={i}
                className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 hover:from-orange-50 hover:to-orange-50/50 dark:hover:from-orange-950/20 dark:hover:to-orange-950/10 transition-all duration-200 hover:shadow-md cursor-pointer border border-transparent hover:border-orange-200 dark:hover:border-orange-800"
              >
                <div className="flex-1">
                  <p className="font-semibold text-sm group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">{meal.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{meal.time}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400 tabular-nums">{meal.protein}g</p>
                  <p className="text-xs text-muted-foreground">{meal.calories} kcal</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Meal Suggestions */}
      <MealSuggestions
        proteinRemaining={proteinRemaining}
        currentWeight={weight}
        currentSymptoms={currentSymptoms}
        foodPreferences={userProfile?.foodPreferences || ["Como de tudo"]}
        recentMeals={recentMealIds}
        timeOfDay={timeOfDay as any}
      />

      {/* Muscle Preservation Dashboard */}
      <MusclePreservationDashboard
        meals={last30DaysMeals}
        weightEntries={weightEntries}
        userWeight={weight}
        startWeight={startWeight}
        proteinGoal={proteinGoal}
      />
    </div>
  );
}
