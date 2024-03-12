import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";

import { Header } from "@/components/header";
import { HabitDay } from "@/components/habit-day";

import { DAY_SIZE, WEEKDAYS } from "@/constants";
import { generateDatesFromYearBeginning } from "@/utils/generate-range-between-dates";

const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function Home() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row gap-x-1 mt-6 mb-2">
        {WEEKDAYS.map((item, i) => (
          <Text
            key={`${item}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center"
            style={{
              width: DAY_SIZE,
              height: DAY_SIZE,
            }}
          >
            {item.slice(0, 1)}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="flex-row flex-wrap">
          {summaryDates.map(item => (
            <HabitDay
              key={item.toString()}
              onPress={() => navigation.navigate("habit", { date: item.toISOString() })}
            />
          ))}
          {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
            <View
              key={i}
              className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
              style={{
                width: DAY_SIZE,
                height: DAY_SIZE
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}