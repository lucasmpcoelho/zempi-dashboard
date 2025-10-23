import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dumbbell,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Info,
  CheckCircle2,
  Beef
} from "lucide-react";
import { format, differenceInDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Area
} from "recharts";
import { cn } from "@/lib/utils";

interface Meal {
  date: string;
  protein: number;
  calories: number;
}

interface WeightEntry {
  date: string;
  weight: number;
}

interface MusclePreservationDashboardProps {
  meals: Meal[];
  weightEntries: WeightEntry[];
  userWeight: number;
  startWeight: number;
  proteinGoal?: number; // g/kg
}

export default function MusclePreservationDashboard({
  meals,
  weightEntries,
  userWeight,
  startWeight,
  proteinGoal = 1.6
}: MusclePreservationDashboardProps) {

  // Calculate body composition estimate
  const composition = useMemo(() => {
    const last30Days = subDays(new Date(), 30);

    // Calculate average protein intake (last 30 days)
    const recentMeals = meals.filter(meal => new Date(meal.date) >= last30Days);

    const dailyProtein = recentMeals.reduce((acc, meal) => {
      if (!acc[meal.date]) acc[meal.date] = 0;
      acc[meal.date] += meal.protein;
      return acc;
    }, {} as Record<string, number>);

    const proteinDays = Object.keys(dailyProtein).length;
    const totalProtein = Object.values(dailyProtein).reduce((sum, p) => sum + p, 0);
    const avgProteinPerDay = proteinDays > 0 ? totalProtein / proteinDays : 0;
    const avgProteinPerKg = userWeight > 0 ? avgProteinPerDay / userWeight : 0;

    // Calculate weight loss rate (last 30 days)
    const recentWeights = weightEntries
      .filter(w => new Date(w.date) >= last30Days)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const weightLossRate = recentWeights.length >= 2
      ? (recentWeights[0].weight - recentWeights[recentWeights.length - 1].weight) /
        differenceInDays(
          new Date(recentWeights[recentWeights.length - 1].date),
          new Date(recentWeights[0].date)
        ) * 7 // Weekly rate
      : 0;

    // Muscle retention algorithm based on research
    let muscleRetentionRate = 0.85; // Base retention

    if (avgProteinPerKg >= 1.6) {
      muscleRetentionRate = 0.95; // Excellent protein
    } else if (avgProteinPerKg >= 1.4) {
      muscleRetentionRate = 0.90; // Good protein
    } else if (avgProteinPerKg >= 1.2) {
      muscleRetentionRate = 0.85; // Adequate protein
    } else {
      muscleRetentionRate = 0.70; // Low protein - high muscle loss risk
    }

    // Adjust for weight loss rate
    if (weightLossRate > 1.5) {
      muscleRetentionRate -= 0.05; // Rapid loss = more muscle loss
    } else if (weightLossRate >= 0.5 && weightLossRate <= 1.0) {
      muscleRetentionRate += 0.05; // Healthy rate = better retention
    }

    // Clamp between 0.5 and 0.98
    muscleRetentionRate = Math.max(0.5, Math.min(0.98, muscleRetentionRate));

    const totalLoss = startWeight - userWeight;
    const estimatedMuscleLoss = totalLoss * (1 - muscleRetentionRate);
    const estimatedFatLoss = totalLoss - estimatedMuscleLoss;

    const muscleLossPercentage = totalLoss > 0 ? (estimatedMuscleLoss / totalLoss) * 100 : 0;
    const fatLossPercentage = totalLoss > 0 ? (estimatedFatLoss / totalLoss) * 100 : 0;

    return {
      avgProteinPerDay,
      avgProteinPerKg,
      muscleRetentionRate,
      estimatedMuscleLoss,
      estimatedFatLoss,
      muscleLossPercentage,
      fatLossPercentage,
      totalLoss,
      weightLossRate
    };
  }, [meals, weightEntries, userWeight, startWeight]);

  // Prepare dual-axis chart data (Protein g/kg vs Weight)
  const chartData = useMemo(() => {
    // Group meals by date for daily protein
    const dailyProtein = meals.reduce((acc, meal) => {
      if (!acc[meal.date]) acc[meal.date] = 0;
      acc[meal.date] += meal.protein;
      return acc;
    }, {} as Record<string, number>);

    // Combine with weight data
    const allDates = new Set([
      ...Object.keys(dailyProtein),
      ...weightEntries.map(w => w.date)
    ]);

    const combined = Array.from(allDates)
      .map(date => {
        const weight = weightEntries.find(w => w.date === date)?.weight;
        const protein = dailyProtein[date] || 0;
        const proteinPerKg = weight && protein > 0 ? protein / weight : null;

        return {
          date,
          weight,
          protein,
          proteinPerKg,
          proteinGoal: proteinGoal
        };
      })
      .filter(d => d.weight || d.protein > 0) // Only dates with data
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30); // Last 30 days

    return combined.map(d => ({
      ...d,
      dateLabel: format(new Date(d.date), "dd/MM", { locale: ptBR })
    }));
  }, [meals, weightEntries, proteinGoal]);

  // Risk assessment
  const riskLevel = useMemo(() => {
    if (composition.avgProteinPerKg < 1.2) return "high";
    if (composition.avgProteinPerKg < 1.4) return "medium";
    return "low";
  }, [composition.avgProteinPerKg]);

  // Days in danger zone
  const dangerZoneDays = useMemo(() => {
    const last30Days = subDays(new Date(), 30);
    const recentMeals = meals.filter(meal => new Date(meal.date) >= last30Days);

    const dailyProtein = recentMeals.reduce((acc, meal) => {
      if (!acc[meal.date]) acc[meal.date] = 0;
      acc[meal.date] += meal.protein;
      return acc;
    }, {} as Record<string, number>);

    return Object.values(dailyProtein).filter(p => p / userWeight < 1.4).length;
  }, [meals, userWeight]);

  return (
    <div className="space-y-4">
      {/* Risk Alert Banner */}
      {riskLevel === "high" && (
        <Card className="p-4 border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-red-100 dark:bg-red-900 shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-red-900 dark:text-red-100 mb-1">
                ⚠️ Zona de Risco Muscular
              </h3>
              <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed mb-2">
                Sua proteína está em {composition.avgProteinPerKg.toFixed(1)}g/kg - abaixo do ideal.
                Isso aumenta significativamente o risco de perda muscular durante o tratamento com GLP-1.
              </p>
              <button className="text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 flex items-center gap-1">
                Ver estratégias para aumentar proteína →
              </button>
            </div>
          </div>
        </Card>
      )}

      {riskLevel === "medium" && (
        <Card className="p-4 border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900 shrink-0">
              <Info className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-orange-900 dark:text-orange-100 mb-1">
                ⚡ Atenção à Proteína
              </h3>
              <p className="text-xs text-orange-700 dark:text-orange-300 leading-relaxed">
                Você está em {composition.avgProteinPerKg.toFixed(1)}g/kg. Tente atingir 1.6g/kg para melhor preservação muscular.
              </p>
            </div>
          </div>
        </Card>
      )}

      {riskLevel === "low" && composition.totalLoss > 2 && (
        <Card className="p-4 border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900 shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-green-900 dark:text-green-100 mb-1">
                ✅ Excelente Preservação Muscular
              </h3>
              <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                Com {composition.avgProteinPerKg.toFixed(1)}g/kg de proteína, você está maximizando a retenção de massa magra!
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Body Composition Estimate */}
      <Card className="p-6 border-l-4 border-l-indigo-500">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900">
            <Dumbbell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Composição da Perda</h2>
            <p className="text-xs text-muted-foreground">
              Estimativa baseada em proteína e taxa de perda
            </p>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "font-semibold",
              riskLevel === "low" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
              riskLevel === "medium" && "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
              riskLevel === "high" && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            )}
          >
            {(composition.muscleRetentionRate * 100).toFixed(0)}% retenção
          </Badge>
        </div>

        {/* Total Loss */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-indigo-50/50 to-purple-50/30 dark:from-indigo-950/20 dark:to-purple-950/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Perda Total de Peso</span>
            <span className="text-3xl font-bold tabular-nums text-indigo-700 dark:text-indigo-300">
              {composition.totalLoss.toFixed(1)}kg
            </span>
          </div>
        </div>

        {/* Composition Breakdown */}
        {composition.totalLoss > 0 && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Gordura (Desejado)</span>
                </div>
                <span className="text-lg font-bold tabular-nums">
                  {composition.estimatedFatLoss.toFixed(1)}kg
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    ({composition.fatLossPercentage.toFixed(0)}%)
                  </span>
                </span>
              </div>
              <Progress
                value={composition.fatLossPercentage}
                className="h-3 bg-muted"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-sm font-medium">Músculo (Evitar)</span>
                </div>
                <span className="text-lg font-bold tabular-nums">
                  {composition.estimatedMuscleLoss.toFixed(1)}kg
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    ({composition.muscleLossPercentage.toFixed(0)}%)
                  </span>
                </span>
              </div>
              <Progress
                value={composition.muscleLossPercentage}
                className={cn(
                  "h-3",
                  composition.muscleLossPercentage > 20 && "[&>div]:bg-red-500",
                  composition.muscleLossPercentage <= 20 && composition.muscleLossPercentage > 10 && "[&>div]:bg-orange-500",
                  composition.muscleLossPercentage <= 10 && "[&>div]:bg-green-500"
                )}
              />
            </div>

            {/* Info Note */}
            <div className="mt-4 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                  <strong>Como melhorar:</strong> Aumente proteína para {proteinGoal}g/kg ({Math.round(userWeight * proteinGoal)}g/dia) e
                  adicione exercícios de força 2-3x/semana para maximizar perda de gordura e preservar músculo.
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Protein × Weight Correlation Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Proteína × Peso (Últimos 30 dias)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />

            {/* Color zones for protein levels */}
            <defs>
              <linearGradient id="proteinZone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="dateLabel"
              tick={{ fontSize: 11 }}
              className="text-muted-foreground"
              interval="preserveStartEnd"
            />

            {/* Left Y-axis: Weight */}
            <YAxis
              yAxisId="weight"
              orientation="left"
              tick={{ fontSize: 11 }}
              className="text-muted-foreground"
              label={{ value: 'Peso (kg)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }}
            />

            {/* Right Y-axis: Protein g/kg */}
            <YAxis
              yAxisId="protein"
              orientation="right"
              tick={{ fontSize: 11 }}
              className="text-muted-foreground"
              domain={[0, 3]}
              label={{ value: 'Proteína (g/kg)', angle: 90, position: 'insideRight', style: { fontSize: 11 } }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px"
              }}
              formatter={(value: any, name: string) => {
                if (name === "weight") return [`${value?.toFixed(1)} kg`, "Peso"];
                if (name === "proteinPerKg") return [`${value?.toFixed(1)} g/kg`, "Proteína"];
                return [value, name];
              }}
            />

            <Legend wrapperStyle={{ fontSize: "12px" }} />

            {/* Protein goal reference line */}
            <ReferenceLine
              yAxisId="protein"
              y={proteinGoal}
              stroke="hsl(var(--chart-2))"
              strokeDasharray="5 5"
              label={{
                value: `Meta: ${proteinGoal}g/kg`,
                position: "insideTopRight",
                fill: "hsl(var(--chart-2))",
                fontSize: 10
              }}
            />

            {/* Area under protein line */}
            <Area
              yAxisId="protein"
              type="monotone"
              dataKey="proteinPerKg"
              fill="url(#proteinZone)"
              stroke="none"
            />

            {/* Weight line */}
            <Line
              yAxisId="weight"
              type="monotone"
              dataKey="weight"
              name="Peso"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--chart-1))", r: 3 }}
              connectNulls
            />

            {/* Protein bars */}
            <Bar
              yAxisId="protein"
              dataKey="proteinPerKg"
              name="Proteína (g/kg)"
              fill="hsl(var(--chart-2))"
              opacity={0.7}
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Correlation Insight */}
        {dangerZoneDays > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-800/50">
            <div className="flex items-start gap-2">
              <Beef className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0" />
              <p className="text-xs text-orange-700 dark:text-orange-300 leading-relaxed">
                <strong>Atenção:</strong> Você teve <strong>{dangerZoneDays} dias</strong> com proteína abaixo de 1.4g/kg nos últimos 30 dias.
                Aumente a consistência para melhor preservação muscular.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
