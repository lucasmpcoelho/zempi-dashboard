import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, queryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AddMealDialogProps {
  trigger?: React.ReactNode;
}

export default function AddMealDialog({ trigger }: AddMealDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  const addMealMutation = useMutation({
    mutationFn: async (data: any) => {
      const today = new Date().toISOString().split('T')[0];
      return apiRequest("/api/meals", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          date: today,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/meals"] });
      toast({
        title: "Refeição adicionada!",
        description: "Sua refeição foi registrada com sucesso.",
      });
      setFormData({ name: "", calories: "", protein: "", carbs: "", fats: "" });
      setOpen(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a refeição.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMealMutation.mutate({
      name: formData.name,
      calories: parseFloat(formData.calories) || 0,
      protein: parseFloat(formData.protein) || 0,
      carbs: parseFloat(formData.carbs) || 0,
      fats: parseFloat(formData.fats) || 0,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" variant="outline" data-testid="button-add-meal">
            <Plus className="h-4 w-4 mr-1" />
            Refeição
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Refeição</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome da refeição</Label>
            <Input
              id="name"
              placeholder="Ex: Almoço, Café da manhã"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="calories">Calorias (kcal)</Label>
              <Input
                id="calories"
                type="number"
                step="1"
                placeholder="0"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="protein">Proteína (g)</Label>
              <Input
                id="protein"
                type="number"
                step="0.1"
                placeholder="0"
                value={formData.protein}
                onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="carbs">Carboidratos (g)</Label>
              <Input
                id="carbs"
                type="number"
                step="0.1"
                placeholder="0"
                value={formData.carbs}
                onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="fats">Gorduras (g)</Label>
              <Input
                id="fats"
                type="number"
                step="0.1"
                placeholder="0"
                value={formData.fats}
                onChange={(e) => setFormData({ ...formData, fats: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={addMealMutation.isPending}>
            {addMealMutation.isPending ? "Salvando..." : "Salvar Refeição"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
