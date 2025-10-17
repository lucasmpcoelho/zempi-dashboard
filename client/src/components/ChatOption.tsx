import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ChatOptionProps {
  label: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
  delay?: number;
  icon?: React.ReactNode;
}

export default function ChatOption({ 
  label, 
  description, 
  selected = false, 
  onClick, 
  delay = 0, 
  icon 
}: ChatOptionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      onClick={onClick}
      className={`
        w-full px-3 py-2.5 rounded-lg border text-left transition-all
        flex items-center justify-between gap-2
        hover-elevate active-elevate-2
        ${
          selected
            ? "border-primary bg-primary/5 text-foreground"
            : "border-border bg-background text-foreground"
        }
      `}
      data-testid={`option-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {icon && <div className="text-primary flex-shrink-0">{icon}</div>}
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium block">{label}</span>
          {description && (
            <span className="text-xs text-muted-foreground block mt-0.5">{description}</span>
          )}
        </div>
      </div>
      {selected && <Check className="h-4 w-4 text-primary flex-shrink-0" />}
    </motion.button>
  );
}
