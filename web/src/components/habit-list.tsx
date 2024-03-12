"use client";

import { endOfDay, isBefore } from "date-fns";
import { useEffect, useState } from "react";

import { Checkbox } from "./checkbox";

import { getDay } from "@/services/actions/get-day";
import { toggleHabit } from "@/services/actions/toggle-habit";

interface HabitListProps {
  date: Date;
}

export function HabitList(props: Readonly<HabitListProps>) {
  const [habitsInfo, setHabitsInfo] = useState({} as ListHabits);

  useEffect(() => {
    getDay(props.date)
      .then(response => setHabitsInfo(response.data));
  }, []);

  async function handleToggleHabit(id: string) {
    const status = await toggleHabit(id);

    if (status >= 400) {
      return;
    }

    const isAlreadyCompleted = habitsInfo?.completedHabits.includes(id);

    setHabitsInfo(prev => {
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

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits?.map(item => (
        <Checkbox
          key={item.id}
          dayhabit
          onCheckedChange={() => handleToggleHabit(item.id)}
          checked={habitsInfo.completedHabits.includes(item.id)}
          disabled={isBefore(endOfDay(props.date), new Date())}
          label={item.title}
        />
      ))}
    </div>
  );
}