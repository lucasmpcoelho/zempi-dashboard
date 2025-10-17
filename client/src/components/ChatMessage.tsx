import { motion } from "framer-motion";

interface ChatMessageProps {
  message: string;
  isBot?: boolean;
  delay?: number;
}

export default function ChatMessage({ message, isBot = true, delay = 0 }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}
    >
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
          isBot
            ? "bg-card text-card-foreground rounded-tl-sm"
            : "bg-primary text-primary-foreground rounded-tr-sm"
        }`}
      >
        <p className="text-base leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
}
