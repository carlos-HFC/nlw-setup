import { useRoute } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import { ScrollView, Text, View } from "react-native";

import { BackButton } from "@/components/back-button";
import { Checkbox } from "@/components/checkbox";
import { ProgressBar } from "@/components/progress-bar";

export function Habit() {
  const route = useRoute();
  const { date } = route.params as ReactNavigation.RootParamList['habit'];

  const parsedDate = parseISO(date);
  const dayOfWeek = format(parsedDate, 'EEEE');
  const dayAndMonth = format(parsedDate, 'dd/MM');

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="mt-6 text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={75} />

        <View className="mt-6">
          <Checkbox
            title="Beber água"
          />
          <Checkbox
            title="Caminhar"
            checked
          />
        </View>
      </ScrollView>
    </View>
  );
}