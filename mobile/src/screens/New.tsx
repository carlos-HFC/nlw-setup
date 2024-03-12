import { Feather } from '@expo/vector-icons';
import { useState } from "react";
import { Text, TextInput, ScrollView, View, TouchableOpacity, Alert } from "react-native";
import colors from "tailwindcss/colors";

import { BackButton } from "@/components/back-button";
import { Checkbox } from "@/components/checkbox";

import { WEEKDAYS } from "@/constants";
import { api } from "@/services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [weekdays, setWeekdays] = useState<number[]>([]);

  function handleToggleWeekday(index: number) {
    setWeekdays(prev => {
      if (weekdays.includes(index)) {
        return prev.filter(item => item !== index);
      }

      return [...prev, index];
    });
  }

  async function handleSubmit() {
    try {
      if (!title.trim() || weekdays.length === 0) {
        return Alert.alert("Novo hábito", "Informe os dados para criar um hábito");
      }

      await api.post("/habits", {
        title,
        weekdays
      });

      setTitle("");
      setWeekdays([]);

      Alert.alert("Novo hábito", "Hábito criado com sucesso");
    } catch (error) {
      Alert.alert("Oops", "Erro ao criar um hábito");
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual o seu comprometimento?
        </Text>

        <TextInput
          className="h-12 px-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="ex.: Exercícios, beber água, etc..."
          placeholderTextColor={colors.zinc[400]}
          value={title}
          onChangeText={setTitle}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {WEEKDAYS.map((item, index) => (
          <Checkbox
            key={item}
            title={item}
            checked={weekdays.includes(index)}
            onPress={() => handleToggleWeekday(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={.7}
          className="w-full h-14 flex-row items-center justify-center gap-x-2 bg-green-600 rounded-md mt-6"
          onPress={handleSubmit}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="font-semibold text-base text-white">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}