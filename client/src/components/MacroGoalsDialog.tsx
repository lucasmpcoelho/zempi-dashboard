import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface MacroGoalsDialogProps {
  currentGoals: MacroGoals;
  onSave: (goals: MacroGoals) => void;
}

export default function MacroGoalsDialog({ currentGoals, onSave }: MacroGoalsDialogProps) {
  const [open, setOpen] = useState(false);
  const [goals, setGoals] = useState(currentGoals);

  const handleSave = () => {
    onSave(goals);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" data-testid="button-edit-macro-goals">
          <Settings className="h-4 w-4 mr-1" />
          Ajustar metas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajustar Metas de Macronutrientes</DialogTitle>
          <DialogDescription>
            Personalize suas metas diárias de acordo com suas necessidades
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="calories">Calorias (kcal)</Label>
            <Input
              id="calories"
              type="number"
              value={goals.calories}
              onChange={(e) => setGoals({ ...goals, calories: parseInt(e.target.value) || 0 })}
              data-testid="input-calories-goal"
            />
            <p className="text-xs text-muted-foreground">Recomendado: 1400-1800 kcal para perda de peso</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="protein">Proteína (g)</Label>
            <Input
              id="protein"
              type="number"
              value={goals.protein}
              onChange={(e) => setGoals({ ...goals, protein: parseInt(e.target.value) || 0 })}
              data-testid="input-protein-goal"
            />
            <p className="text-xs text-muted-foreground">Recomendado: 1.6g/kg de peso corporal</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="carbs">Carboidratos (g)</Label>
            <Input
              id="carbs"
              type="number"
              value={goals.carbs}
              onChange={(e) => setGoals({ ...goals, carbs: parseInt(e.target.value) || 0 })}
              data-testid="input-carbs-goal"
            />
            <p className="text-xs text-muted-foreground">Ajuste conforme sua preferência alimentar</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fats">Gorduras (g)</Label>
            <Input
              id="fats"
              type="number"
              value={goals.fats}
              onChange={(e) => setGoals({ ...goals, fats: parseInt(e.target.value) || 0 })}
              data-testid="input-fats-goal"
            />
            <p className="text-xs text-muted-foreground">Recomendado: 20-30% das calorias totais</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button className="flex-1" onClick={handleSave} data-testid="button-save-macro-goals">
            Salvar Metas
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
