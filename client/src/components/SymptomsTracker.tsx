import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertCircle, Plus, TrendingDown, Check } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { useMutation, queryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const commonSymptoms = [
  "Náusea",
  "Enjoo",
  "Vômito",
  "Dor de cabeça",
  "Fadiga",
  "Tontura",
  "Constipação",
  "Diarreia",
  "Dor abdominal",
  "Perda de apetite",
  "Azia",
  "Inchaço",
];

interface SymptomEntry {
  date: Date;
  symptoms: string[];
}

interface SymptomsTrackerProps {
  entries: SymptomEntry[];
}

export default function SymptomsTracker({ entries }: SymptomsTrackerProps) {
  const [open, setOpen] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const { toast } = useToast();

  const todayEntry = entries.find(e => 
    format(e.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  );

  const addSymptomsMutation = useMutation({
    mutationFn: async (symptoms: string[]) => {
      const today = new Date().toISOString().split('T')[0];
      return apiRequest("/api/mood-entries", {
        method: "POST",
        body: JSON.stringify({
          date: today,
          mood: "neutral",
          symptoms,
          notes: null,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/mood-entries"] });
      toast({
        title: "Sintomas registrados!",
        description: "Seus sintomas foram registrados com sucesso.",
      });
      setSelectedSymptoms([]);
      setOpen(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível registrar os sintomas.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "Atenção",
        description: "Selecione pelo menos um sintoma.",
        variant: "destructive",
      });
      return;
    }
    addSymptomsMutation.mutate(selectedSymptoms);
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-chart-3/10">
            <AlertCircle className="h-4 w-4 text-chart-3" />
          </div>
          <div>
            <h3 className="font-semibold">Sintomas</h3>
            <p className="text-xs text-muted-foreground">
              {todayEntry ? "Registrado hoje" : "Acompanhe efeitos colaterais"}
            </p>
          </div>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" data-testid="button-add-symptoms">
              <Plus className="h-4 w-4 mr-1" />
              Registrar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrar Sintomas</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Selecione os sintomas que você está sentindo hoje:
              </p>
              <div className="space-y-2">
                {commonSymptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover-elevate"
                  >
                    <Checkbox
                      id={symptom}
                      checked={selectedSymptoms.includes(symptom)}
                      onCheckedChange={() => toggleSymptom(symptom)}
                    />
                    <Label htmlFor={symptom} className="flex-1 cursor-pointer text-sm">
                      {symptom}
                    </Label>
                  </div>
                ))}
              </div>
              <Button 
                onClick={handleSubmit} 
                className="w-full" 
                disabled={addSymptomsMutation.isPending || selectedSymptoms.length === 0}
              >
                {addSymptomsMutation.isPending ? "Salvando..." : "Salvar Sintomas"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {todayEntry ? (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-green-500/20">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium mb-2">Sintomas de hoje</p>
              {todayEntry.symptoms.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {todayEntry.symptoms.map((symptom, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Nenhum sintoma relatado</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <AlertCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground mb-3">
            Registre seus sintomas de hoje
          </p>
          <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
            Adicionar sintomas
          </Button>
        </div>
      )}

      {entries.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Histórico (7 dias)
          </p>
          <div className="space-y-2">
            {entries.slice(0, 7).map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {format(entry.date, "dd/MM", { locale: ptBR })}
                </span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {entry.symptoms.length > 0 ? (
                    entry.symptoms.slice(0, 3).map((symptom, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {symptom}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">Sem sintomas</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
