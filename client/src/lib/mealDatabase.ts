// High-protein meal database for GLP-1 users
// Optimized for small portions, easy digestion, and muscle preservation

export interface MealTemplate {
  id: string;
  name: string;
  protein: number; // grams
  calories: number;
  fats: number; // grams
  carbs: number; // grams
  portionSize: "small" | "medium" | "large";
  timeOfDay: ("breakfast" | "lunch" | "dinner" | "snack")[];
  blandness: number; // 0-10, higher = more bland/gentle
  dietTags: string[]; // vegetarian, vegan, low-carb, etc.
  restrictedIngredients: string[]; // lactose, gluten, etc.
  difficulty: "easy" | "medium" | "hard";
  prepTime: number; // minutes
  description: string;
}

export const mealDatabase: MealTemplate[] = [
  // High-protein breakfast options
  {
    id: "eggs-scrambled",
    name: "Ovos mexidos (2 ovos)",
    protein: 14,
    calories: 180,
    fats: 12,
    carbs: 2,
    portionSize: "small",
    timeOfDay: ["breakfast", "snack"],
    blandness: 8,
    dietTags: ["vegetarian", "low-carb", "keto"],
    restrictedIngredients: [],
    difficulty: "easy",
    prepTime: 5,
    description: "Ovos mexidos simples, fácil digestão"
  },
  {
    id: "greek-yogurt",
    name: "Iogurte grego natural (200g)",
    protein: 20,
    calories: 150,
    fats: 4,
    carbs: 12,
    portionSize: "small",
    timeOfDay: ["breakfast", "snack"],
    blandness: 9,
    dietTags: ["vegetarian"],
    restrictedIngredients: ["lactose"],
    difficulty: "easy",
    prepTime: 0,
    description: "Rico em proteína, probióticos naturais"
  },
  {
    id: "protein-shake",
    name: "Shake de proteína (whey)",
    protein: 25,
    calories: 120,
    fats: 2,
    carbs: 3,
    portionSize: "small",
    timeOfDay: ["breakfast", "snack"],
    blandness: 7,
    dietTags: ["low-carb"],
    restrictedIngredients: ["lactose"],
    difficulty: "easy",
    prepTime: 2,
    description: "Rápido, fácil absorção"
  },
  {
    id: "cottage-cheese",
    name: "Queijo cottage (150g)",
    protein: 18,
    calories: 120,
    fats: 3,
    carbs: 6,
    portionSize: "small",
    timeOfDay: ["breakfast", "snack"],
    blandness: 8,
    dietTags: ["vegetarian", "low-carb"],
    restrictedIngredients: ["lactose"],
    difficulty: "easy",
    prepTime: 0,
    description: "Alta proteína, digestão lenta"
  },

  // Lunch/Dinner options
  {
    id: "grilled-chicken-breast",
    name: "Peito de frango grelhado (150g)",
    protein: 45,
    calories: 240,
    fats: 3,
    carbs: 0,
    portionSize: "medium",
    timeOfDay: ["lunch", "dinner"],
    blandness: 7,
    dietTags: ["low-carb", "keto"],
    restrictedIngredients: [],
    difficulty: "medium",
    prepTime: 15,
    description: "Proteína magra completa"
  },
  {
    id: "baked-salmon",
    name: "Salmão assado (150g)",
    protein: 34,
    calories: 280,
    fats: 18,
    carbs: 0,
    portionSize: "medium",
    timeOfDay: ["lunch", "dinner"],
    blandness: 6,
    dietTags: ["low-carb", "keto"],
    restrictedIngredients: [],
    difficulty: "medium",
    prepTime: 20,
    description: "Ômega-3, proteína de qualidade"
  },
  {
    id: "turkey-breast",
    name: "Peito de peru (150g)",
    protein: 42,
    calories: 180,
    fats: 2,
    carbs: 0,
    portionSize: "medium",
    timeOfDay: ["lunch", "dinner", "snack"],
    blandness: 8,
    dietTags: ["low-carb", "keto"],
    restrictedIngredients: [],
    difficulty: "easy",
    prepTime: 5,
    description: "Muito magro, alta proteína"
  },
  {
    id: "tuna-can",
    name: "Atum em lata (1 lata)",
    protein: 25,
    calories: 120,
    fats: 1,
    carbs: 0,
    portionSize: "small",
    timeOfDay: ["lunch", "snack"],
    blandness: 7,
    dietTags: ["low-carb", "keto"],
    restrictedIngredients: [],
    difficulty: "easy",
    prepTime: 0,
    description: "Prático, proteína magra"
  },
  {
    id: "tofu-stir-fry",
    name: "Tofu refogado (200g)",
    protein: 20,
    calories: 160,
    fats: 10,
    carbs: 4,
    portionSize: "medium",
    timeOfDay: ["lunch", "dinner"],
    blandness: 6,
    dietTags: ["vegetarian", "vegan", "low-carb"],
    restrictedIngredients: [],
    difficulty: "medium",
    prepTime: 15,
    description: "Proteína vegetal completa"
  },
  {
    id: "lentil-soup",
    name: "Sopa de lentilha (1 tigela)",
    protein: 18,
    calories: 230,
    fats: 3,
    carbs: 40,
    portionSize: "medium",
    timeOfDay: ["lunch", "dinner"],
    blandness: 9,
    dietTags: ["vegetarian", "vegan"],
    restrictedIngredients: [],
    difficulty: "medium",
    prepTime: 30,
    description: "Fibras, proteína vegetal, fácil digestão"
  },

  // Snacks
  {
    id: "hard-boiled-eggs",
    name: "Ovos cozidos (2 unidades)",
    protein: 12,
    calories: 140,
    fats: 10,
    carbs: 2,
    portionSize: "small",
    timeOfDay: ["snack"],
    blandness: 8,
    dietTags: ["vegetarian", "low-carb", "keto"],
    restrictedIngredients: [],
    difficulty: "easy",
    prepTime: 10,
    description: "Prático, completo"
  },
  {
    id: "protein-bar",
    name: "Barra de proteína",
    protein: 20,
    calories: 200,
    fats: 7,
    carbs: 18,
    portionSize: "small",
    timeOfDay: ["snack"],
    blandness: 6,
    dietTags: [],
    restrictedIngredients: [],
    difficulty: "easy",
    prepTime: 0,
    description: "Portátil, conveniente"
  },
  {
    id: "peanut-butter",
    name: "Pasta de amendoim (2 colheres)",
    protein: 8,
    calories: 190,
    fats: 16,
    carbs: 7,
    portionSize: "small",
    timeOfDay: ["snack"],
    blandness: 5,
    dietTags: ["vegetarian", "vegan"],
    restrictedIngredients: [],
    difficulty: "easy",
    prepTime: 0,
    description: "Energia rápida, proteína"
  },
  {
    id: "beef-jerky",
    name: "Carne seca (30g)",
    protein: 15,
    calories: 80,
    fats: 1,
    carbs: 2,
    portionSize: "small",
    timeOfDay: ["snack"],
    blandness: 4,
    dietTags: ["low-carb", "keto"],
    restrictedIngredients: [],
    difficulty: "easy",
    prepTime: 0,
    description: "Portátil, baixa caloria"
  },
  {
    id: "edamame",
    name: "Edamame (1 xícara)",
    protein: 17,
    calories: 190,
    fats: 8,
    carbs: 15,
    portionSize: "small",
    timeOfDay: ["snack"],
    blandness: 7,
    dietTags: ["vegetarian", "vegan"],
    restrictedIngredients: [],
    difficulty: "easy",
    prepTime: 5,
    description: "Proteína vegetal, fibras"
  },

  // Gentle options for nausea days
  {
    id: "chicken-broth",
    name: "Caldo de frango (1 tigela)",
    protein: 6,
    calories: 40,
    fats: 1,
    carbs: 2,
    portionSize: "small",
    timeOfDay: ["lunch", "dinner", "snack"],
    blandness: 10,
    dietTags: ["low-carb"],
    restrictedIngredients: [],
    difficulty: "easy",
    prepTime: 5,
    description: "Hidratante, fácil digestão"
  },
  {
    id: "plain-rice-chicken",
    name: "Arroz branco com frango desfiado",
    protein: 25,
    calories: 300,
    fats: 4,
    carbs: 45,
    portionSize: "small",
    timeOfDay: ["lunch", "dinner"],
    blandness: 9,
    dietTags: [],
    restrictedIngredients: [],
    difficulty: "medium",
    prepTime: 20,
    description: "Suave, completo"
  },
  {
    id: "white-fish",
    name: "Peixe branco grelhado (150g)",
    protein: 30,
    calories: 150,
    fats: 3,
    carbs: 0,
    portionSize: "medium",
    timeOfDay: ["lunch", "dinner"],
    blandness: 9,
    dietTags: ["low-carb", "keto"],
    restrictedIngredients: [],
    difficulty: "medium",
    prepTime: 15,
    description: "Leve, fácil digestão"
  }
];

// Helper function to filter meals by restrictions
export function filterMealsByRestrictions(
  meals: MealTemplate[],
  restrictions: string[]
): MealTemplate[] {
  return meals.filter(meal =>
    !meal.restrictedIngredients.some(ingredient =>
      restrictions.includes(ingredient)
    )
  );
}

// Helper function to get meals by time of day
export function getMealsByTimeOfDay(
  meals: MealTemplate[],
  timeOfDay: "breakfast" | "lunch" | "dinner" | "snack"
): MealTemplate[] {
  return meals.filter(meal => meal.timeOfDay.includes(timeOfDay));
}

// Helper function to get meals by diet preference
export function getMealsByDiet(
  meals: MealTemplate[],
  dietPreferences: string[]
): MealTemplate[] {
  if (dietPreferences.includes("Como de tudo")) {
    return meals;
  }

  return meals.filter(meal =>
    dietPreferences.some(pref => meal.dietTags.includes(pref.toLowerCase()))
  );
}
