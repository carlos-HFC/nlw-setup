import { useRoute } from "@react-navigation/native";
import { endOfDay, format, isBefore, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import { BackButton } from "@/components/back-button";
import { Checkbox } from "@/components/checkbox";
import { HabitsEmpty } from "@/components/habits-empty";
import { Loading } from "@/components/loading";
import { ProgressBar } from "@/components/progress-bar";

import { api } from "@/services/api";

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState({} as ListHabits);

  const route = useRoute();
  const { date } = route.params as ReactNavigation.RootParamList['habit'];

  const parsedDate = parseISO(date);
  const dayOfWeek = format(parsedDate, 'EEEE');
  const dayAndMonth = format(parsedDate, 'dd/MM');

  const completePercentage = dayInfo?.possibleHabits?.length > 0 ? Math.round((dayInfo?.completedHabits?.length / dayInfo?.possibleHabits?.length) * 100) : 0;

  useEffect(() => {
    fetchHabits();
  }, []);

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get("/day", {
        params: {
          date: date.split("T")[0]
        }
      });

      setDayInfo(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar as informações dos hábitos");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(id: string) {
    await api.patch(`/habits/${id}/toggle`);

    const isAlreadyCompleted = dayInfo?.completedHabits.includes(id);

    setDayInfo(prev => {
      if (isAlreadyCompleted) {
        return {
          ...prev,
          completedHabits: prev?.completedHabits.filter(item => item !== id)
        };
      }

      return {
        ...prev,
        completedHabits: [...prev.completedHabits, id]
      };
    });
  }

  if (loading) return <Loading />;

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

        <ProgressBar progress={completePercentage} />

        <View className="mt-6">
          {dayInfo?.possibleHabits?.length > 0
            ? (
              dayInfo?.possibleHabits?.map(item => (
                <Checkbox
                  key={item.id}
                  title={item.title}
                  checked={dayInfo?.completedHabits?.includes(item.id)}
                  onPress={() => handleToggleHabit(item.id)}
                  disabled={isBefore(endOfDay(date), new Date())}
                />
              ))
            ) : (
              <HabitsEmpty />
            )}
        </View>
      </ScrollView>
    </View>
  );
}