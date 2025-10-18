import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Apple } from "lucide-react";
import AddMealDialog from "@/components/AddMealDialog";

interface Meal {
  name: string;
  calories: number;
  time: string;
}

interface NutritionSummaryProps {
  meals: Meal[];
  totalCalories: number;
  targetCalories: number;
}

export default function NutritionSummary({ 
  meals, 
  totalCalories, 
  targetCalories
}: NutritionSummaryProps) {
  const percentage = Math.min((totalCalories / targetCalories) * 100, 100);
  const remaining = Math.max(targetCalories - totalCalories, 0);
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-chart-4/10">
            <Apple className="h-5 w-5 text-chart-4" />
          </div>
          <div>
            <h3 className="font-semibold">Nutrição de Hoje</h3>
            <p className="text-xs text-muted-foreground">
              {totalCalories} / {targetCalories} kcal
            </p>
          </div>
        </div>
        <AddMealDialog />
      </div>

      <div className="mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-chart-4 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {remaining > 0 ? `Restam ${remaining} kcal` : "Meta atingida!"}
        </p>
      </div>

      {meals.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Refeições de hoje
          </p>
          {meals.map((meal, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div>
                <p className="text-sm font-medium">{meal.name}</p>
                <p className="text-xs text-muted-foreground">{meal.time}</p>
              </div>
              <span className="text-sm font-mono tabular-nums">
                {meal.calories} kcal
              </span>
            </div>
          ))}
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
