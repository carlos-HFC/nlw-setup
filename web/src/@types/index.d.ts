type Summary = {
  id: string;
  date: string;
  completed: number;
  amount: number;
};

type Habits = {
  id: string;
  title: string;
};

type ListHabits = {
  possibleHabits: Habits[];
  completedHabits: string[];
};