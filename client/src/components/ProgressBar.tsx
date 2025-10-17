import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <Progress value={progress} className="h-1" data-testid="progress-bar" />
      <p className="text-sm text-muted-foreground text-center" data-testid="text-progress">
        Passo {currentStep} de {totalSteps}
      </p>
    </div>
  );
}
