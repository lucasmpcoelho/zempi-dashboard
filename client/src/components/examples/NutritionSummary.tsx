import NutritionSummary from '../NutritionSummary';

export default function NutritionSummaryExample() {
  const mockMeals = [
    { name: "Café da manhã", calories: 350, time: "08:30" },
    { name: "Almoço", calories: 520, time: "12:45" },
    { name: "Lanche", calories: 150, time: "16:00" },
  ];
  
  return (
    <div className="p-6 max-w-md">
      <NutritionSummary 
        meals={mockMeals}
        totalCalories={1020}
        targetCalories={1600}
      />
    </div>
  );
}
