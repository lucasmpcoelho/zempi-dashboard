import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, Plus } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MoodEntry {
  date: Date;
  mood: "good" | "neutral" | "bad";
  symptoms: string[];
}

interface MoodTrackerProps {
  entries: MoodEntry[];
  onAddEntry?: () => void;
}

const moodIcons = {
  good: { icon: Smile, color: "text-chart-2", bg: "bg-chart-2/10" },
  neutral: { icon: Meh, color: "text-yellow-600", bg: "bg-yellow-600/10" },
  bad: { icon: Frown, color: "text-destructive", bg: "bg-destructive/10" },
};

export default function MoodTracker({ entries, onAddEntry }: MoodTrackerProps) {
  const todayEntry = entries.find(e => 
    format(e.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  );
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold">Humor e Sintomas</h3>
          <p className="text-xs text-muted-foreground">Como você está se sentindo?</p>
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onAddEntry}
          data-testid="button-add-mood"
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar
        </Button>
      </div>

      {!todayEntry && (
        <div className="p-4 rounded-xl bg-muted/50 mb-4 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Ainda não registrou seu humor hoje
          </p>
          <Button size="sm" onClick={onAddEntry} data-testid="button-log-mood">
            Registrar agora
          </Button>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Últimos registros
        </p>
        {entries.slice(0, 5).map((entry, index) => {
          const MoodIcon = moodIcons[entry.mood].icon;
          return (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg hover-elevate"
            >
              <div className={`p-2 rounded-lg ${moodIcons[entry.mood].bg}`}>
                <MoodIcon className={`h-4 w-4 ${moodIcons[entry.mood].color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">
                  {format(entry.date, "dd 'de' MMM", { locale: ptBR })}
                </p>
                {entry.symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {entry.symptoms.map((symptom, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-0.5 bg-muted rounded-full"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
