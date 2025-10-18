import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Syringe, CheckCircle2, Clock } from "lucide-react";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MedicationDose {
  date: Date;
  completed: boolean;
  dose: string;
}

interface MedicationTrackerProps {
  doses: MedicationDose[];
  onMarkComplete?: (date: Date) => void;
}

export default function MedicationTracker({ doses, onMarkComplete }: MedicationTrackerProps) {
  const nextDose = doses.find(d => !d.completed);
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Syringe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Medicação</h3>
            <p className="text-xs text-muted-foreground">Acompanhe suas doses</p>
          </div>
        </div>
      </div>

      {nextDose && (
        <div className="p-4 rounded-xl bg-muted/50 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Próxima dose</p>
                <p className="text-xs text-muted-foreground">
                  {format(nextDose.date, "EEEE, dd 'de' MMMM", { locale: ptBR })} • {nextDose.dose}
                </p>
              </div>
            </div>
            <Button 
              size="sm" 
              onClick={() => onMarkComplete?.(nextDose.date)}
              data-testid="button-mark-dose-complete"
            >
              Marcar como feito
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Histórico (7 dias)
        </p>
        {doses.slice(0, 7).map((dose, index) => (
          <div 
            key={index}
            className="flex items-center justify-between py-2 border-b last:border-0"
          >
            <div className="flex items-center gap-3">
              {dose.completed ? (
                <CheckCircle2 className="h-4 w-4 text-chart-2" />
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
              )}
              <span className="text-sm">
                {format(dose.date, "dd 'de' MMM", { locale: ptBR })}
              </span>
            </div>
            <span className="text-xs text-muted-foreground font-mono">{dose.dose}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
