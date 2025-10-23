import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { format, startOfWeek, endOfWeek, subWeeks, isWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface DailyProteinData {
  date: Date;
  protein: number;
  weight: number;
}

interface ProteinIntelligenceCardProps {
  dailyData: DailyProteinData[];
  currentWeight: number;
}

export default function ProteinIntelligenceCard({
  dailyData,
  currentWeight
}: ProteinIntelligenceCardProps) {
  const today = new Date();
  const thisWeekStart = startOfWeek(today, { weekStartsOn: 0 });
  const thisWeekEnd = endOfWeek(today, { weekStartsOn: 0 });
  const lastWeekStart = startOfWeek(subWeeks(today, 1), { weekStartsOn: 0 });
  const lastWeekEnd = endOfWeek(subWeeks(today, 1), { weekStartsOn: 0 });

  // Filtrar dados da semana atual e anterior
  const thisWeekData = dailyData.filter(d =>
    isWithinInterval(d.date, { start: thisWeekStart, end: thisWeekEnd })
  );

  const lastWeekData = dailyData.filter(d =>
    isWithinInterval(d.date, { start: lastWeekStart, end: lastWeekEnd })
  );

  // Calcular médias
  const calculateAvgGPerKg = (data: DailyProteinData[]) => {
    if (data.length === 0) return 0;
    const totalGPerKg = data.reduce((sum, d) => {
      const weight = d.weight || currentWeight;
      return sum + (d.protein / weight);
    }, 0);
    return totalGPerKg / data.length;
  };

  const thisWeekAvg = calculateAvgGPerKg(thisWeekData);
  const lastWeekAvg = calculateAvgGPerKg(lastWeekData);
  const weekChange = thisWeekAvg - lastWeekAvg;
  const weekChangePercent = lastWeekAvg > 0 ? (weekChange / lastWeekAvg) * 100 : 0;

  // Análise por dia da semana (últimos 30 dias)
  const last30Days = dailyData.filter(d => {
    const daysDiff = (today.getTime() - d.date.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff >= 0 && daysDiff < 30;
  });

  const proteinByDayOfWeek = last30Days.reduce((acc, d) => {
    const dayName = format(d.date, 'EEEE', { locale: ptBR });
    if (!acc[dayName]) {
      acc[dayName] = { total: 0, count: 0 };
    }
    const gPerKg = d.protein / (d.weight || currentWeight);
    acc[dayName].total += gPerKg;
    acc[dayName].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const avgByDayOfWeek = Object.entries(proteinByDayOfWeek).map(([day, data]) => ({
    day,
    avg: data.total / data.count
  }));

  const bestDay = avgByDayOfWeek.reduce((best, current) =>
    current.avg > best.avg ? current : best
  , { day: '', avg: 0 });

  const worstDay = avgByDayOfWeek.reduce((worst, current) =>
    current.avg < worst.avg ? current : worst
  , { day: '', avg: Infinity });

  // Calcular streak de dias com proteína adequada (>1.4 g/kg)
  let currentStreak = 0;
  const sortedData = [...dailyData].sort((a, b) => b.date.getTime() - a.date.getTime());

  for (const d of sortedData) {
    const gPerKg = d.protein / (d.weight || currentWeight);
    if (gPerKg >= 1.4) {
      currentStreak++;
    } else {
      break;
    }
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-purple-500/10">
          <Brain className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold">Inteligência de Proteína</h3>
          <p className="text-xs text-muted-foreground">Análise dos últimos 30 dias</p>
        </div>
      </div>

      {/* Weekly Comparison */}
      <div className="mb-6 p-4 rounded-lg bg-muted/50">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium">Média desta semana</p>
          {weekChange !== 0 && (
            <div className="flex items-center gap-1.5">
              {weekChange > 0 ? (
                <>
                  <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-xs font-medium text-green-600">
                    +{weekChangePercent.toFixed(0)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                  <span className="text-xs font-medium text-red-600">
                    {weekChangePercent.toFixed(0)}%
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold font-mono tabular-nums">
              {thisWeekAvg.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">g/kg média</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold font-mono tabular-nums text-muted-foreground">
              {lastWeekAvg > 0 ? lastWeekAvg.toFixed(1) : '--'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">semana anterior</p>
          </div>
        </div>
      </div>

      {/* Day of Week Insights */}
      {avgByDayOfWeek.length > 0 && (
        <div className="space-y-3 mb-6">
          {bestDay.avg > 0 && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="text-2xl shrink-0">💪</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900 dark:text-green-100">
                  Melhor dia: {bestDay.day}
                </p>
                <p className="text-xs text-green-800 dark:text-green-200 mt-0.5">
                  Média de {bestDay.avg.toFixed(1)} g/kg. Continue assim!
                </p>
              </div>
            </div>
          )}

          {worstDay.avg < Infinity && worstDay.avg < 1.4 && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="text-2xl shrink-0">⚠️</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                  Precisa atenção: {worstDay.day}
                </p>
                <p className="text-xs text-orange-800 dark:text-orange-200 mt-0.5">
                  Média de {worstDay.avg.toFixed(1)} g/kg. Planeje melhor neste dia.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Current Streak */}
      {currentStreak > 0 && (
        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Sequência Ativa</p>
                <p className="text-xs text-muted-foreground">
                  Dias com proteína adequada (≥1.4 g/kg)
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-purple-600 font-mono tabular-nums">
                {currentStreak}
              </p>
              <p className="text-xs text-muted-foreground">dias</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Stats Grid */}
      <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-lg font-bold font-mono tabular-nums">
            {thisWeekData.length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">dias esta semana</p>
        </div>
        <div className="text-center">
          <p className={cn(
            "text-lg font-bold font-mono tabular-nums",
            thisWeekAvg >= 1.6 && "text-green-600",
            thisWeekAvg >= 1.4 && thisWeekAvg < 1.6 && "text-yellow-600",
            thisWeekAvg < 1.4 && "text-orange-600"
          )}>
            {((thisWeekAvg / 1.6) * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">da meta ideal</p>
        </div>
        <div className="text-center">
          <Badge
            variant={currentStreak >= 7 ? "default" : "secondary"}
            className="text-xs"
          >
            {currentStreak >= 7 ? "🔥 Ótimo!" : currentStreak >= 3 ? "👍 Bom" : "⚡ Melhore"}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
