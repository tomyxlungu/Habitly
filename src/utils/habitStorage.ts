import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Habit } from "@/src/types/habit";

const HABITS_STORAGE_KEY = "@habitly_habits";

// --------------------------------------------------
// Today's date
// --------------------------------------------------

export const getToday = () => {
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
// Load habits
// --------------------------------------------------

export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const storedHabits =
      await AsyncStorage.getItem(
        HABITS_STORAGE_KEY
      );

    if (!storedHabits) {
      return [];
    }

    const habits: Habit[] =
      JSON.parse(storedHabits);

    // Support habits created before
    // completedDates was added.
    return habits.map((habit) => ({
      ...habit,
      completedDates:
        habit.completedDates ?? [],
    }));
  } catch (error) {
    console.error(
      "Failed to load habits:",
      error
    );

    return [];
  }
};

// --------------------------------------------------
// Save habits
// --------------------------------------------------

export const saveHabits = async (
  habits: Habit[]
) => {
  try {
    await AsyncStorage.setItem(
      HABITS_STORAGE_KEY,
      JSON.stringify(habits)
    );
  } catch (error) {
    console.error(
      "Failed to save habits:",
      error
    );
  }
};

// --------------------------------------------------
// Reset daily completion
// --------------------------------------------------

export const resetDailyHabits = (
  habits: Habit[]
): Habit[] => {
  const today = getToday();

  return habits.map((habit) => ({
    ...habit,

    completedDates:
      habit.completedDates ?? [],

    // Only today's date determines whether
    // the habit is currently completed.
    completed:
      habit.completedDates?.includes(today) ??
      false,
  }));
};