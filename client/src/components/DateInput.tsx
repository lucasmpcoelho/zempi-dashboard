import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface DateInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  delay?: number;
}

export default function DateInput({ onSubmit, placeholder = "DD/MM/AAAA", delay = 0 }: DateInputProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // Remove non-digits
    
    if (input.length >= 2) {
      input = input.slice(0, 2) + "/" + input.slice(2);
    }
    if (input.length >= 5) {
      input = input.slice(0, 5) + "/" + input.slice(5);
    }
    if (input.length > 10) {
      input = input.slice(0, 10);
    }
    
    setValue(input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length === 10) {
      // Convert DD/MM/YYYY to YYYY-MM-DD for storage
      const [day, month, year] = value.split("/");
      const isoDate = `${year}-${month}-${day}`;
      onSubmit(isoDate);
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
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-12 text-base flex-1"
        data-testid="input-date"
        autoFocus
        maxLength={10}
      />
      <Button
        type="submit"
        size="icon"
        className="h-12 w-12 flex-shrink-0"
        disabled={value.length !== 10}
        data-testid="button-send"
      >
        <Send className="h-5 w-5" />
      </Button>
    </motion.form>
  );
}
