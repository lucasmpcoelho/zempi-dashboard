import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Utensils, Clock, Zap, ThumbsDown, Info, Sparkles } from "lucide-react";
import { mealDatabase, type MealTemplate } from "@/lib/mealDatabase";
import { cn } from "@/lib/utils";

interface MealSuggestionsProps {
  proteinRemaining: number; // grams needed today
  currentWeight: number; // kg
  currentSymptoms: string[];
  foodPreferences: string[];
  recentMeals: string[]; // meal IDs from last 3 days
  timeOfDay: "breakfast" | "lunch" | "dinner" | "snack";
}

export default function MealSuggestions({
  proteinRemaining,
  currentWeight,
  currentSymptoms,
  foodPreferences,
  recentMeals,
  timeOfDay
}: MealSuggestionsProps) {
  const [dislikedMeals, setDislikedMeals] = useState<string[]>([]);

  const suggestions = useMemo(() => {
    let candidates = mealDatabase;

    // 1. Filter by time of day
    candidates = candidates.filter(meal => meal.timeOfDay.includes(timeOfDay));

    // 2. Filter by food preferences
    if (foodPreferences && !foodPreferences.includes("Como de tudo")) {
      const preferenceMap: Record<string, string> = {
        "Vegetariano": "vegetarian",
        "Vegano": "vegan",
        "Low-carb": "low-carb",
        "Sem Lactose": "lactose",
        "Sem Glúten": "gluten"
      };

      // Include meals that match diet preferences
      const dietTags = foodPreferences.map(pref => preferenceMap[pref]).filter(Boolean);
      if (dietTags.length > 0) {
        candidates = candidates.filter(meal =>
          dietTags.some(tag => {
            if (tag === "lactose" || tag === "gluten") {
              return !meal.restrictedIngredients.includes(tag);
            }
            return meal.dietTags.includes(tag);
          })
        );
      }
    }

    // 3. Adjust for symptoms (nausea, etc.)
    const hasNausea = currentSymptoms.some(s =>
      s.toLowerCase().includes('náusea') ||
      s.toLowerCase().includes('nausea') ||
      s.toLowerCase().includes('enjoo')
    );

    if (hasNausea) {
      // Prefer bland, low-fat foods
      candidates = candidates
        .filter(meal => meal.fats < 15) // Low fat
        .filter(meal => meal.portionSize === "small") // Small portions
        .sort((a, b) => b.blandness - a.blandness); // Bland first
    }

    // 4. Filter out recent meals (variety)
    candidates = candidates.filter(meal => !recentMeals.includes(meal.id));

    // 5. Filter out disliked meals
    candidates = candidates.filter(meal => !dislikedMeals.includes(meal.id));

    // 6. Prioritize meals that provide significant protein
    const minProtein = Math.max(10, proteinRemaining * 0.3); // At least 30% of remaining
    candidates = candidates.filter(meal => meal.protein >= minProtein);

    // 7. Sort by protein content (descending)
    candidates = candidates.sort((a, b) => b.protein - a.protein);

    // Return top 3
    return candidates.slice(0, 3);
  }, [proteinRemaining, currentSymptoms, foodPreferences, recentMeals, timeOfDay, dislikedMeals]);

  const handleDislike = (mealId: string) => {
    setDislikedMeals(prev => [...prev, mealId]);
  };

  const getMealTypeLabel = () => {
    switch (timeOfDay) {
      case "breakfast": return "Café da manhã";
      case "lunch": return "Almoço";
      case "dinner": return "Jantar";
      case "snack": return "Lanche";
    }
  };

  if (proteinRemaining <= 10) {
    return (
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/10 border-green-200 dark:border-green-800">
        <div className="text-center">
          <div className="inline-flex p-3 rounded-full bg-green-100 dark:bg-green-900 mb-3">
            <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            Meta de Proteína Alcançada! 🎉
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Você já atingiu sua meta de proteína para hoje. Parabéns!
          </p>
        </div>
      </Card>
    );
  }

  if (suggestions.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <div className="inline-flex p-3 rounded-full bg-muted mb-3">
            <Utensils className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold mb-2">Sem sugestões no momento</h3>
          <p className="text-sm text-muted-foreground">
            Ajuste suas preferências ou tente novamente mais tarde.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-l-4 border-l-teal-500">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-900">
            <Utensils className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Sugestões Inteligentes</h2>
            <p className="text-xs text-muted-foreground">{getMealTypeLabel()}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-sm font-semibold">
          Faltam {proteinRemaining}g
        </Badge>
      </div>

      {currentSymptoms.some(s => s.toLowerCase().includes('náusea') || s.toLowerCase().includes('enjoo')) && (
        <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
              Detectamos que você está com náusea. Sugerimos refeições leves e de fácil digestão.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {suggestions.map((meal) => (
          <div
            key={meal.id}
            className="group relative overflow-hidden rounded-xl border-2 border-muted hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-200 bg-gradient-to-br from-white to-teal-50/30 dark:from-gray-900 dark:to-teal-950/10"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-base mb-1">{meal.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {meal.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDislike(meal.id)}
                  title="Não gostei"
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <p className="text-xs text-muted-foreground">Proteína</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    {meal.protein}g
                  </p>
                </div>
                <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <p className="text-xs text-muted-foreground">Calorias</p>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {meal.calories}
                  </p>
                </div>
                <div className="text-center p-2 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <p className="text-xs text-muted-foreground">Gordura</p>
                  <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
                    {meal.fats}g
                  </p>
                </div>
                <div className="text-center p-2 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <p className="text-xs text-muted-foreground">Carbs</p>
                  <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
                    {meal.carbs}g
                  </p>
                </div>
              </div>

              {/* Tags & Info */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {meal.dietTags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{meal.prepTime}min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    <span className="capitalize">{meal.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button
                className="w-full mt-3 bg-teal-600 hover:bg-teal-700 text-white"
                size="sm"
              >
                <Utensils className="h-4 w-4 mr-2" />
                Registrar esta refeição
              </Button>
            </div>

            {/* Protein highlight badge */}
            <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-green-600 text-white text-xs font-bold shadow-lg">
              {Math.round((meal.protein / proteinRemaining) * 100)}% da meta
            </div>
          </div>
        ))}
      </div>

      {dislikedMeals.length > 0 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDislikedMeals([])}
            className="text-xs"
          >
            Mostrar todas as opções novamente
          </Button>
        </div>
      )}
    </Card>
  );
}
