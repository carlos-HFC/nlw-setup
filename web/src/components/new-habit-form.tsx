"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";

import { Checkbox } from "./checkbox";

import { WEEKDAYS } from "@/constants";
import { createHabit } from "@/services/actions/create-habit";

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekdays, setWeekdays] = useState<number[]>([]);

  function handleToggleWeekdays(index: number) {
    setWeekdays(prev => {
      if (weekdays.includes(index)) {
        return prev.filter(item => item !== index);
      }

      return [...prev, index];
    });
  }

  async function handleSubmit(form: FormData) {
    const title = form.get("title")?.toString().trim();

    if (!title || weekdays.length <= 0) return;

    const body = {
      title,
      weekdays
    };

    await createHabit(JSON.stringify(body));

    setWeekdays([]);
    setTitle('');
  }

  return (
    <form
      className="w-full flex flex-col mt-6"
      action={handleSubmit}
    >
      <label
        htmlFor="title"
        className="font-semibold leading-tight"
      >
        Qual o seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 placeholder:text-zinc-400"
      />

      <label
        className="font-semibold leading-tight mt-4"
      >
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {WEEKDAYS.map((item, i) => (
          <Checkbox
            key={item}
            label={item}
            name="weekdays"
            checked={weekdays.includes(i)}
            onCheckedChange={() => handleToggleWeekdays(i)}
          />
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <CheckIcon className="size-5 stroke-[4px]" />
        Confirmar
      </button>
    </form>
  );
}