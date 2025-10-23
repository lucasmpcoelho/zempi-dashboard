import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import ActivityRings from "@/components/ui/ActivityRings";
import QuickStatsCard from "@/components/ui/QuickStatsCard";
import HeatMapCalendar from "@/components/ui/HeatMapCalendar";
import SmartAlerts from "@/components/alerts/SmartAlerts";
import WeeklySummary from "@/components/cards/WeeklySummary";
import { Scale, Drumstick, Pill, Heart } from "lucide-react";
import { format, subDays } from "date-fns";

interface DailyStats {
  date: string;
  weight?: number;
  totalProtein: number;
  totalCalories: number;
  mealCount: number;
  proteinGoal: number;
  calorieGoal: number;
}

export default function OverviewPanel() {
  const today = format(new Date(), "yyyy-MM-dd");
  const thirtyDaysAgo = format(subDays(new Date(), 29), "yyyy-MM-dd");

  // Fetch user profile for goals
  const { data: user } = useQuery({
    queryKey: ["/api/user"]
  });

  const userProfile = user?.profile;
  const weight = userProfile?.weight || 70;
  const proteinGoal = userProfile?.proteinGoal || 1.6;
  const dailyProteinGoal = Math.round(weight * proteinGoal);

  // Fetch today's stats
  const { data: todayMeals } = useQuery({
    queryKey: ["/api/meals", { date: today }]
  });

  const { data: todayWeight } = useQuery({
    queryKey: ["/api/weight", { date: today }]
  });

  const { data: todayMood } = useQuery({
    queryKey: ["/api/mood", { date: today }]
  });

  // Fetch last 30 days for heat map
  const { data: last30DaysMeals } = useQuery({
    queryKey: ["/api/meals", { startDate: thirtyDaysAgo, endDate: today }]
  });

  const { data: weightEntries } = useQuery({
    queryKey: ["/api/weight", { startDate: thirtyDaysAgo, endDate: today }]
  });

  // Calculate today's totals
  const todayProtein = todayMeals?.reduce((sum: number, meal: any) => sum + (meal.protein || 0), 0) || 0;
  const todayCalories = todayMeals?.reduce((sum: number, meal: any) => sum + (meal.calories || 0), 0) || 0;
  const todayMealCount = todayMeals?.length || 0;

  // Calculate protein percentage for today
  const proteinPercentage = Math.min((todayProtein / dailyProteinGoal) * 100, 100);

  // Prepare activity rings data
  const activityRings = [
    {
      label: "Proteína",
      value: todayProtein,
      target: dailyProteinGoal,
      color: "hsl(var(--chart-1))",
      unit: "g"
    },
    {
      label: "Refeições",
      value: todayMealCount,
      target: 4,
      color: "hsl(var(--chart-2))"
    },
    {
      label: "Calorias",
      value: todayCalories,
      target: 1800,
      color: "hsl(var(--chart-3))",
      unit: "kcal"
    }
  ];

  // Prepare heat map data (protein goal achievement)
  const heatMapData = last30DaysMeals
    ? Object.entries(
        last30DaysMeals.reduce((acc: any, meal: any) => {
          if (!acc[meal.date]) {
            acc[meal.date] = 0;
          }
          acc[meal.date] += meal.protein || 0;
          return acc;
        }, {})
      ).map(([date, protein]) => ({
        date,
        value: Math.min((Number(protein) / dailyProteinGoal) * 100, 100),
        label: `${protein}g proteína`
      }))
    : [];

  // Calculate weekly averages for trends
  const last7DaysProtein = last30DaysMeals
    ?.filter((meal: any) => {
      const mealDate = new Date(meal.date);
      const sevenDaysAgo = subDays(new Date(), 7);
      return mealDate >= sevenDaysAgo;
    })
    .reduce((sum: number, meal: any) => sum + (meal.protein || 0), 0) || 0;

  const avgProteinLast7Days = Math.round(last7DaysProtein / 7);

  // Calculate weight trend
  const sortedWeights = weightEntries
    ?.slice()
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

  const currentWeight = sortedWeights[0]?.weight || weight;
  const weekAgoWeight = sortedWeights[7]?.weight || currentWeight;
  const weightChange = currentWeight - weekAgoWeight;
  const weightTrend = {
    value: Math.abs(weightChange),
    isPositive: weightChange < 0 // For weight loss, negative is positive
  };

  // Calculate protein trend
  const previous7DaysProtein = last30DaysMeals
    ?.filter((meal: any) => {
      const mealDate = new Date(meal.date);
      const fourteenDaysAgo = subDays(new Date(), 14);
      const sevenDaysAgo = subDays(new Date(), 7);
      return mealDate >= fourteenDaysAgo && mealDate < sevenDaysAgo;
    })
    .reduce((sum: number, meal: any) => sum + (meal.protein || 0), 0) || 0;

  const avgProteinPrevious7Days = previous7DaysProtein / 7 || 1;
  const proteinChangePercent = ((avgProteinLast7Days - avgProteinPrevious7Days) / avgProteinPrevious7Days) * 100;
  const proteinTrend = {
    value: Math.abs(Math.round(proteinChangePercent)),
    isPositive: proteinChangePercent > 0
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Activity Rings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Hoje</h2>
        <ActivityRings rings={activityRings} size="md" />
      </Card>

      {/* Smart Alerts */}
      <SmartAlerts
        meals={last30DaysMeals || []}
        weightEntries={weightEntries || []}
        userWeight={weight}
        proteinGoal={proteinGoal}
      />

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <QuickStatsCard
          icon={Scale}
          iconColor="bg-blue-500/10 text-blue-500"
          label="Peso Atual"
          value={currentWeight.toFixed(1)}
          unit="kg"
          trend={weightTrend}
        />
        <QuickStatsCard
          icon={Drumstick}
          iconColor="bg-green-500/10 text-green-500"
          label="Proteína Média"
          value={avgProteinLast7Days}
          unit="g/dia"
          trend={proteinTrend}
        />
        <QuickStatsCard
          icon={Pill}
          iconColor="bg-purple-500/10 text-purple-500"
          label="Próxima Dose"
          value="3"
          unit="dias"
        />
        <QuickStatsCard
          icon={Heart}
          iconColor="bg-red-500/10 text-red-500"
          label="Bem-estar"
          value={todayMood?.mood === "good" ? "Bom" : todayMood?.mood === "neutral" ? "OK" : "Ruim"}
        />
      </div>

      {/* Weekly Summary */}
      <WeeklySummary
        meals={last30DaysMeals || []}
        weightEntries={weightEntries || []}
        userWeight={weight}
        proteinGoal={proteinGoal}
      />

      {/* Heat Map Calendar */}
      <Card className="p-6">
        <HeatMapCalendar
          data={heatMapData}
          title="Últimos 30 Dias"
          subtitle="Meta de proteína alcançada por dia"
        />
      </Card>
    </div>
  );
}
