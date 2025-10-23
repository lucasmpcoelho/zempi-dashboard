import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Ring {
  label: string;
  value: number;
  target: number;
  color: string;
  unit?: string;
}

interface ActivityRingsProps {
  rings: Ring[];
  size?: "sm" | "md" | "lg";
}

export default function ActivityRings({ rings, size = "md" }: ActivityRingsProps) {
  const sizeConfig = {
    sm: { container: 120, strokeWidth: 8, gap: 12, fontSize: "text-xs" },
    md: { container: 160, strokeWidth: 12, gap: 16, fontSize: "text-sm" },
    lg: { container: 200, strokeWidth: 16, gap: 20, fontSize: "text-base" }
  };

  const config = sizeConfig[size];
  const center = config.container / 2;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Rings */}
      <div className="relative" style={{ width: config.container, height: config.container }}>
        <svg width={config.container} height={config.container} className="transform -rotate-90">
          {rings.map((ring, index) => {
            const radius = center - config.strokeWidth / 2 - (index * config.gap);
            const circumference = 2 * Math.PI * radius;
            const percentage = Math.min((ring.value / ring.target) * 100, 100);
            const strokeDashoffset = circumference - (percentage / 100) * circumference;

            return (
              <g key={index}>
                {/* Background circle */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={config.strokeWidth}
                  className="text-muted opacity-20"
                />

                {/* Progress circle */}
                <motion.circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={config.strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Labels */}
      <div className="flex gap-4 flex-wrap justify-center">
        {rings.map((ring, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: ring.color }}
            />
            <div className={cn("flex flex-col", config.fontSize)}>
              <span className="font-semibold tabular-nums">
                {ring.value.toFixed(0)}/{ring.target}{ring.unit}
              </span>
              <span className="text-xs text-muted-foreground">{ring.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
