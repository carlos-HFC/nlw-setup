import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { isSameDay } from "date-fns";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import { HabitDay } from "@/components/habit-day";
import { Header } from "@/components/header";
import { Loading } from "@/components/loading";

import { DAY_SIZE, WEEKDAYS } from "@/constants";
import { api } from "@/services/api";
import { generateDatesFromYearBeginning } from "@/utils/generate-range-between-dates";

const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function Home() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Summary[]>([]);

  useFocusEffect(useCallback(() => {
    fetchData();
  }, []));

  async function fetchData() {
    try {
      setLoading(true);

      const response = await api.get("/summary");

      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row justify-center gap-x-2 mt-6 mb-2">
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
          {summaryDates.map(date => {
            const dayInSummary = summary.find(item => isSameDay(date, item.date));

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                completed={dayInSummary?.completed}
                onPress={() => navigation.navigate("habit", { date: date.toISOString() })}
              />
            );
          })}

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