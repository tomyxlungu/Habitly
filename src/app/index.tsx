import { useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";


import AddHabit from "@/src/components/AddHabit";
import HabitCard from "@/src/components/HabitCard";
import ProgressCard from "@/src/components/ProgressCard";
import type { Habit } from "@/src/types/habit";

export default function HomeScreen() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      title: "Read for 20 minutes",
      frequency: "Daily",
      completed: true,
    },
    {
      id: "2",
      title: "Drink 2L of water",
      frequency: "Daily",
      completed: false,
    },
    {
      id: "3",
      title: "Exercise",
      frequency: "3 times a week",
      completed: true,
    },
  ]);

  const toggleHabit = (id: string) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;

  const addHabit = (title: string) => {
  const newHabit: Habit = {
    id: Date.now().toString(),
    title,
    frequency: "Daily",
    completed: false,
  };

  setHabits((currentHabits) => [
    ...currentHabits,
    newHabit,
  ]);
};

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-background-50"
      bottomOffset={50}
      keyboardShouldPersistTaps="handled"
    >      
      <View className="px-5 pb-10 pt-16">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-black text-typography-900">
            Hello Mr. Xlungu
          </Text>

          <Text className="mt-1 text-base font-semibold text-typography-500">
            Thursday, August 20
          </Text>
        </View>

        {/* Progress */}
        <ProgressCard
          completed={completedHabits}
          total={habits.length}
        />

        {/* Today's Habits */}
        <Text className="mb-4 mt-8 text-xl font-bold text-typography-900">
          Today's Habits
        </Text>

        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={toggleHabit}
          />
        ))}

        <AddHabit onAdd={addHabit} />
      </View>
    </KeyboardAwareScrollView>
  );
}