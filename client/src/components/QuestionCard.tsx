import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface QuestionCardProps {
  children: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
}

export default function QuestionCard({ children, onBack, showBack = true }: QuestionCardProps) {
  return (
    <div className="w-full max-w-md mx-auto px-4 animate-slide-in-right">
      {showBack && onBack && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mb-4"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
      <Card className="p-8 shadow-lg">
        {children}
      </Card>
    </div>
  );
}
