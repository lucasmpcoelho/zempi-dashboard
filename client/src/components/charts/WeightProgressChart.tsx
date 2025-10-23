import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, Minus, Target, Calendar } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  Legend
} from "recharts";

interface WeightEntry {
  date: string;
  weight: number;
}

interface WeightProgressChartProps {
  weightEntries: WeightEntry[];
  startWeight: number;
  goalWeight: number;
}

export default function WeightProgressChart({
  weightEntries,
  startWeight,
  goalWeight
}: WeightProgressChartProps) {

  // Calculate 7-day moving average
  const calculateMovingAverage = (data: WeightEntry[], window: number = 7): (number | null)[] => {
    return data.map((_, index, arr) => {
      if (index < window - 1) return null;
      const slice = arr.slice(index - window + 1, index + 1);
      const sum = slice.reduce((acc, entry) => acc + entry.weight, 0);
      return sum / window;
    });
  };

  // Prepare chart data with moving average
  const chartData = useMemo(() => {
    if (!weightEntries || weightEntries.length === 0) return [];

    const sorted = [...weightEntries].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const movingAvg = calculateMovingAverage(sorted);

    return sorted.map((entry, index) => ({
      date: format(new Date(entry.date), "dd/MM", { locale: ptBR }),
      fullDate: entry.date,
      weight: entry.weight,
      movingAvg: movingAvg[index],
      goal: goalWeight
    }));
  }, [weightEntries, goalWeight]);

  // Calculate prediction
  const prediction = useMemo(() => {
    if (chartData.length < 14) return null;

    // Use last 30 days for trend calculation
    const recentData = chartData.slice(-30);
    const firstWeight = recentData[0].weight;
    const lastWeight = recentData[recentData.length - 1].weight;
    const days = differenceInDays(
      new Date(recentData[recentData.length - 1].fullDate),
      new Date(recentData[0].fullDate)
    );

    if (days === 0) return null;

    const avgWeeklyLoss = ((firstWeight - lastWeight) / days) * 7;

    // Calculate days to goal
    const currentWeight = lastWeight;
    const remainingWeight = currentWeight - goalWeight;
    const daysToGoal = Math.round(remainingWeight / (avgWeeklyLoss / 7));

    return {
      avgWeeklyLoss,
      daysToGoal: daysToGoal > 0 ? daysToGoal : 0,
      projectedDate: daysToGoal > 0 ? new Date(Date.now() + daysToGoal * 24 * 60 * 60 * 1000) : null
    };
  }, [chartData, goalWeight]);

  // Calculate current rate (last 7 days)
  const currentRate = useMemo(() => {
    if (chartData.length < 7) return 0;

    const last7 = chartData.slice(-7);
    const firstWeight = last7[0].weight;
    const lastWeight = last7[last7.length - 1].weight;
    const days = differenceInDays(
      new Date(last7[last7.length - 1].fullDate),
      new Date(last7[0].fullDate)
    );

    if (days === 0) return 0;

    return ((firstWeight - lastWeight) / days) * 7; // Weekly rate
  }, [chartData]);

  // Determine if rate is healthy (0.5-1kg/week)
  const rateStatus = useMemo(() => {
    const absRate = Math.abs(currentRate);
    if (absRate >= 0.5 && absRate <= 1.0) return "healthy";
    if (absRate < 0.5) return "slow";
    return "fast";
  }, [currentRate]);

  // Calculate milestones
  const milestones = useMemo(() => {
    const totalLoss = startWeight - goalWeight;
    return [
      { percent: 5, weight: startWeight - (totalLoss * 0.05) },
      { percent: 10, weight: startWeight - (totalLoss * 0.10) },
      { percent: 15, weight: startWeight - (totalLoss * 0.15) },
      { percent: 20, weight: startWeight - (totalLoss * 0.20) }
    ];
  }, [startWeight, goalWeight]);

  // Check which milestones are achieved
  const currentWeight = chartData.length > 0 ? chartData[chartData.length - 1].weight : startWeight;
  const achievedMilestones = milestones.filter(m => currentWeight <= m.weight);

  if (chartData.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Evolução do Peso</h2>
        <div className="text-center py-12">
          <div className="inline-flex p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 mb-4">
            <TrendingDown className="h-8 w-8 text-purple-400" />
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Nenhum registro de peso ainda</p>
          <p className="text-xs text-muted-foreground">Comece registrando seu peso diariamente</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <Card className="p-6 border-l-4 border-l-purple-500">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950">
            <TrendingDown className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold">Evolução do Peso</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl p-3">
            <p className="text-xs text-muted-foreground mb-1">Ritmo Atual</p>
            <p className="text-xl font-bold tabular-nums flex items-center gap-1">
              {currentRate >= 0 ? (
                <>
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  {currentRate.toFixed(1)}
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 text-red-500" />
                  {Math.abs(currentRate).toFixed(1)}
                </>
              )}
              <span className="text-xs font-normal">kg/sem</span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50/50 to-green-50/50 dark:from-teal-950/30 dark:to-green-950/30 rounded-xl p-3">
            <p className="text-xs text-muted-foreground mb-1">Marcos</p>
            <p className="text-xl font-bold tabular-nums">
              {achievedMilestones.length}/4
              <span className="text-xs font-normal ml-1">atingidos</span>
            </p>
          </div>

          {prediction && prediction.daysToGoal > 0 && (
            <div className="bg-gradient-to-br from-orange-50/50 to-yellow-50/50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">Previsão</p>
              <p className="text-xl font-bold tabular-nums flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {prediction.daysToGoal}
                <span className="text-xs font-normal">dias</span>
              </p>
            </div>
          )}
        </div>

        {/* Rate Status Badge */}
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={
              rateStatus === "healthy"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 font-semibold"
                : rateStatus === "slow"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 font-semibold"
                : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100 font-semibold"
            }
          >
            {rateStatus === "healthy" && "✅ Ritmo saudável (0.5-1kg/sem)"}
            {rateStatus === "slow" && "🐌 Ritmo lento (<0.5kg/sem)"}
            {rateStatus === "fast" && "⚠️ Ritmo acelerado (>1kg/sem)"}
          </Badge>
        </div>
      </Card>

      {/* Chart */}
      <Card className="p-6">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />

            {/* Healthy zone shading (0.5-1kg/week loss from start) */}
            {chartData.length > 7 && (
              <ReferenceArea
                y1={startWeight - 0.5 * (chartData.length / 7)}
                y2={startWeight - 1.0 * (chartData.length / 7)}
                fill="hsl(var(--chart-2))"
                fillOpacity={0.1}
                label={{
                  value: "Zona Saudável",
                  position: "insideTopLeft",
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 10
                }}
              />
            )}

            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              className="text-muted-foreground"
              interval="preserveStartEnd"
            />

            <YAxis
              domain={[
                Math.min(goalWeight - 2, ...chartData.map(d => d.weight - 2)),
                Math.max(startWeight + 2, ...chartData.map(d => d.weight + 2))
              ]}
              tick={{ fontSize: 11 }}
              className="text-muted-foreground"
              tickFormatter={(value) => `${value}kg`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px"
              }}
              formatter={(value: any, name: string) => {
                if (name === "weight") return [`${value.toFixed(1)} kg`, "Peso"];
                if (name === "movingAvg") return [`${value.toFixed(1)} kg`, "Média 7 dias"];
                return [value, name];
              }}
            />

            <Legend
              wrapperStyle={{ fontSize: "12px" }}
              iconType="line"
            />

            {/* Goal reference line */}
            <ReferenceLine
              y={goalWeight}
              stroke="hsl(var(--primary))"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: `Meta: ${goalWeight}kg`,
                position: "insideTopRight",
                fill: "hsl(var(--primary))",
                fontSize: 11,
                fontWeight: 600
              }}
            />

            {/* Milestone lines */}
            {milestones.map((milestone, idx) => {
              const isAchieved = currentWeight <= milestone.weight;
              return (
                <ReferenceLine
                  key={idx}
                  y={milestone.weight}
                  stroke={isAchieved ? "hsl(var(--chart-2))" : "hsl(var(--muted))"}
                  strokeDasharray="3 3"
                  strokeOpacity={0.5}
                  label={{
                    value: `${milestone.percent}%`,
                    position: "insideRight",
                    fill: isAchieved ? "hsl(var(--chart-2))" : "hsl(var(--muted-foreground))",
                    fontSize: 9
                  }}
                />
              );
            })}

            {/* Actual weight line */}
            <Line
              type="monotone"
              dataKey="weight"
              name="Peso Real"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--chart-1))", r: 3 }}
              activeDot={{ r: 5 }}
            />

            {/* Moving average line */}
            <Line
              type="monotone"
              dataKey="movingAvg"
              name="Tendência (7d)"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Prediction Info */}
        {prediction && prediction.projectedDate && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200/50 dark:border-purple-800/50">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-1">
                  Previsão de Meta
                </p>
                <p className="text-xs text-muted-foreground">
                  Com seu ritmo atual de <strong>{prediction.avgWeeklyLoss.toFixed(1)}kg/semana</strong>,
                  você deve atingir {goalWeight}kg em aproximadamente{" "}
                  <strong>
                    {format(prediction.projectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </strong>
                  {" "}({prediction.daysToGoal} dias).
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
