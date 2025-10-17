import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface EducationalCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function EducationalCard({ icon: Icon, title, description }: EducationalCardProps) {
  return (
    <Card className="p-6 hover-elevate" data-testid={`card-educational-${title.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-chart-3/10 text-chart-3">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
}
