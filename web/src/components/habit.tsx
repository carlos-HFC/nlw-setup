interface HabitProps {
  completed: number;
}

export function Habit(props: Readonly<HabitProps>) {
  return (
    <div className="bg-zinc-900 size-10 text-white rounded m-2 flex items-center justify-center">
      {props.completed}
    </div>
  );
}