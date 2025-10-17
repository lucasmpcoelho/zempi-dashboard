import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  type?: string;
  delay?: number;
}

export default function ChatInput({ onSubmit, placeholder = "Digite aqui...", type = "text", delay = 0 }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      onSubmit={handleSubmit}
      className="flex gap-2"
    >
      <Input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-12 text-base flex-1"
        data-testid="input-chat"
        autoFocus
      />
      <Button
        type="submit"
        size="icon"
        className="h-12 w-12 flex-shrink-0"
        disabled={!value.trim()}
        data-testid="button-send"
      >
        <Send className="h-5 w-5" />
      </Button>
    </motion.form>
  );
}
