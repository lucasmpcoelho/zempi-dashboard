import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Apple, Beef, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AddMealDialog from "@/components/AddMealDialog";

interface Meal {
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  time: string;
}

interface NutritionSummaryProps {
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  targetCalories: number;
  targetProtein: number;
}

export default function NutritionSummary({
  meals,
  totalCalories,
  totalProtein,
  targetCalories,
  targetProtein
}: NutritionSummaryProps) {
  const [expandedMealIndex, setExpandedMealIndex] = useState<number | null>(null);

  const caloriePercentage = Math.min((totalCalories / targetCalories) * 100, 100);
  const proteinPercentage = Math.min((totalProtein / targetProtein) * 100, 100);
  const remainingCalories = Math.max(targetCalories - totalCalories, 0);
  const remainingProtein = Math.max(targetProtein - totalProtein, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-chart-1/10">
            <Beef className="h-5 w-5 text-chart-1" />
          </div>
          <div>
            <h3 className="font-semibold">Nutrição de Hoje</h3>
            <p className="text-xs text-muted-foreground">
              Foco em proteína para preservar músculo
            </p>
          </div>
        </div>
        <AddMealDialog />
      </div>

      {/* Protein Bar - Destaque */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Proteína</p>
            {proteinPercentage >= 100 && (
              <Badge variant="default" className="h-5 text-xs">💪 Meta atingida!</Badge>
            )}
          </div>
          <p className="text-sm font-mono tabular-nums font-semibold">
            {totalProtein.toFixed(0)} / {targetProtein} g
          </p>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-500",
              proteinPercentage >= 100 && "bg-green-500",
              proteinPercentage >= 75 && proteinPercentage < 100 && "bg-chart-1",
              proteinPercentage >= 50 && proteinPercentage < 75 && "bg-yellow-500",
              proteinPercentage < 50 && "bg-orange-500"
            )}
            style={{ width: `${proteinPercentage}%` }}
          />
        </div>
        {remainingProtein > 0 && (
          <p className="text-xs text-muted-foreground mt-1.5">
            Faltam {remainingProtein.toFixed(0)}g para preservar massa muscular
          </p>
        )}
      </div>

      {/* Calorie Bar - Secundário */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-muted-foreground">Calorias</p>
          <p className="text-xs font-mono tabular-nums text-muted-foreground">
            {totalCalories} / {targetCalories} kcal
          </p>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-chart-4 transition-all duration-500"
            style={{ width: `${caloriePercentage}%` }}
          />
        </div>
      </div>

      {/* Meals List */}
      {meals.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Refeições de hoje
          </p>
          {meals.map((meal, index) => {
            const isExpanded = expandedMealIndex === index;
            const mealProtein = meal.protein || 0;
            const proteinStatus = mealProtein >= 25 ? "excellent" : mealProtein >= 15 ? "good" : "low";

            return (
              <div
                key={index}
                className={cn(
                  "rounded-lg border transition-all",
                  isExpanded && "bg-muted/30"
                )}
              >
                <div
                  className="flex items-center justify-between p-3 cursor-pointer"
                  onClick={() => setExpandedMealIndex(isExpanded ? null : index)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium truncate">{meal.name}</p>
                      {proteinStatus === "excellent" && (
                        <Badge variant="default" className="h-5 text-xs shrink-0">💪 Ótimo</Badge>
                      )}
                      {proteinStatus === "low" && mealProtein > 0 && (
                        <Badge variant="secondary" className="h-5 text-xs bg-orange-500/10 text-orange-700 dark:text-orange-400 shrink-0">
                          ⚠️ Baixa
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{meal.time}</span>
                      <span className="font-semibold text-chart-1">
                        {mealProtein.toFixed(0)}g proteína
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-3">
                    <span className="text-xs font-mono tabular-nums text-muted-foreground">
                      {meal.calories} kcal
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-3 pb-3 space-y-2">
                    <div className="grid grid-cols-3 gap-3 pt-2 border-t text-center">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Proteína</p>
                        <p className="text-sm font-bold font-mono tabular-nums text-chart-1">
                          {mealProtein.toFixed(0)}g
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Carbos</p>
                        <p className="text-sm font-bold font-mono tabular-nums">
                          {(meal.carbs || 0).toFixed(0)}g
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Gorduras</p>
                        <p className="text-sm font-bold font-mono tabular-nums">
                          {(meal.fats || 0).toFixed(0)}g
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground mb-3">
            Nenhuma refeição registrada hoje
          </p>
          <AddMealDialog
            trigger={
              <Button size="sm" data-testid="button-log-first-meal">
                Adicionar primeira refeição
              </Button>
            }
          />
        </div>
      )}
    </Card>
  );
}
