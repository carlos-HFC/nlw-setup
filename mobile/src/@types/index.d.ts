type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
};

type Habit = {
  id: string;
  title: string;
};

type ListHabits = {
  completedHabits: string[];
  possibleHabits: Habit[];
};