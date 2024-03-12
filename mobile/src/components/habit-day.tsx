import { isToday } from "date-fns";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { DAY_SIZE } from "@/constants";
import { cn } from "@/utils/cn";

interface HabitDayProps extends TouchableOpacityProps {
  amount?: number;
  completed?: number;
  date: Date;
}

export function HabitDay({ amount = 0, completed = 0, ...props }: HabitDayProps) {
  const completePercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const isCurrentDay = isToday(props.date);

  return (
    <TouchableOpacity
      activeOpacity={.7}
      className={cn(
        "rounded-lg border-2 m-1",
        completePercentage <= 0 && "bg-zinc-900 border-zinc-800",
        completePercentage > 0 && completePercentage <= 20 && "bg-violet-900 border-violet-700",
        completePercentage > 20 && completePercentage <= 40 && "bg-violet-800 border-violet-600",
        completePercentage > 40 && completePercentage <= 60 && "bg-violet-700 border-violet-500",
        completePercentage > 60 && completePercentage <= 80 && "bg-violet-600 border-violet-400",
        completePercentage > 80 && "bg-violet-500 border-violet-300",
        isCurrentDay && "border-white border-4"
      )}
      style={{
        width: DAY_SIZE,
        height: DAY_SIZE
      }}
      {...props}
    />
  );
}