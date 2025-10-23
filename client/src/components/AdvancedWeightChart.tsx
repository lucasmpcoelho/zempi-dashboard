import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface WeightProteinEntry {
  date: Date;
  weight: number;
  protein: number;
}

interface AdvancedWeightChartProps {
  entries: WeightProteinEntry[];
  currentWeight: number;
  targetWeight: number;
}

export default function AdvancedWeightChart({
  entries,
  currentWeight,
  targetWeight
}: AdvancedWeightChartProps) {
  // Preparar dados para o gráfico (últimos 14 entries ou menos)
  const chartData = entries
    .slice(0, 14)
    .reverse()
    .map(entry => ({
      date: format(entry.date, "dd/MM", { locale: ptBR }),
      fullDate: format(entry.date, "dd 'de' MMM", { locale: ptBR }),
      weight: entry.weight,
      protein: entry.protein,
      proteinPerKg: entry.protein / entry.weight
    }));

  if (chartData.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Dados insuficientes para mostrar gráfico
          </p>
        </div>
      </Card>
    );
  }

  // Calcular estatísticas
  const initialWeight = chartData[0]?.weight || currentWeight;
  const weightLost = initialWeight - currentWeight;
  const weightToGo = currentWeight - targetWeight;
  const avgProtein = chartData.reduce((sum, d) => sum + d.protein, 0) / chartData.length;
  const avgProteinPerKg = chartData.reduce((sum, d) => sum + d.proteinPerKg, 0) / chartData.length;

  // Calcular correlação simples entre proteína e perda de peso
  const hasStrongProtein = avgProteinPerKg >= 1.4;

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg shadow-lg p-3 text-sm">
          <p className="font-semibold mb-2">{payload[0].payload.fullDate}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Peso:</span>
              <span className="font-mono font-semibold text-chart-1">
                {payload[0].value.toFixed(1)} kg
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Proteína:</span>
              <span className="font-mono font-semibold text-chart-5">
                {payload[1].value.toFixed(0)} g
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">g/kg:</span>
              <span className={cn(
                "font-mono font-semibold",
                payload[0].payload.proteinPerKg >= 1.6 && "text-green-600",
                payload[0].payload.proteinPerKg >= 1.4 && payload[0].payload.proteinPerKg < 1.6 && "text-yellow-600",
                payload[0].payload.proteinPerKg < 1.4 && "text-orange-600"
              )}>
                {payload[0].payload.proteinPerKg.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Peso vs Proteína</h3>
          <div className="flex gap-2">
            {weightLost > 0 && (
              <Badge variant="secondary" className="gap-1.5">
                <TrendingDown className="h-3 w-3" />
                <span className="tabular-nums">-{weightLost.toFixed(1)} kg</span>
              </Badge>
            )}
            <Badge
              variant={hasStrongProtein ? "default" : "secondary"}
              className="gap-1.5"
            >
              <Activity className="h-3 w-3" />
              <span className="tabular-nums">{avgProteinPerKg.toFixed(1)} g/kg</span>
            </Badge>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Correlação entre perda de peso e ingestão de proteína
        </p>
      </div>

      {/* Chart */}
      <div className="h-64 mb-6" data-testid="chart-weight-protein">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" opacity={0.3} />

            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
            />

            <YAxis
              yAxisId="left"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              label={{
                value: "Peso (kg)",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: "12px", fill: "hsl(var(--muted-foreground))" }
              }}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              label={{
                value: "Proteína (g)",
                angle: 90,
                position: "insideRight",
                style: { fontSize: "12px", fill: "hsl(var(--muted-foreground))" }
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{ fontSize: "12px" }}
              iconType="line"
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="weight"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
              activeDot={{ r: 6 }}
              name="Peso (kg)"
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="protein"
              stroke="hsl(var(--chart-5))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--chart-5))", r: 4 }}
              activeDot={{ r: 6 }}
              name="Proteína (g)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pb-4 border-b">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Média Proteína</p>
            <p className="text-lg font-bold font-mono tabular-nums">
              {avgProtein.toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground">g/dia</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Peso Perdido</p>
            <p className="text-lg font-bold font-mono tabular-nums text-green-600">
              {weightLost > 0 ? weightLost.toFixed(1) : '0.0'}
            </p>
            <p className="text-xs text-muted-foreground">kg</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Falta</p>
            <p className="text-lg font-bold font-mono tabular-nums">
              {weightToGo > 0 ? weightToGo.toFixed(1) : '0.0'}
            </p>
            <p className="text-xs text-muted-foreground">kg</p>
          </div>
        </div>

        {/* Insight baseado em dados */}
        {hasStrongProtein && weightLost > 0 && (
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex gap-3">
              <div className="text-2xl shrink-0">💪</div>
              <div>
                <p className="text-sm font-medium text-green-900 dark:text-green-100">
                  Perda de peso saudável!
                </p>
                <p className="text-xs text-green-800 dark:text-green-200 mt-1 leading-relaxed">
                  Com média de {avgProteinPerKg.toFixed(1)} g/kg, você está preservando massa muscular durante
                  a perda de peso. Continue assim!
                </p>
              </div>
            </div>
          </div>
        )}

        {!hasStrongProtein && (
          <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <div className="flex gap-3">
              <div className="text-2xl shrink-0">⚠️</div>
              <div>
                <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                  Proteína abaixo do ideal
                </p>
                <p className="text-xs text-orange-800 dark:text-orange-200 mt-1 leading-relaxed">
                  Sua média está em {avgProteinPerKg.toFixed(1)} g/kg. Aumente para 1.6 g/kg para minimizar
                  perda de músculo durante o emagrecimento.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
