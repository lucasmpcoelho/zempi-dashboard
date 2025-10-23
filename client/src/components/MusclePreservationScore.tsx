import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DailyProteinData {
  date: Date;
  protein: number;
  weight: number;
  mealCount?: number;
}

interface MusclePreservationScoreProps {
  dailyData: DailyProteinData[]; // últimos 7 dias
  currentWeight: number;
}

export default function MusclePreservationScore({
  dailyData,
  currentWeight
}: MusclePreservationScoreProps) {
  // Calcular score baseado em múltiplos fatores
  const calculateScore = () => {
    if (dailyData.length === 0) return 0;

    let totalScore = 0;
    const weights = {
      dailyProtein: 0.5, // 50% - proteína diária
      distribution: 0.2, // 20% - distribuição ao longo do dia
      consistency: 0.2, // 20% - consistência semanal
      resistance: 0.1 // 10% - exercícios de resistência (futuro)
    };

    // 1. Proteína diária (0-50 pontos)
    const avgProteinGPerKg = dailyData.reduce((sum, d) => {
      const weight = d.weight || currentWeight;
      return sum + (d.protein / weight);
    }, 0) / dailyData.length;

    const proteinScore = Math.min((avgProteinGPerKg / 1.6) * 50, 50);
    totalScore += proteinScore;

    // 2. Distribuição ao longo do dia (0-20 pontos)
    // Ideal: 3-4 refeições com proteína
    const avgMealCount = dailyData.reduce((sum, d) => sum + (d.mealCount || 1), 0) / dailyData.length;
    const distributionScore = avgMealCount >= 3 ? 20 : (avgMealCount / 3) * 20;
    totalScore += distributionScore;

    // 3. Consistência semanal (0-20 pontos)
    // Quantos dias atingiram pelo menos 1.4 g/kg?
    const adequateDays = dailyData.filter(d => {
      const gPerKg = d.protein / (d.weight || currentWeight);
      return gPerKg >= 1.4;
    }).length;

    const consistencyScore = (adequateDays / dailyData.length) * 20;
    totalScore += consistencyScore;

    // 4. Exercícios de resistência (placeholder - sempre 0 por enquanto)
    const resistanceScore = 0;
    totalScore += resistanceScore;

    return Math.round(totalScore);
  };

  const score = calculateScore();

  // Determinar status baseado no score
  const getScoreStatus = (score: number) => {
    if (score >= 80) {
      return {
        label: "Excelente",
        color: "text-green-600",
        bg: "bg-green-600",
        ringColor: "ring-green-600/20",
        description: "Massa muscular bem preservada",
        icon: CheckCircle2,
        iconColor: "text-green-600"
      };
    } else if (score >= 60) {
      return {
        label: "Bom",
        color: "text-blue-600",
        bg: "bg-blue-600",
        ringColor: "ring-blue-600/20",
        description: "Continue assim para manter músculo",
        icon: TrendingUp,
        iconColor: "text-blue-600"
      };
    } else if (score >= 40) {
      return {
        label: "Atenção",
        color: "text-yellow-600",
        bg: "bg-yellow-600",
        ringColor: "ring-yellow-600/20",
        description: "Aumente proteína para evitar perda",
        icon: AlertTriangle,
        iconColor: "text-yellow-600"
      };
    } else {
      return {
        label: "Risco Alto",
        color: "text-red-600",
        bg: "bg-red-600",
        ringColor: "ring-red-600/20",
        description: "Risco crítico de perda muscular",
        icon: AlertTriangle,
        iconColor: "text-red-600"
      };
    }
  };

  const status = getScoreStatus(score);
  const StatusIcon = status.icon;

  // Calcular circunferência do círculo
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Calcular componentes do score para detalhamento
  const avgProteinGPerKg = dailyData.length > 0
    ? dailyData.reduce((sum, d) => sum + (d.protein / (d.weight || currentWeight)), 0) / dailyData.length
    : 0;

  const adequateDays = dailyData.filter(d =>
    (d.protein / (d.weight || currentWeight)) >= 1.4
  ).length;

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Score de Preservação Muscular</h3>
          <p className="text-xs text-muted-foreground">Métrica proprietária Zempi</p>
        </div>
      </div>

      {/* Circular Score Visualization */}
      <div className="flex items-center gap-6 mb-6">
        <div className="relative">
          <svg className="transform -rotate-90" width="160" height="160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="stroke-muted"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              className={cn("transition-all duration-1000", status.bg.replace('bg-', 'stroke-'))}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>

          {/* Score number in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={cn("text-4xl font-bold font-mono tabular-nums", status.color)}>
              {score}
            </p>
            <p className="text-xs text-muted-foreground">de 100</p>
          </div>
        </div>

        {/* Status Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <StatusIcon className={cn("h-5 w-5", status.iconColor)} />
            <Badge
              className={cn(
                "font-semibold",
                status.bg,
                "text-white border-0"
              )}
            >
              {status.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {status.description}
          </p>

          {score < 80 && (
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              <strong>Próximo objetivo:</strong> {score >= 60 ? "Mantenha proteína >1.6 g/kg por 7 dias" : "Atinja 1.4 g/kg por 5 dias consecutivos"}
            </p>
          )}
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Componentes do Score
        </p>

        {/* Proteína Diária */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Proteína Diária (50%)</span>
            <span className={cn(
              "font-mono tabular-nums",
              avgProteinGPerKg >= 1.6 && "text-green-600",
              avgProteinGPerKg >= 1.4 && avgProteinGPerKg < 1.6 && "text-yellow-600",
              avgProteinGPerKg < 1.4 && "text-orange-600"
            )}>
              {avgProteinGPerKg.toFixed(1)} g/kg
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-500",
                avgProteinGPerKg >= 1.6 && "bg-green-600",
                avgProteinGPerKg >= 1.4 && avgProteinGPerKg < 1.6 && "bg-yellow-600",
                avgProteinGPerKg < 1.4 && "bg-orange-600"
              )}
              style={{ width: `${Math.min((avgProteinGPerKg / 1.6) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Consistência */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Consistência (20%)</span>
            <span className="font-mono tabular-nums">
              {adequateDays}/{dailyData.length} dias
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${(adequateDays / (dailyData.length || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Distribuição (placeholder) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Distribuição (20%)</span>
            <span className="text-xs text-muted-foreground">3-4 refeições/dia</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-500"
              style={{ width: "75%" }}
            />
          </div>
        </div>

        {/* Exercícios (futuro) */}
        <div className="space-y-2 opacity-50">
          <div className="flex items-center justify-between text-sm">
            <span>Exercícios (10%)</span>
            <span className="text-xs text-muted-foreground">Em breve</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-muted transition-all duration-500" style={{ width: "0%" }} />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {score < 80 && (
        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-muted-foreground text-center">
            💡 <strong>Dica:</strong> Distribua proteína em {dailyData.length >= 3 ? "todas" : "pelo menos 3"} refeições para melhor absorção muscular
          </p>
        </div>
      )}
    </Card>
  );
}
