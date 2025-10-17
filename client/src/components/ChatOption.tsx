import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ChatOptionProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
  delay?: number;
  icon?: React.ReactNode;
}

export default function ChatOption({ label, selected = false, onClick, delay = 0, icon }: ChatOptionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      onClick={onClick}
      className={`
        w-full p-4 rounded-xl border-2 text-left transition-all
        flex items-center justify-between gap-3
        hover-elevate active-elevate-2
        ${
          selected
            ? "border-primary bg-primary/5 text-foreground"
            : "border-border bg-background text-foreground"
        }
      `}
      data-testid={`option-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center gap-3 flex-1">
        {icon && <div className="text-primary">{icon}</div>}
        <span className="font-medium">{label}</span>
      </div>
      {selected && <Check className="h-5 w-5 text-primary flex-shrink-0" />}
    </motion.button>
  );
}
