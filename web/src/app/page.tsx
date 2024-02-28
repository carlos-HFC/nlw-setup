import { Habit } from "@/components/habit";

export default function Home() {
  return (
    <>
      <Habit completed={5} />
      <Habit completed={20} />
      <Habit completed={30} />
    </>
  );
}
