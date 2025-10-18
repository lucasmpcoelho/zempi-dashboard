import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import AddMoodDialog from "@/components/AddMoodDialog";

interface MoodEntry {
  date: Date;
  mood: "good" | "neutral" | "bad";
  symptoms: string[];
  notes?: string;
}

interface MoodTrackerProps {
  entries: MoodEntry[];
}

const moodConfig = {
  good: { 
    icon: Smile, 
    label: "Bem",
    color: "text-green-600 dark:text-green-500", 
    bg: "bg-green-500/10",
    border: "border-green-500/20"
  },
  neutral: { 
    icon: Meh, 
    label: "Normal",
    color: "text-yellow-600 dark:text-yellow-500", 
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20"
  },
  bad: { 
    icon: Frown, 
    label: "Ruim",
    color: "text-red-600 dark:text-red-500", 
    bg: "bg-red-500/10",
    border: "border-red-500/20"
  },
};

export default function MoodTracker({ entries }: MoodTrackerProps) {
  const todayEntry = entries.find(e => 
    format(e.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  );

  // Calculate mood trend (last 7 days)
  const last7Days = entries.filter(e => {
    const daysDiff = (new Date().getTime() - e.date.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff >= 0 && daysDiff < 7;
  });

  const moodScore = (mood: string) => mood === "good" ? 1 : mood === "neutral" ? 0 : -1;
  const avgMood = last7Days.length > 0 
    ? last7Days.reduce((sum, e) => sum + moodScore(e.mood), 0) / last7Days.length 
    : 0;

  const moodTrend = avgMood > 0.2 ? "improving" : avgMood < -0.2 ? "declining" : "stable";
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold">Humor e Bem-estar</h3>
          <div className="flex items-center gap-2 mt-1">
            {moodTrend === "improving" && (
              <>
                <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                <p className="text-xs text-green-600">Tendência positiva</p>
              </>
            )}
            {moodTrend === "declining" && (
              <>
                <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                <p className="text-xs text-red-600">Atenção necessária</p>
              </>
            )}
            {moodTrend === "stable" && (
              <p className="text-xs text-muted-foreground">Últimos 7 dias</p>
            )}
          </div>
        </div>
        <AddMoodDialog />
      </div>

      {!todayEntry && (
        <div className="p-4 rounded-xl bg-muted/50 mb-4 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Como você está se sentindo hoje?
          </p>
          <div className="flex justify-center gap-2">
            {(["good", "neutral", "bad"] as const).map((mood) => {
              const MoodIcon = moodConfig[mood].icon;
              return (
                <Button
                  key={mood}
                  variant="outline"
                  size="sm"
                  className={`${moodConfig[mood].bg} ${moodConfig[mood].border}`}
                  onClick={() => {}}
                  data-testid={`button-mood-${mood}`}
                >
                  <MoodIcon className={`h-4 w-4 ${moodConfig[mood].color}`} />
                </Button>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Histórico Recente
        </p>
        {entries.slice(0, 5).map((entry, index) => {
          const MoodIcon = moodConfig[entry.mood].icon;
          const config = moodConfig[entry.mood];
          
          return (
            <div 
              key={index}
              className={`p-3 rounded-lg border ${config.bg} ${config.border}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-lg bg-background/80`}>
                  <MoodIcon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{config.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(entry.date, "dd/MM", { locale: ptBR })}
                    </span>
                  </div>
                  {entry.symptoms.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {entry.symptoms.map((symptom, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-0.5 bg-background/80 rounded-full"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  )}
                  {entry.notes && (
                    <p className="text-xs text-muted-foreground mt-1">{entry.notes}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
