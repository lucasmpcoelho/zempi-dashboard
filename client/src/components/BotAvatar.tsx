import { Bot } from "lucide-react";

interface BotAvatarProps {
  size?: "sm" | "md" | "lg";
}

export default function BotAvatar({ size = "md" }: BotAvatarProps) {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shadow-lg`}
      data-testid="avatar-bot"
    >
      <Bot className={`${iconSizes[size]} text-white`} />
    </div>
  );
}
