import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, CheckCircle2, TrendingUp } from "lucide-react";

interface PersonalizedAlertProps {
  type: "warning" | "info" | "success" | "tip";
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const alertStyles = {
  warning: {
    icon: AlertTriangle,
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    iconColor: "text-yellow-600 dark:text-yellow-500",
    titleColor: "text-yellow-900 dark:text-yellow-200",
  },
  info: {
    icon: Info,
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-500",
    titleColor: "text-blue-900 dark:text-blue-200",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    iconColor: "text-green-600 dark:text-green-500",
    titleColor: "text-green-900 dark:text-green-200",
  },
  tip: {
    icon: TrendingUp,
    bg: "bg-primary/10",
    border: "border-primary/20",
    iconColor: "text-primary",
    titleColor: "text-foreground",
  },
};

export default function PersonalizedAlert({ type, title, description, action }: PersonalizedAlertProps) {
  const style = alertStyles[type];
  const Icon = style.icon;

  return (
    <Card className={`p-4 ${style.bg} ${style.border}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-background/50 ${style.iconColor} flex-shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-sm mb-1 ${style.titleColor}`}>{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          {action && (
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-3"
              onClick={action.onClick}
              data-testid="button-alert-action"
            >
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
