import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickStatsCardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

export default function QuickStatsCard({
  icon: Icon,
  iconColor,
  label,
  value,
  unit,
  trend,
  onClick
}: QuickStatsCardProps) {
  return (
    <Card
      className={cn(
        "p-4 transition-all duration-200",
        onClick && "cursor-pointer hover:shadow-md active:scale-98"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 rounded-lg", iconColor)}>
          <Icon className="h-4 w-4" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold tabular-nums">
          {value}
          {unit && <span className="text-base text-muted-foreground ml-1">{unit}</span>}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </div>
    </Card>
  );
}
