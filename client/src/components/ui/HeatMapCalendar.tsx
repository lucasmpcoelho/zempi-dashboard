import { format, eachDayOfInterval, subDays, startOfWeek, endOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface DayData {
  date: string;
  value: number;
  label?: string;
}

interface HeatMapCalendarProps {
  data: DayData[];
  title?: string;
  subtitle?: string;
  colorScale?: {
    empty: string;
    low: string;
    medium: string;
    high: string;
    excellent: string;
  };
}

export default function HeatMapCalendar({
  data,
  title,
  subtitle,
  colorScale = {
    empty: "bg-muted",
    low: "bg-red-200 dark:bg-red-900/30",
    medium: "bg-orange-200 dark:bg-orange-900/30",
    high: "bg-yellow-200 dark:bg-yellow-900/30",
    excellent: "bg-green-500 dark:bg-green-600"
  }
}: HeatMapCalendarProps) {
  // Generate last 30 days
  const endDate = new Date();
  const startDate = subDays(endDate, 29);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Create a map for quick lookups
  const dataMap = new Map(data.map(d => [d.date, d]));

  // Group days by week
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  days.forEach((day, index) => {
    currentWeek.push(day);

    // Start new week on Sunday or at the end
    if (day.getDay() === 6 || index === days.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const getColorClass = (value: number) => {
    if (value === 0) return colorScale.empty;
    if (value < 50) return colorScale.low;
    if (value < 75) return colorScale.medium;
    if (value < 90) return colorScale.high;
    return colorScale.excellent;
  };

  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
    <div className="space-y-3">
      {(title || subtitle) && (
        <div>
          {title && <h3 className="font-semibold text-sm">{title}</h3>}
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      <div className="space-y-1">
        {/* Week day labels */}
        <div className="flex gap-1 mb-1">
          <div className="w-5" /> {/* Spacer for alignment */}
          {weekDays.map((day, i) => (
            <div
              key={i}
              className="w-6 h-6 flex items-center justify-center text-[10px] text-muted-foreground font-medium"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex gap-1">
          {/* Week numbers (optional) */}
          <div className="flex flex-col gap-1">
            {weeks.map((_, i) => (
              <div
                key={i}
                className="w-5 h-6 flex items-center justify-center text-[10px] text-muted-foreground"
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="flex flex-col gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex gap-1">
                {week.map((day) => {
                  const dateStr = format(day, "yyyy-MM-dd");
                  const dayData = dataMap.get(dateStr);
                  const value = dayData?.value ?? 0;
                  const colorClass = getColorClass(value);

                  return (
                    <div
                      key={dateStr}
                      className={cn(
                        "w-6 h-6 rounded-sm transition-all duration-200 hover:ring-2 hover:ring-primary/50 cursor-pointer relative group",
                        colorClass
                      )}
                      title={`${format(day, "dd/MM/yyyy", { locale: ptBR })}: ${value}%`}
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {format(day, "dd/MM", { locale: ptBR })}
                        {dayData?.label && (
                          <>
                            <br />
                            {dayData.label}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <span>Menos</span>
          <div className="flex gap-1">
            <div className={cn("w-3 h-3 rounded-sm", colorScale.empty)} />
            <div className={cn("w-3 h-3 rounded-sm", colorScale.low)} />
            <div className={cn("w-3 h-3 rounded-sm", colorScale.medium)} />
            <div className={cn("w-3 h-3 rounded-sm", colorScale.high)} />
            <div className={cn("w-3 h-3 rounded-sm", colorScale.excellent)} />
          </div>
          <span>Mais</span>
        </div>
      </div>
    </div>
  );
}
