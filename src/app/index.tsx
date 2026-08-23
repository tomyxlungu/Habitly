import { useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";

import AddHabit from "@/src/components/AddHabit";
import HabitCard from "@/src/components/HabitCard";
import ProgressCard from "@/src/components/ProgressCard";
import type { Habit, HabitFrequency } from "@/src/types/habit";

export default function HomeScreen() {
  // Stores all habits displayed on the screen.
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

  // Stores the habit the user wants to delete.
  const [selectedHabit, setSelectedHabit] =
    useState<Habit | null>(null);

  // Controls whether the delete dialog is visible.
  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  // Toggle a habit between completed and incomplete.
  const toggleHabit = (id: string) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  // Open the delete confirmation dialog.
  const openDeleteDialog = (habit: Habit) => {
    setSelectedHabit(habit);
    setShowDeleteDialog(true);
  };

  // Delete the selected habit.
  const deleteHabit = () => {
    if (!selectedHabit) return;

    setHabits((currentHabits) =>
      currentHabits.filter(
        (habit) => habit.id !== selectedHabit.id
      )
    );

    setShowDeleteDialog(false);
    setSelectedHabit(null);
  };

  // Count completed habits.
  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;

  // Add a new habit.
  const addHabit = (
    title: string,
    frequency: HabitFrequency
  ) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      title,
      frequency,
      completed: false,
    };

    setHabits((currentHabits) => [
      ...currentHabits,
      newHabit,
    ]);
  };

  return (
    <>
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

          {/* Habit list */}
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
              onLongPress={openDeleteDialog}
            />
          ))}

          {/* Add habit */}
          <AddHabit onAdd={addHabit} />
        </View>
      </KeyboardAwareScrollView>

      {/* Delete confirmation dialog */}
      <AlertDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <AlertDialogBackdrop />

        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <Text className="text-xl font-bold text-typography-900">
              Delete habit?
            </Text>
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text className="text-typography-500">
              You're about to delete{" "}
              <Text className="font-semibold text-typography-900">
                {selectedHabit?.title}
              </Text>.
            </Text>

            <Text className="mt-2 text-typography-500">
              This action can't be undone.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter className="gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              onPress={() => setShowDeleteDialog(false)}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>

            <Button
              variant="destructive"
              className="flex-1 rounded-xl"
              onPress={deleteHabit}
            >
              <ButtonText>Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}