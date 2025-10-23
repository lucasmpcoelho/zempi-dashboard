import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  TrendingDown,
  Beef,
  Activity,
  CheckCircle2,
  Info,
  ArrowRight
} from "lucide-react";
import { differenceInDays, subDays, format } from "date-fns";
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

interface Alert {
  id: string;
  type: "warning" | "info" | "success" | "danger";
  title: string;
  message: string;
  action?: string;
  icon: React.ComponentType<{ className?: string }>;
  priority: number; // Lower = higher priority
}

interface SmartAlertsProps {
  meals: Meal[];
  weightEntries: WeightEntry[];
  userWeight: number;
  proteinGoal?: number; // g/kg
}

export default function SmartAlerts({
  meals,
  weightEntries,
  userWeight,
  proteinGoal = 1.6
}: SmartAlertsProps) {

  const alerts = useMemo(() => {
    const alertList: Alert[] = [];
    const today = new Date();

    // Sort meals by date descending
    const sortedMeals = [...meals].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Sort weights by date descending
    const sortedWeights = [...weightEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // 1. LOW PROTEIN WARNING - Critical for GLP-1 users
    // Check if protein < 1.2g/kg for last 3+ days
    const last7Days = subDays(today, 7);
    const recentMeals = sortedMeals.filter(
      meal => new Date(meal.date) >= last7Days
    );

    // Group by date and calculate daily protein
    const dailyProtein = recentMeals.reduce((acc, meal) => {
      const dateKey = meal.date;
      if (!acc[dateKey]) {
        acc[dateKey] = 0;
      }
      acc[dateKey] += meal.protein;
      return acc;
    }, {} as Record<string, number>);

    const lowProteinDays = Object.entries(dailyProtein).filter(
      ([_, protein]) => protein / userWeight < 1.2
    );

    if (lowProteinDays.length >= 3) {
      alertList.push({
        id: "low-protein",
        type: "danger",
        title: "⚠️ Proteína Baixa",
        message: `Você está com menos de 1.2g/kg de proteína em ${lowProteinDays.length} dos últimos 7 dias. Isso pode acelerar a perda de massa muscular durante o tratamento.`,
        action: "Ver dicas de proteína",
        icon: Beef,
        priority: 1
      });
    } else if (lowProteinDays.length >= 2) {
      alertList.push({
        id: "low-protein-warning",
        type: "warning",
        title: "Atenção à Proteína",
        message: `Você teve ${lowProteinDays.length} dias com proteína abaixo do ideal. Tente manter acima de 1.4g/kg para preservar músculo.`,
        action: "Ver recomendações",
        icon: Beef,
        priority: 3
      });
    }

    // 2. PLATEAU DETECTION - No weight change for 14+ days
    if (sortedWeights.length >= 14) {
      const last14Weights = sortedWeights.slice(0, 14);
      const firstWeight = last14Weights[last14Weights.length - 1]?.weight;
      const lastWeight = last14Weights[0]?.weight;
      const weightChange = Math.abs(firstWeight - lastWeight);

      if (weightChange < 0.5) {
        alertList.push({
          id: "plateau",
          type: "info",
          title: "Platô Detectado",
          message: `Seu peso está estável há ${differenceInDays(
            new Date(last14Weights[0].date),
            new Date(last14Weights[last14Weights.length - 1].date)
          )} dias. Isso é normal e pode durar algumas semanas. Continue com sua rotina.`,
          action: "Entender platôs",
          icon: TrendingDown,
          priority: 5
        });
      }
    }

    // 3. RAPID WEIGHT LOSS - More than 1.5kg/week
    if (sortedWeights.length >= 7) {
      const last7Weights = sortedWeights.slice(0, 7);
      const firstWeight = last7Weights[last7Weights.length - 1]?.weight;
      const lastWeight = last7Weights[0]?.weight;
      const weeklyLoss = firstWeight - lastWeight;
      const daysSpan = differenceInDays(
        new Date(last7Weights[0].date),
        new Date(last7Weights[last7Weights.length - 1].date)
      );

      const weeklyRate = daysSpan > 0 ? (weeklyLoss / daysSpan) * 7 : 0;

      if (weeklyRate > 1.5) {
        alertList.push({
          id: "rapid-loss",
          type: "warning",
          title: "Perda Acelerada",
          message: `Você está perdendo ${weeklyRate.toFixed(1)}kg/semana. Perda muito rápida pode indicar perda muscular excessiva. Aumente proteína e considere exercícios de força.`,
          action: "Ver estratégias",
          icon: AlertTriangle,
          priority: 2
        });
      }
    }

    // 4. PROTEIN STREAK - Good performance
    const last3Days = Object.entries(dailyProtein)
      .slice(0, 3)
      .filter(([_, protein]) => protein / userWeight >= proteinGoal);

    if (last3Days.length === 3) {
      alertList.push({
        id: "protein-streak",
        type: "success",
        title: "🎉 Streak de Proteína!",
        message: `Parabéns! Você atingiu sua meta de ${proteinGoal}g/kg por 3 dias seguidos. Continue assim para preservar músculo!`,
        icon: CheckCircle2,
        priority: 4
      });
    }

    // 5. NO DATA WARNING - Less than 3 meals logged this week
    const thisWeekMeals = recentMeals.filter(
      meal => new Date(meal.date) >= subDays(today, 7)
    );

    if (thisWeekMeals.length < 3) {
      alertList.push({
        id: "low-data",
        type: "info",
        title: "Poucos Dados Esta Semana",
        message: "Registre mais refeições para receber insights personalizados e acompanhar melhor seu progresso.",
        action: "Registrar refeição",
        icon: Info,
        priority: 6
      });
    }

    // 6. WEIGHT TREND ANALYSIS - Healthy loss zone
    if (sortedWeights.length >= 14) {
      const last14Weights = sortedWeights.slice(0, 14);
      const firstWeight = last14Weights[last14Weights.length - 1]?.weight;
      const lastWeight = last14Weights[0]?.weight;
      const weeklyLoss = ((firstWeight - lastWeight) / 14) * 7;

      if (weeklyLoss >= 0.5 && weeklyLoss <= 1.0) {
        alertList.push({
          id: "healthy-rate",
          type: "success",
          title: "✅ Ritmo Ideal",
          message: `Você está perdendo ${weeklyLoss.toFixed(1)}kg/semana - dentro da zona saudável (0.5-1kg). Continue assim!`,
          icon: Activity,
          priority: 7
        });
      }
    }

    // Sort by priority
    return alertList.sort((a, b) => a.priority - b.priority);
  }, [meals, weightEntries, userWeight, proteinGoal]);

  if (alerts.length === 0) {
    return null;
  }

  // Show top 3 most important alerts
  const topAlerts = alerts.slice(0, 3);

  return (
    <div className="space-y-3">
      {topAlerts.map((alert) => {
        const Icon = alert.icon;

        return (
          <Card
            key={alert.id}
            className={cn(
              "p-4 border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer",
              alert.type === "danger" && "border-l-red-500 bg-red-50/50 dark:bg-red-950/20",
              alert.type === "warning" && "border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20",
              alert.type === "info" && "border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20",
              alert.type === "success" && "border-l-green-500 bg-green-50/50 dark:bg-green-950/20"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "p-2 rounded-xl shrink-0",
                  alert.type === "danger" && "bg-red-100 dark:bg-red-900",
                  alert.type === "warning" && "bg-orange-100 dark:bg-orange-900",
                  alert.type === "info" && "bg-blue-100 dark:bg-blue-900",
                  alert.type === "success" && "bg-green-100 dark:bg-green-900"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    alert.type === "danger" && "text-red-600 dark:text-red-400",
                    alert.type === "warning" && "text-orange-600 dark:text-orange-400",
                    alert.type === "info" && "text-blue-600 dark:text-blue-400",
                    alert.type === "success" && "text-green-600 dark:text-green-400"
                  )}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-sm leading-tight">
                    {alert.title}
                  </h3>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs shrink-0",
                      alert.type === "danger" && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
                      alert.type === "warning" && "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
                      alert.type === "info" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
                      alert.type === "success" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    )}
                  >
                    {alert.type === "danger" && "Urgente"}
                    {alert.type === "warning" && "Atenção"}
                    {alert.type === "info" && "Info"}
                    {alert.type === "success" && "Ótimo"}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  {alert.message}
                </p>

                {alert.action && (
                  <button
                    className={cn(
                      "text-xs font-medium flex items-center gap-1 transition-colors",
                      alert.type === "danger" && "text-red-600 hover:text-red-700 dark:text-red-400",
                      alert.type === "warning" && "text-orange-600 hover:text-orange-700 dark:text-orange-400",
                      alert.type === "info" && "text-blue-600 hover:text-blue-700 dark:text-blue-400",
                      alert.type === "success" && "text-green-600 hover:text-green-700 dark:text-green-400"
                    )}
                  >
                    {alert.action}
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
