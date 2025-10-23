import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Beef,
  Scale,
  Activity,
  Sparkles
} from "lucide-react";
import { startOfWeek, endOfWeek, format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Meal {
  date: string;
  protein: number;
  calories: number;
}

interface WeightEntry {
  date: string;
  weight: number;
}

interface WeeklySummaryProps {
  meals: Meal[];
  weightEntries: WeightEntry[];
  userWeight: number;
  proteinGoal?: number; // g/kg
}

export default function WeeklySummary({
  meals,
  weightEntries,
  userWeight,
  proteinGoal = 1.6
}: WeeklySummaryProps) {

  const summary = useMemo(() => {
    const today = new Date();
    const last7Days = subDays(today, 7);
    const previous7Days = subDays(today, 14);

    // Filter meals for current week and previous week
    const currentWeekMeals = meals.filter(
      meal => new Date(meal.date) >= last7Days
    );

    const previousWeekMeals = meals.filter(
      meal => new Date(meal.date) >= previous7Days && new Date(meal.date) < last7Days
    );

    // Calculate daily protein for current week
    const dailyProtein = currentWeekMeals.reduce((acc, meal) => {
      if (!acc[meal.date]) acc[meal.date] = 0;
      acc[meal.date] += meal.protein;
      return acc;
    }, {} as Record<string, number>);

    const proteinDays = Object.keys(dailyProtein).length;
    const totalProtein = Object.values(dailyProtein).reduce((sum, p) => sum + p, 0);
    const avgProteinPerDay = proteinDays > 0 ? totalProtein / 7 : 0; // Divide by 7 to get true average

    // Calculate previous week avg
    const prevDailyProtein = previousWeekMeals.reduce((acc, meal) => {
      if (!acc[meal.date]) acc[meal.date] = 0;
      acc[meal.date] += meal.protein;
      return acc;
    }, {} as Record<string, number>);

    const prevTotalProtein = Object.values(prevDailyProtein).reduce((sum, p) => sum + p, 0);
    const prevAvgProteinPerDay = prevTotalProtein / 7;

    // Calculate protein vs goal
    const proteinGoalMet = Object.values(dailyProtein).filter(
      p => p / userWeight >= proteinGoal
    ).length;

    const proteinGoalPercentage = proteinDays > 0 ? (proteinGoalMet / proteinDays) * 100 : 0;

    // Weight analysis
    const currentWeekWeights = weightEntries
      .filter(w => new Date(w.date) >= last7Days)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const previousWeekWeights = weightEntries
      .filter(w => new Date(w.date) >= previous7Days && new Date(w.date) < last7Days)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const currentWeightChange = currentWeekWeights.length >= 2
      ? currentWeekWeights[currentWeekWeights.length - 1].weight - currentWeekWeights[0].weight
      : 0;

    const prevWeightChange = previousWeekWeights.length >= 2
      ? previousWeekWeights[previousWeekWeights.length - 1].weight - previousWeekWeights[0].weight
      : 0;

    // Generate insights
    const insights: string[] = [];

    // Protein insights
    if (avgProteinPerDay / userWeight >= proteinGoal) {
      insights.push(`Excelente! Você manteve ${(avgProteinPerDay / userWeight).toFixed(1)}g/kg de proteína por dia.`);
    } else if (avgProteinPerDay / userWeight >= 1.4) {
      insights.push(`Bom trabalho com ${(avgProteinPerDay / userWeight).toFixed(1)}g/kg de proteína. Tente chegar a ${proteinGoal}g/kg.`);
    } else {
      insights.push(`Atenção: proteína em ${(avgProteinPerDay / userWeight).toFixed(1)}g/kg. Aumente para preservar músculo.`);
    }

    // Weight insights
    if (Math.abs(currentWeightChange) >= 0.5 && Math.abs(currentWeightChange) <= 1.0) {
      insights.push(`Perda de peso ideal: ${Math.abs(currentWeightChange).toFixed(1)}kg esta semana.`);
    } else if (Math.abs(currentWeightChange) > 1.0) {
      insights.push(`Atenção: perda acelerada de ${Math.abs(currentWeightChange).toFixed(1)}kg. Aumente proteína.`);
    } else if (Math.abs(currentWeightChange) < 0.3) {
      insights.push(`Peso estável esta semana. Platôs são normais, continue firme!`);
    }

    // Trend comparison
    const proteinTrend = prevAvgProteinPerDay > 0
      ? ((avgProteinPerDay - prevAvgProteinPerDay) / prevAvgProteinPerDay) * 100
      : 0;

    if (proteinTrend > 10) {
      insights.push(`📈 Você aumentou ${proteinTrend.toFixed(0)}% sua proteína vs semana passada!`);
    } else if (proteinTrend < -10) {
      insights.push(`📉 Proteína caiu ${Math.abs(proteinTrend).toFixed(0)}% vs semana passada.`);
    }

    // Consistency insight
    if (proteinDays >= 6) {
      insights.push(`🎯 Consistência exemplar: ${proteinDays} dias registrados!`);
    } else if (proteinDays < 4) {
      insights.push(`📝 Registre mais dias para insights melhores (${proteinDays}/7).`);
    }

    return {
      avgProteinPerDay,
      prevAvgProteinPerDay,
      proteinGoalMet,
      proteinGoalPercentage,
      currentWeightChange,
      prevWeightChange,
      proteinTrend,
      insights,
      daysLogged: proteinDays
    };
  }, [meals, weightEntries, userWeight, proteinGoal]);

  const weekStart = format(startOfWeek(subDays(new Date(), 7), { weekStartsOn: 0 }), "dd MMM", { locale: ptBR });
  const weekEnd = format(endOfWeek(subDays(new Date(), 7), { weekStartsOn: 0 }), "dd MMM", { locale: ptBR });

  return (
    <Card className="p-6 border-l-4 border-l-indigo-500 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-background dark:from-indigo-950/20 dark:via-purple-950/10">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900">
          <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Resumo Semanal</h2>
          <p className="text-xs text-muted-foreground">
            Última semana ({weekStart} - {weekEnd})
          </p>
        </div>
        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100">
          {summary.daysLogged}/7 dias
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white/50 dark:bg-white/5 rounded-xl p-3 border border-indigo-100 dark:border-indigo-900">
          <div className="flex items-center gap-1 mb-2">
            <Beef className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <p className="text-xs text-muted-foreground">Proteína</p>
          </div>
          <p className="text-xl font-bold tabular-nums">
            {summary.avgProteinPerDay.toFixed(0)}
            <span className="text-xs font-normal text-muted-foreground ml-1">g/dia</span>
          </p>
          <div className="flex items-center gap-1 mt-1">
            {summary.proteinTrend > 0 ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : summary.proteinTrend < 0 ? (
              <TrendingDown className="h-3 w-3 text-red-500" />
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground" />
            )}
            <span className={cn(
              "text-xs font-medium",
              summary.proteinTrend > 0 && "text-green-600 dark:text-green-400",
              summary.proteinTrend < 0 && "text-red-600 dark:text-red-400",
              summary.proteinTrend === 0 && "text-muted-foreground"
            )}>
              {Math.abs(summary.proteinTrend).toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="bg-white/50 dark:bg-white/5 rounded-xl p-3 border border-indigo-100 dark:border-indigo-900">
          <div className="flex items-center gap-1 mb-2">
            <Scale className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <p className="text-xs text-muted-foreground">Peso</p>
          </div>
          <p className="text-xl font-bold tabular-nums">
            {Math.abs(summary.currentWeightChange).toFixed(1)}
            <span className="text-xs font-normal text-muted-foreground ml-1">kg</span>
          </p>
          <div className="flex items-center gap-1 mt-1">
            {summary.currentWeightChange < 0 ? (
              <TrendingDown className="h-3 w-3 text-green-500" />
            ) : summary.currentWeightChange > 0 ? (
              <TrendingUp className="h-3 w-3 text-red-500" />
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground" />
            )}
            <span className="text-xs font-medium text-muted-foreground">
              esta semana
            </span>
          </div>
        </div>

        <div className="bg-white/50 dark:bg-white/5 rounded-xl p-3 border border-indigo-100 dark:border-indigo-900">
          <div className="flex items-center gap-1 mb-2">
            <Activity className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <p className="text-xs text-muted-foreground">Meta</p>
          </div>
          <p className="text-xl font-bold tabular-nums">
            {summary.proteinGoalPercentage.toFixed(0)}
            <span className="text-xs font-normal text-muted-foreground ml-1">%</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {summary.proteinGoalMet}/{summary.daysLogged} dias
          </p>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          Insights da Semana
        </h3>
        {summary.insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start gap-2 p-3 rounded-lg bg-white/50 dark:bg-white/5 border border-indigo-100/50 dark:border-indigo-900/50"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
            <p className="text-sm text-foreground/90 leading-relaxed flex-1">
              {insight}
            </p>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="mt-5 pt-5 border-t border-indigo-100 dark:border-indigo-900">
        <button className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
          <Calendar className="h-4 w-4" />
          Ver Histórico Completo
        </button>
      </div>
    </Card>
  );
}
