import { eachDayOfInterval, startOfToday, startOfYear } from "date-fns";

export function cn(...args: Array<string | boolean | undefined>) {
  return args.filter(Boolean).join(' ');
}

export function generateDatesFromYearBeginning() {
  const firstDayOfTheYear = startOfYear(new Date());
  const today = startOfToday();

  const result = eachDayOfInterval({
    start: firstDayOfTheYear,
    end: today
  });

  return result;
}