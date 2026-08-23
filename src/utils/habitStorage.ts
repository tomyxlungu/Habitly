import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Habit } from "@/src/types/habit";

// The key used to store Habitly's habits on the device.
const HABITS_STORAGE_KEY = "@habitly/habits";

// Save all habits to the device.
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
    console.error("Failed to save habits:", error);
  }
};


// Load habits from the device.
export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(
      HABITS_STORAGE_KEY
    );

    // Nothing has been saved yet.
    if (jsonValue === null) {
      return [];
    }

    const savedHabits = JSON.parse(jsonValue);

    // Convert old Habitly data to the new format.
    const habits: Habit[] = savedHabits.map(
      (habit: any) => ({
        id: habit.id,
        title: habit.title,
        frequency: habit.frequency,

        // New habits use completedDates.
        //
        // If an old habit has `completed: true`,
        // treat it as completed today.
        completedDates:
          habit.completedDates ??
          (habit.completed
            ? [new Date().toISOString().split("T")[0]]
            : []),
      })
    );

    return habits;
  } catch (error) {
    console.error("Failed to load habits:", error);

    return [];
  }
};


// Remove all saved habits.
// We'll mainly use this later for testing/reset functionality.
export const clearHabits = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(
      HABITS_STORAGE_KEY
    );
  } catch (error) {
    console.error("Failed to clear habits:", error);
  }
};
