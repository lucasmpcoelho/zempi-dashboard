import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor?: string;
}

export default function MetricCard({ icon: Icon, label, value, iconColor = "text-primary" }: MetricCardProps) {
  return (
    <Card className="p-6 hover-elevate" data-testid={`card-metric-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full bg-primary/10 ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-mono font-semibold" data-testid={`text-value-${label.toLowerCase().replace(/\s/g, '-')}`}>
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
}
