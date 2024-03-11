import { Day } from "./day";

import { generateDatesFromYearBeginning } from "@/utils";

const weekdays = 'DSTQQSS';

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function Summary() {
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3 *:text-zinc-400 *:text-xl *:font-bold *:size-10 *:flex *:items-center *:justify-center">
        {weekdays.split("").map((item, i) => (
          <div key={i}>
            {item}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date, i) => (
          <Day
            key={date.toString()}
            amount={5}
            completed={Math.round(Math.random() * 5)}
          />
        ))}

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