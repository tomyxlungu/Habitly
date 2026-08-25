export type HabitFrequency =
  | "Daily"
  | "3 times a week"
  | "Weekly"
  | "Weekdays"
  | "Weekends";

export type Habit = {
  id: string;
  title: string;
  frequency: HabitFrequency;
  completed: boolean;
  completedDates: string[];
};