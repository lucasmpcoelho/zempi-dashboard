import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Smile, Meh, Frown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface AddMoodDialogProps {
  trigger?: React.ReactNode;
}

const moodOptions = [
  { value: "good", label: "Bem", icon: Smile, color: "text-green-600" },
  { value: "neutral", label: "Normal", icon: Meh, color: "text-yellow-600" },
  { value: "bad", label: "Ruim", icon: Frown, color: "text-red-600" },
];

export default function AddMoodDialog({ trigger }: AddMoodDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<"good" | "neutral" | "bad">("neutral");
  const [notes, setNotes] = useState("");

  const addMoodMutation = useMutation({
    mutationFn: async (data: any) => {
      const today = new Date().toISOString().split('T')[0];
      return apiRequest("POST", "/api/mood-entries", {
        ...data,
        date: today,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/mood-entries"] });
      toast({
        title: "Humor registrado!",
        description: "Seu humor foi registrado com sucesso.",
      });
      setSelectedMood("neutral");
      setNotes("");
      setOpen(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível registrar seu humor.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMoodMutation.mutate({
      mood: selectedMood,
      symptoms: [],
      notes: notes || null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" variant="outline" data-testid="button-add-mood">
            <Plus className="h-4 w-4 mr-1" />
            Adicionar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Como você está se sentindo?</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="mb-3 block">Humor geral</Label>
            <div className="grid grid-cols-3 gap-3">
              {moodOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedMood === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedMood(option.value as any)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover-elevate"
                    }`}
                    data-testid={`button-mood-${option.value}`}
                  >
                    <Icon className={`h-8 w-8 mx-auto mb-2 ${option.color}`} />
                    <p className="text-sm font-medium">{option.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Como foi seu dia? Alguma observação sobre seu tratamento..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={addMoodMutation.isPending}>
            {addMoodMutation.isPending ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
