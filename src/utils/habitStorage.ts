import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Habit } from "@/src/types/habit";

// --------------------------------------------------
// Storage
// --------------------------------------------------

const HABITS_STORAGE_KEY = "@habitly/habits";

// --------------------------------------------------
// Date helpers
// --------------------------------------------------

export const getToday = (): string => {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// --------------------------------------------------
// Save habits
// --------------------------------------------------

export const saveHabits = async (
  habits: Habit[]
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(habits);

    await AsyncStorage.setItem(
      HABITS_STORAGE_KEY,
      jsonValue
    );
  } catch (error) {
    console.error(
      "Failed to save habits:",
      error
    );
  }
};

// --------------------------------------------------
// Load habits
// --------------------------------------------------

export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const jsonValue =
      await AsyncStorage.getItem(
        HABITS_STORAGE_KEY
      );

    if (jsonValue === null) {
      return [];
    }

    const savedHabits = JSON.parse(jsonValue);

    const habits: Habit[] =
      savedHabits.map((habit: any) => ({
        id: habit.id,
        title: habit.title,
        frequency: habit.frequency,

        completed:
          habit.completed ?? false,

        completedDates:
          habit.completedDates ??
          (habit.completed
            ? [getToday()]
            : []),
      }));

    return habits;
  } catch (error) {
    console.error(
      "Failed to load habits:",
      error
    );

    return [];
  }
};

// --------------------------------------------------
// Reset today's completion state
// --------------------------------------------------

export const resetDailyHabits = (
  habits: Habit[]
): Habit[] => {
  const today = getToday();

  return habits.map((habit) => ({
    ...habit,

    completed:
      habit.completedDates.includes(today),

    completedDates:
      habit.completedDates ?? [],
  }));
};

// --------------------------------------------------
// Clear habits
// --------------------------------------------------

export const clearHabits = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(
      HABITS_STORAGE_KEY
    );
  } catch (error) {
    console.error(
      "Failed to clear habits:",
      error
    );
  }
};