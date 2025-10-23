import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pill, Check, Calendar, TrendingDown } from "lucide-react";
import { format, differenceInDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import WeightProgressChart from "@/components/charts/WeightProgressChart";

export default function TreatmentPanel() {
  const today = format(new Date(), "yyyy-MM-dd");
  const ninetyDaysAgo = format(subDays(new Date(), 89), "yyyy-MM-dd");

  // Fetch user profile
  const { data: user } = useQuery({
    queryKey: ["/api/user"]
  });

  const userProfile = user?.profile;
  const currentDose = userProfile?.dose || "1.0mg";
  const startWeight = userProfile?.initialWeight || userProfile?.weight || 95;
  const goalWeight = userProfile?.targetWeight || 75;

  // Fetch medication doses
  const { data: doses } = useQuery({
    queryKey: ["/api/medication"]
  });

  // Fetch weight entries (90 days for enhanced chart)
  const { data: weightEntries } = useQuery({
    queryKey: ["/api/weight", { startDate: ninetyDaysAgo, endDate: today }]
  });

  // Sort doses by date
  const sortedDoses = doses
    ?.slice()
    .sort((a: any, b: any) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()) || [];

  // Find next scheduled dose
  const nextDose = sortedDoses.find((dose: any) => !dose.completed && new Date(dose.scheduledDate) >= new Date());
  const daysUntilNext = nextDose ? differenceInDays(new Date(nextDose.scheduledDate), new Date()) : null;

  // Calculate adherence (last 8 weeks)
  const last8Doses = sortedDoses.slice(-8);
  const completedDoses = last8Doses.filter((dose: any) => dose.completed).length;
  const adherenceRate = last8Doses.length > 0 ? Math.round((completedDoses / last8Doses.length) * 100) : 0;

  // Calculate weight progress
  const sortedWeights = weightEntries
    ?.slice()
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

  const currentWeight = sortedWeights[0]?.weight || startWeight;
  const totalWeightLoss = startWeight - currentWeight;
  const weightLossPercentage = ((totalWeightLoss / startWeight) * 100);
  const remainingWeight = currentWeight - goalWeight;
  const progressToGoal = Math.min(((startWeight - currentWeight) / (startWeight - goalWeight)) * 100, 100);

  // Mark dose as complete mutation
  const completeDoseMutation = useMutation({
    mutationFn: async (doseId: number) => {
      return apiRequest("PATCH", `/api/medication/${doseId}`, {
        completed: 1,
        completedAt: new Date().toISOString()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/medication"] });
    }
  });

  // Get upcoming doses (next 4 weeks)
  const upcomingDoses = sortedDoses
    .filter((dose: any) => !dose.completed && new Date(dose.scheduledDate) >= new Date())
    .slice(0, 4);

  // Get recent completed doses
  const recentCompletedDoses = sortedDoses
    .filter((dose: any) => dose.completed)
    .slice(-4)
    .reverse();

  return (
    <div className="space-y-6 pb-6">
      {/* Next Dose Hero */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Próxima Dose</h2>
            <p className="text-sm text-muted-foreground">
              {currentDose} - {nextDose ? format(new Date(nextDose.scheduledDate), "dd MMM", { locale: ptBR }) : "Não agendada"}
            </p>
          </div>
          <div className="p-3 rounded-full bg-purple-500/10">
            <Pill className="h-6 w-6 text-purple-500" />
          </div>
        </div>

        {nextDose && (
          <>
            <div className="text-center py-6">
              <p className="text-5xl font-bold text-primary">{daysUntilNext}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {daysUntilNext === 0 ? "Hoje!" : daysUntilNext === 1 ? "dia restante" : "dias restantes"}
              </p>
            </div>

            {daysUntilNext === 0 && (
              <Button
                className="w-full"
                size="lg"
                onClick={() => completeDoseMutation.mutate(nextDose.id)}
                disabled={completeDoseMutation.isPending}
              >
                <Check className="h-4 w-4 mr-2" />
                Marcar como Aplicada
              </Button>
            )}
          </>
        )}
      </Card>

      {/* Adherence Stats */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Adesão ao Tratamento</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Últimas 8 semanas</span>
              <span className="text-2xl font-bold">{adherenceRate}%</span>
            </div>
            <Progress value={adherenceRate} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{completedDoses}</p>
              <p className="text-xs text-muted-foreground">Doses aplicadas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-muted-foreground">
                {last8Doses.length - completedDoses}
              </p>
              <p className="text-xs text-muted-foreground">Doses perdidas</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Weight Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Progresso de Peso</h2>
          <Badge variant="outline" className="gap-1">
            <TrendingDown className="h-3 w-3" />
            {totalWeightLoss.toFixed(1)}kg perdidos
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-muted-foreground">Peso inicial</p>
              <p className="font-semibold">{startWeight}kg</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Atual</p>
              <p className="font-semibold text-lg">{currentWeight.toFixed(1)}kg</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">Meta</p>
              <p className="font-semibold">{goalWeight}kg</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Progresso até a meta</span>
              <span className="text-xs font-medium">{progressToGoal.toFixed(0)}%</span>
            </div>
            <Progress value={progressToGoal} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Perda total</p>
              <p className="text-lg font-bold">{weightLossPercentage.toFixed(1)}%</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Faltam</p>
              <p className="text-lg font-bold">{remainingWeight.toFixed(1)}kg</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Weight Progress Chart - Enhanced */}
      <WeightProgressChart
        weightEntries={weightEntries || []}
        startWeight={startWeight}
        goalWeight={goalWeight}
      />

      {/* Upcoming Doses */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Próximas Doses</h2>
        </div>
        <div className="space-y-3">
          {upcomingDoses.map((dose: any) => {
            const daysUntil = differenceInDays(new Date(dose.scheduledDate), new Date());
            const isToday = daysUntil === 0;

            return (
              <div
                key={dose.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border",
                  isToday && "bg-primary/5 border-primary"
                )}
              >
                <div>
                  <p className="font-medium text-sm">{dose.dose}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(dose.scheduledDate), "dd MMM yyyy", { locale: ptBR })}
                  </p>
                </div>
                <Badge variant={isToday ? "default" : "secondary"}>
                  {isToday ? "Hoje" : `${daysUntil} dias`}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Completed Doses */}
      {recentCompletedDoses.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Check className="h-5 w-5 text-green-500" />
            <h2 className="text-lg font-semibold">Doses Recentes</h2>
          </div>
          <div className="space-y-3">
            {recentCompletedDoses.map((dose: any) => (
              <div key={dose.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium text-sm">{dose.dose}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(dose.completedAt), "dd MMM yyyy", { locale: ptBR })}
                  </p>
                </div>
                <Check className="h-4 w-4 text-green-500" />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
