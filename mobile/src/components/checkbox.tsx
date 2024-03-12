import { cn } from "@/utils/cn";
import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import colors from "tailwindcss/colors";

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function Checkbox({ checked, title, ...props }: Readonly<CheckboxProps>) {
  return (
    <TouchableOpacity
      activeOpacity={.7}
      className="flex-row gap-x-3 mb-2 items-center"
      {...props}
    >
      <View className={cn(
        "w-8 h-8 rounded-lg items-center justify-center",
        checked ? "bg-green-500" : "bg-zinc-900"
      )}>
        <Feather
          name="check"
          size={20}
          color={checked ? colors.white : colors.transparent}
        />
      </View>

      <Text className="text-white font-semibold text-base">
        {title}
      </Text>
    </TouchableOpacity>
  );
}