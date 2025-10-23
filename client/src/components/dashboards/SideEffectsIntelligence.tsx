import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  TrendingDown,
  Droplet,
  Utensils,
  Info,
  AlertCircle,
  CheckCircle2,
  Lightbulb
} from "lucide-react";
import { format, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface MoodEntry {
  date: string;
  mood: string;
  symptoms: string[];
  notes?: string;
}

interface MedicationDose {
  scheduledDate: string;
  completed: number;
  dose: string;
}

interface Meal {
  date: string;
  protein: number;
  calories: number;
  fats: number;
  carbs: number;
}

interface SideEffectsIntelligenceProps {
  moodEntries: MoodEntry[];
  medicationDoses: MedicationDose[];
  meals: Meal[];
}

interface Correlation {
  trigger: string;
  correlation: number;
  insight: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

export default function SideEffectsIntelligence({
  moodEntries,
  medicationDoses,
  meals
}: SideEffectsIntelligenceProps) {

  // Get last 30 days for calendar
  const today = new Date();
  const last30Days = subDays(today, 29);
  const calendarDays = eachDayOfInterval({ start: last30Days, end: today });

  // Map symptoms by date
  const symptomsByDate = useMemo(() => {
    const map = new Map<string, string[]>();
    moodEntries.forEach(entry => {
      if (entry.symptoms && entry.symptoms.length > 0) {
        map.set(entry.date, entry.symptoms);
      }
    });
    return map;
  }, [moodEntries]);

  // Map dose days
  const doseDays = useMemo(() => {
    const set = new Set<string>();
    medicationDoses
      .filter(dose => dose.completed === 1)
      .forEach(dose => {
        set.add(dose.scheduledDate);
      });
    return set;
  }, [medicationDoses]);

  // Calculate correlations
  const correlations = useMemo(() => {
    const results: Correlation[] = [];

    // Get symptom days
    const symptomDays = moodEntries.filter(e => e.symptoms && e.symptoms.length > 0);

    if (symptomDays.length === 0) {
      return results;
    }

    // 1. Correlation with dose timing
    const doseCorrelation = symptomDays.map(symptomDay => {
      // Find nearest dose before this symptom
      const symptomDate = new Date(symptomDay.date);
      const completedDoses = medicationDoses
        .filter(d => d.completed === 1)
        .map(d => new Date(d.scheduledDate))
        .filter(d => d <= symptomDate);

      if (completedDoses.length === 0) return null;

      const nearestDose = completedDoses.reduce((prev, curr) =>
        Math.abs(curr.getTime() - symptomDate.getTime()) < Math.abs(prev.getTime() - symptomDate.getTime())
          ? curr
          : prev
      );

      return differenceInDays(symptomDate, nearestDose);
    }).filter(d => d !== null && d >= 0 && d <= 7);

    // Days 0-2 after dose (common pattern)
    const symptomsWithin2Days = doseCorrelation.filter(d => d !== null && d <= 2).length;
    const doseCorrelationRate = symptomDays.length > 0 ? symptomsWithin2Days / symptomDays.length : 0;

    if (doseCorrelationRate >= 0.4) {
      results.push({
        trigger: "Dia da dose",
        correlation: doseCorrelationRate,
        insight: `${(doseCorrelationRate * 100).toFixed(0)}% dos sintomas ocorrem 1-2 dias após a dose`,
        icon: Calendar,
        count: symptomsWithin2Days
      });
    }

    // 2. Correlation with high-fat meals
    const symptomDaysWithMeals = symptomDays.map(symptomDay => {
      const dayMeals = meals.filter(m => m.date === symptomDay.date);
      const totalFats = dayMeals.reduce((sum, m) => sum + (m.fats || 0), 0);
      return { symptoms: symptomDay.symptoms, fats: totalFats };
    });

    const highFatThreshold = 60; // grams
    const highFatDaysWithSymptoms = symptomDaysWithMeals.filter(d => d.fats >= highFatThreshold).length;
    const highFatCorrelation = symptomDays.length > 0 ? highFatDaysWithSymptoms / symptomDays.length : 0;

    if (highFatCorrelation >= 0.5 && highFatDaysWithSymptoms >= 3) {
      results.push({
        trigger: "Refeições gordurosas",
        correlation: highFatCorrelation,
        insight: `${(highFatCorrelation * 100).toFixed(0)}% de correlação com >60g gordura/dia`,
        icon: Utensils,
        count: highFatDaysWithSymptoms
      });
    }

    // 3. Low water/hydration pattern (proxy: check for specific symptoms)
    const constipationSymptoms = symptomDays.filter(s =>
      s.symptoms.some(sym => sym.toLowerCase().includes('constipa') || sym.toLowerCase().includes('prisão'))
    );

    if (constipationSymptoms.length >= 3) {
      results.push({
        trigger: "Baixa hidratação",
        correlation: 0.6,
        insight: `${constipationSymptoms.length} dias com constipação - aumente água`,
        icon: Droplet,
        count: constipationSymptoms.length
      });
    }

    return results.sort((a, b) => b.correlation - a.correlation);
  }, [moodEntries, medicationDoses, meals]);

  // Generate personalized tips
  const personalizedTips = useMemo(() => {
    const tips: string[] = [];

    correlations.forEach(corr => {
      if (corr.trigger === "Dia da dose") {
        tips.push("📅 Prepare-se: sintomas são mais comuns 1-2 dias após a dose. Planeje refeições leves.");
      }
      if (corr.trigger === "Refeições gordurosas") {
        tips.push("🍽️ Evite alimentos gordurosos nos dias próximos à dose. Opte por proteínas magras.");
      }
      if (corr.trigger === "Baixa hidratação") {
        tips.push("💧 Aumente a ingestão de água (2-3L/dia) e adicione fibras para melhorar a constipação.");
      }
    });

    // General tips if no strong correlations
    if (correlations.length === 0 && moodEntries.some(e => e.symptoms.length > 0)) {
      tips.push("📊 Continue registrando sintomas para identificarmos padrões personalizados.");
      tips.push("🥗 Refeições menores e frequentes ajudam a reduzir náusea.");
    }

    // Success message if no symptoms
    const recentSymptoms = moodEntries
      .filter(e => new Date(e.date) >= subDays(today, 14))
      .filter(e => e.symptoms.length > 0);

    if (recentSymptoms.length === 0 && moodEntries.length > 5) {
      tips.push("✨ Parabéns! Você está sem sintomas nas últimas 2 semanas. Continue assim!");
    }

    return tips;
  }, [correlations, moodEntries]);

  // Calculate symptom-free days
  const symptomFreeDays = useMemo(() => {
    const last30DaysEntries = moodEntries.filter(e =>
      new Date(e.date) >= last30Days && new Date(e.date) <= today
    );
    return last30DaysEntries.filter(e => !e.symptoms || e.symptoms.length === 0).length;
  }, [moodEntries, last30Days]);

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <Card className="p-6 border-l-4 border-l-purple-500">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900">
            <TrendingDown className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Análise de Sintomas</h2>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </div>
          <Badge variant="secondary" className="text-lg font-bold px-4 py-2">
            {symptomFreeDays}/30 dias
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-medium text-green-700 dark:text-green-300">Sem sintomas</span>
            </div>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">{symptomFreeDays}</p>
          </div>
          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <span className="text-xs font-medium text-orange-700 dark:text-orange-300">Com sintomas</span>
            </div>
            <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{30 - symptomFreeDays}</p>
          </div>
        </div>
      </Card>

      {/* Calendar Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          Linha do Tempo (Últimos 30 dias)
        </h3>

        <div className="grid grid-cols-7 gap-2">
          {/* Day labels */}
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
            <div key={i} className="text-center text-xs font-medium text-muted-foreground pb-2">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((day, index) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const hasSymptoms = symptomsByDate.has(dateStr);
            const isDoseDay = doseDays.has(dateStr);
            const symptoms = symptomsByDate.get(dateStr) || [];

            return (
              <div
                key={index}
                className={cn(
                  "aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-xs font-medium transition-all",
                  hasSymptoms && "bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-800",
                  !hasSymptoms && isDoseDay && "bg-purple-50 dark:bg-purple-950/20 border-purple-300 dark:border-purple-800",
                  !hasSymptoms && !isDoseDay && "bg-green-50 dark:bg-green-950/10 border-green-200 dark:border-green-800/50",
                  isSameDay(day, today) && "ring-2 ring-primary"
                )}
                title={`${format(day, 'dd MMM', { locale: ptBR })}${isDoseDay ? ' - 💉 Dose' : ''}${hasSymptoms ? ` - 😕 ${symptoms.join(', ')}` : ''}`}
              >
                <span className="text-[10px] text-muted-foreground">{format(day, 'd')}</span>
                <div className="flex gap-0.5 mt-0.5">
                  {isDoseDay && <span className="text-xs">💉</span>}
                  {hasSymptoms && <span className="text-xs">😕</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-50 dark:bg-green-950/10 border-2 border-green-200 dark:border-green-800/50" />
            <span className="text-muted-foreground">Sem sintomas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-300 dark:border-purple-800" />
            <span className="text-muted-foreground">💉 Dia da dose</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800" />
            <span className="text-muted-foreground">😕 Com sintomas</span>
          </div>
        </div>
      </Card>

      {/* Correlations */}
      {correlations.length > 0 && (
        <Card className="p-6 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900">
              <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Padrões Identificados</h2>
              <p className="text-xs text-muted-foreground">Gatilhos mais comuns</p>
            </div>
          </div>

          <div className="space-y-3">
            {correlations.map((corr, index) => {
              const Icon = corr.icon;
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900 shrink-0">
                      <Icon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm">{corr.trigger}</h3>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                          {(corr.correlation * 100).toFixed(0)}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{corr.insight}</p>
                      <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">
                        <strong>{corr.count}</strong> ocorrências detectadas
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Personalized Tips */}
      {personalizedTips.length > 0 && (
        <Card className="p-6 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900">
              <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Dicas Personalizadas</h2>
              <p className="text-xs text-muted-foreground">Baseadas nos seus padrões</p>
            </div>
          </div>

          <div className="space-y-3">
            {personalizedTips.map((tip, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
              >
                <p className="text-sm text-blue-900 dark:text-blue-100 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Empty state */}
      {moodEntries.length === 0 && (
        <Card className="p-12 text-center">
          <div className="inline-flex p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 mb-4">
            <Calendar className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Comece a registrar seus sintomas</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Registre como você se sente diariamente para identificarmos padrões e ajudarmos você a gerenciar os efeitos colaterais.
          </p>
        </Card>
      )}
    </div>
  );
}
