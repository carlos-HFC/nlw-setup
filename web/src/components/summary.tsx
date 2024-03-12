import { isSameDay } from "date-fns";

import { Day } from "./day";

import { WEEKDAYS } from "@/constants";
import { SUMMARY_TABLE } from "@/constants/next-tags";
import { api } from "@/services/api";
import { generateDatesFromYearBeginning } from "@/utils";

const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export async function Summary() {
  const { data: summary } = await api.get("/summary", {
    next: {
      tags: [SUMMARY_TABLE]
    },
  }) as { data: Summary[]; };

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3 *:text-zinc-400 *:text-xl *:font-bold *:size-10 *:flex *:items-center *:justify-center">
        {WEEKDAYS.map((item, i) => (
          <div key={i}>
            {item.slice(0, 1)}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date, i) => {
          const dayInSummary = summary.find(day => isSameDay(date, day.date));

          return (
            <Day
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          );
        })}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
          <div
            key={i}
            className="size-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
          />
        ))}
      </div>
    </div>
  );
}