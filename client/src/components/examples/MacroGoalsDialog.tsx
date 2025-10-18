import MacroGoalsDialog from '../MacroGoalsDialog';

export default function MacroGoalsDialogExample() {
  const currentGoals = {
    calories: 1600,
    protein: 120,
    carbs: 180,
    fats: 50,
  };
  
  return (
    <div className="p-6">
      <MacroGoalsDialog 
        currentGoals={currentGoals}
        onSave={(goals) => console.log('New goals:', goals)}
      />
    </div>
  );
}
