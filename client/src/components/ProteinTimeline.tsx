import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Coffee, Sun, Moon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MealProtein {
  name: string;
  protein: number;
  time: string;
}

interface ProteinTimelineProps {
  meals: MealProtein[];
  targetPerMeal?: number;
  currentWeight: number;
}

const mealPeriods = [
  { id: "breakfast", label: "Café", icon: Coffee, timeRange: "06:00-10:00", color: "text-orange-500", bg: "bg-orange-500/10" },
  { id: "lunch", label: "Almoço", icon: Sun, timeRange: "11:00-15:00", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { id: "snack", label: "Lanche", icon: Utensils, timeRange: "15:00-18:00", color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "dinner", label: "Jantar", icon: Moon, timeRange: "18:00-23:00", color: "text-purple-500", bg: "bg-purple-500/10" },
];

export default function ProteinTimeline({
  meals,
  targetPerMeal = 25,
  currentWeight
}: ProteinTimelineProps) {
  // Agrupar refeições por período
  const getMealsByPeriod = (periodId: string, timeRange: string) => {
    const [start, end] = timeRange.split('-');
    return meals.filter(meal => {
      const mealTime = meal.time;
      return mealTime >= start && mealTime < end;
    });
  };

  // Calcular proteína total por período
  const getProteinForPeriod = (periodId: string, timeRange: string) => {
    const periodMeals = getMealsByPeriod(periodId, timeRange);
    return periodMeals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
  };

  // Total diário
  const totalProtein = meals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
  const proteinPerKg = currentWeight > 0 ? totalProtein / currentWeight : 0;
  const targetTotal = currentWeight * 1.6; // 1.6g/kg recomendado

  // Encontrar período mais deficiente
  const periodsWithProtein = mealPeriods.map(period => ({
    ...period,
    protein: getProteinForPeriod(period.id, period.timeRange),
    meals: getMealsByPeriod(period.id, period.timeRange)
  }));

  const lowestPeriod = periodsWithProtein.reduce((lowest, current) =>
    current.protein < lowest.protein ? current : lowest
  );

  const needsAttention = lowestPeriod.protein < 15 && lowestPeriod.protein < targetTotal / 4;

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Distribuição de Proteína</h3>
          <Badge variant={proteinPerKg >= 1.4 ? "default" : "secondary"} className="font-mono">
            {proteinPerKg.toFixed(1)} g/kg
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Meta: {targetTotal.toFixed(0)}g/dia • {targetPerMeal}g por refeição
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-4 mb-6">
        {periodsWithProtein.map((period, index) => {
          const Icon = period.icon;
          const percentage = period.protein > 0 ? Math.min((period.protein / targetPerMeal) * 100, 100) : 0;
          const isLow = period.protein > 0 && period.protein < 20;
          const isEmpty = period.protein === 0;

          return (
            <div key={period.id} className="relative">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={cn("p-2 rounded-lg shrink-0", period.bg)}>
                  <Icon className={cn("h-4 w-4", period.color)} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">{period.label}</p>
                      <p className="text-xs text-muted-foreground">{period.timeRange}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-lg font-bold font-mono tabular-nums",
                        isLow && "text-orange-600",
                        isEmpty && "text-muted-foreground"
                      )}>
                        {period.protein.toFixed(0)}g
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-500",
                        isLow && "bg-orange-500",
                        !isLow && percentage >= 100 && "bg-green-500",
                        !isLow && percentage < 100 && percentage > 0 && "bg-primary"
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  {/* Meals List */}
                  {period.meals.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {period.meals.map((meal, mealIndex) => (
                        <p key={mealIndex} className="text-xs text-muted-foreground">
                          • {meal.name} ({meal.protein.toFixed(0)}g)
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < periodsWithProtein.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-4 bg-border" />
              )}
            </div>
          );
        })}
      </div>

      {/* Smart Suggestion */}
      {needsAttention && (
        <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                Zona de Risco Muscular
              </p>
              <p className="text-xs text-orange-800 dark:text-orange-200 mt-1">
                Seu {lowestPeriod.label.toLowerCase()} tem apenas {lowestPeriod.protein.toFixed(0)}g de proteína.
                Adicione mais {(targetPerMeal - lowestPeriod.protein).toFixed(0)}g para preservar massa muscular.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold font-mono tabular-nums">{totalProtein.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground mt-1">Total (g)</p>
        </div>
        <div>
          <p className="text-2xl font-bold font-mono tabular-nums">{proteinPerKg.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground mt-1">g/kg</p>
        </div>
        <div>
          <p className={cn(
            "text-2xl font-bold font-mono tabular-nums",
            proteinPerKg >= 1.6 && "text-green-600",
            proteinPerKg >= 1.4 && proteinPerKg < 1.6 && "text-yellow-600",
            proteinPerKg < 1.4 && "text-orange-600"
          )}>
            {((proteinPerKg / 1.6) * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">da meta</p>
        </div>
      </div>
    </Card>
  );
}
