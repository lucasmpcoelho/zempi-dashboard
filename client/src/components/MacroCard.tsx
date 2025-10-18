import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MacroCardProps {
  label: string;
  current: number;
  target: number;
  unit: string;
  color?: string;
}

export default function MacroCard({ label, current, target, unit, color = "hsl(var(--chart-1))" }: MacroCardProps) {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-semibold font-mono tabular-nums">
            {current}
            <span className="text-sm text-muted-foreground ml-1">{unit}</span>
          </p>
        </div>
        
        <Progress 
          value={percentage} 
          className="h-1.5" 
          style={{ 
            ['--progress-background' as string]: color 
          } as React.CSSProperties}
        />
        
        <p className="text-xs text-muted-foreground">
          Meta: {target}{unit}
        </p>
      </div>
    </Card>
  );
}
