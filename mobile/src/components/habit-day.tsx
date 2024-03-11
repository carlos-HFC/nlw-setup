import { TouchableOpacity } from "react-native";

import { DAY_SIZE } from "@/constants";

export function HabitDay() {
  return (
    <TouchableOpacity
      activeOpacity={.7}
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      style={{
        width: DAY_SIZE,
        height: DAY_SIZE
      }}
    />
  );
}