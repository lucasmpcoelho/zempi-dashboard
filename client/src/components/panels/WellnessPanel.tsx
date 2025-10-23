import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeatMapCalendar from "@/components/ui/HeatMapCalendar";
import SideEffectsIntelligence from "@/components/dashboards/SideEffectsIntelligence";
import { Smile, Meh, Frown, AlertCircle } from "lucide-react";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

export default function WellnessPanel() {
  const today = format(new Date(), "yyyy-MM-dd");
  const thirtyDaysAgo = format(subDays(new Date(), 29), "yyyy-MM-dd");

  // Fetch mood entries
  const { data: moodEntries = [] } = useQuery({
    queryKey: ["/api/mood", { startDate: thirtyDaysAgo, endDate: today }]
  });

  // Fetch medication doses for correlation
  const { data: medicationDoses = [] } = useQuery({
    queryKey: ["/api/medication"]
  });

  // Fetch meals for trigger correlation
  const { data: meals = [] } = useQuery({
    queryKey: ["/api/meals", { startDate: thirtyDaysAgo, endDate: today }]
  });

  // Get today's mood
  const todayMood = moodEntries?.find((entry: any) => entry.date === today);

  // Calculate mood statistics
  const moodCounts = moodEntries?.reduce(
    (acc: any, entry: any) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    },
    { good: 0, neutral: 0, bad: 0 }
  ) || { good: 0, neutral: 0, bad: 0 };

  const totalDays = moodEntries?.length || 1;
  const goodPercentage = Math.round((moodCounts.good / totalDays) * 100);
  const neutralPercentage = Math.round((moodCounts.neutral / totalDays) * 100);
  const badPercentage = Math.round((moodCounts.bad / totalDays) * 100);

  // Collect all symptoms with frequency
  const symptomFrequency = moodEntries?.reduce((acc: any, entry: any) => {
    entry.symptoms?.forEach((symptom: string) => {
      acc[symptom] = (acc[symptom] || 0) + 1;
    });
    return acc;
  }, {}) || {};

  const topSymptoms = Object.entries(symptomFrequency)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 5)
    .map(([symptom, count]) => ({
      name: symptom,
      count: count as number,
      percentage: Math.round((count as number / totalDays) * 100)
    }));

  // Prepare heat map data (mood quality score)
  const heatMapData = moodEntries?.map((entry: any) => ({
    date: entry.date,
    value: entry.mood === "good" ? 100 : entry.mood === "neutral" ? 50 : 0,
    label: entry.mood === "good" ? "Dia bom" : entry.mood === "neutral" ? "Dia OK" : "Dia ruim"
  })) || [];

  // Get mood icon and color
  const getMoodDisplay = (mood: string) => {
    switch (mood) {
      case "good":
        return {
          icon: Smile,
          label: "Muito bem",
          color: "text-green-500",
          bgColor: "bg-green-500/10"
        };
      case "neutral":
        return {
          icon: Meh,
          label: "Normal",
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10"
        };
      case "bad":
        return {
          icon: Frown,
          label: "Mal",
          color: "text-red-500",
          bgColor: "bg-red-500/10"
        };
      default:
        return {
          icon: Meh,
          label: "Não registrado",
          color: "text-muted-foreground",
          bgColor: "bg-muted"
        };
    }
  };

  const todayMoodDisplay = getMoodDisplay(todayMood?.mood || "");
  const TodayMoodIcon = todayMoodDisplay.icon;

  // Recent mood entries (last 7 days)
  const recentMoods = moodEntries
    ?.slice()
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7) || [];

  return (
    <div className="space-y-6 pb-6">
      {/* Today's Mood Hero */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Como você está hoje?</h2>
        <div className="flex items-center gap-4">
          <div className={cn("p-4 rounded-full", todayMoodDisplay.bgColor)}>
            <TodayMoodIcon className={cn("h-8 w-8", todayMoodDisplay.color)} />
          </div>
          <div className="flex-1">
            <p className="text-2xl font-bold">{todayMoodDisplay.label}</p>
            {todayMood?.symptoms && todayMood.symptoms.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {todayMood.symptoms.map((symptom: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {symptom}
                  </Badge>
                ))}
              </div>
            )}
            {todayMood?.notes && (
              <p className="text-sm text-muted-foreground mt-2">{todayMood.notes}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Mood Statistics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Últimos 30 Dias</h2>
        <div className="space-y-3">
          {/* Good days */}
          <div className="flex items-center gap-3">
            <Smile className="h-5 w-5 text-green-500" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Dias bons</span>
                <span className="text-sm text-muted-foreground">
                  {moodCounts.good} dias ({goodPercentage}%)
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${goodPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Neutral days */}
          <div className="flex items-center gap-3">
            <Meh className="h-5 w-5 text-yellow-500" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Dias normais</span>
                <span className="text-sm text-muted-foreground">
                  {moodCounts.neutral} dias ({neutralPercentage}%)
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all duration-500"
                  style={{ width: `${neutralPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bad days */}
          <div className="flex items-center gap-3">
            <Frown className="h-5 w-5 text-red-500" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Dias ruins</span>
                <span className="text-sm text-muted-foreground">
                  {moodCounts.bad} dias ({badPercentage}%)
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-500"
                  style={{ width: `${badPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Top Symptoms */}
      {topSymptoms.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold">Sintomas Mais Frequentes</h2>
          </div>
          <div className="space-y-3">
            {topSymptoms.map((symptom, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{symptom.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {symptom.count} vezes ({symptom.percentage}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 transition-all duration-500"
                      style={{ width: `${symptom.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Heat Map Calendar */}
      <Card className="p-6">
        <HeatMapCalendar
          data={heatMapData}
          title="Calendário de Bem-estar"
          subtitle="Verde = dia bom, Amarelo = normal, Vermelho = ruim"
          colorScale={{
            empty: "bg-muted",
            low: "bg-red-500",
            medium: "bg-red-400",
            high: "bg-yellow-400",
            excellent: "bg-green-500"
          }}
        />
      </Card>

      {/* Recent Entries Timeline */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Últimos 7 Dias</h2>
        <div className="space-y-4">
          {recentMoods.map((entry: any) => {
            const display = getMoodDisplay(entry.mood);
            const Icon = display.icon;

            return (
              <div key={entry.date} className="flex gap-3 pb-4 border-b last:border-0">
                <div className={cn("p-2 rounded-lg h-fit", display.bgColor)}>
                  <Icon className={cn("h-4 w-4", display.color)} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{display.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(entry.date), "dd MMM", { locale: ptBR })}
                    </span>
                  </div>
                  {entry.symptoms && entry.symptoms.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {entry.symptoms.map((symptom: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {entry.notes && (
                    <p className="text-xs text-muted-foreground mt-1">{entry.notes}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Side Effects Intelligence */}
      <SideEffectsIntelligence
        moodEntries={moodEntries}
        medicationDoses={medicationDoses}
        meals={meals}
      />
    </div>
  );
}
