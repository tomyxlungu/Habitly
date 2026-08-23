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
import type {
  Habit,
  HabitFrequency,
} from "@/src/types/habit";

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

  // Stores the habit selected during a long press.
  const [selectedHabit, setSelectedHabit] =
    useState<Habit | null>(null);

  // Stores the habit currently being edited.
  const [editingHabit, setEditingHabit] =
    useState<Habit | null>(null);

  // Controls the action dialog.
  const [showActionDialog, setShowActionDialog] =
    useState(false);

  // Toggle a habit.
  const toggleHabit = (id: string) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
            }
          : habit
      )
    );
  };

  // Open the action dialog.
  const openHabitActions = (habit: Habit) => {
    setSelectedHabit(habit);
    setShowActionDialog(true);
  };

  // Start editing a habit.
  const editHabit = () => {
    if (!selectedHabit) return;

    setEditingHabit(selectedHabit);
    setShowActionDialog(false);
    setSelectedHabit(null);
  };

  // Delete a habit.
  const deleteHabit = () => {
    if (!selectedHabit) return;

    setHabits((currentHabits) =>
      currentHabits.filter(
        (habit) => habit.id !== selectedHabit.id
      )
    );

    setShowActionDialog(false);
    setSelectedHabit(null);
  };

  // Count completed habits.
  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;

  // Add or edit a habit.
  const addHabit = (
    title: string,
    frequency: HabitFrequency
  ) => {
    // Edit existing habit.
    if (editingHabit) {
      setHabits((currentHabits) =>
        currentHabits.map((habit) =>
          habit.id === editingHabit.id
            ? {
                ...habit,
                title,
                frequency,
              }
            : habit
        )
      );

      setEditingHabit(null);

      return;
    }

    // Create new habit.
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

  // Close the action dialog.
  const closeActionDialog = () => {
    setShowActionDialog(false);
    setSelectedHabit(null);
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
              onLongPress={openHabitActions}
            />
          ))}

          {/* Add / Edit habit */}
          <AddHabit
            onAdd={addHabit}
            editingHabit={editingHabit}
            onCancelEdit={() =>
              setEditingHabit(null)
            }
          />

        </View>
      </KeyboardAwareScrollView>

      {/* Habit action dialog */}
      <AlertDialog
        isOpen={showActionDialog}
        onClose={closeActionDialog}
      >
        <AlertDialogBackdrop />

        <AlertDialogContent className="rounded-[28px] p-5">

          {/* Header */}
          <AlertDialogHeader className="pb-2">
            <View className="w-full">

              {/* Small indicator */}
              <View className="mb-4 h-1.5 w-10 self-center rounded-full bg-outline-300" />

              <Text className="text-xs font-bold uppercase tracking-wider text-typography-400">
                Habit options
              </Text>

              <Text
                numberOfLines={2}
                className="mt-2 text-2xl font-black text-typography-900"
              >
                {selectedHabit?.title}
              </Text>

              {selectedHabit && (
                <View className="mt-3 self-start rounded-full bg-background-100 px-3 py-1.5">
                  <Text className="text-xs font-semibold text-typography-500">
                    {selectedHabit.frequency}
                  </Text>
                </View>
              )}

            </View>
          </AlertDialogHeader>

          {/* Actions */}
          <AlertDialogBody className="pt-4">

            {/* Edit */}
            <Button
              variant="outline"
              className="mb-3 h-14 rounded-2xl border-outline-200"
              onPress={editHabit}
            >
              <ButtonText className="text-base font-bold text-typography-900">
                Edit Habit
              </ButtonText>
            </Button>

            {/* Delete */}
            <Button
              variant="destructive"
              className="h-14 rounded-2xl"
              onPress={deleteHabit}
            >
              <ButtonText className="text-base font-bold">
                Delete Habit
              </ButtonText>
            </Button>

          </AlertDialogBody>

          {/* Cancel */}
          <AlertDialogFooter className="pt-2">
            <Button
              variant="ghost"
              className="h-12 w-full rounded-2xl"
              onPress={closeActionDialog}
            >
              <ButtonText className="font-bold text-typography-500">
                Cancel
              </ButtonText>
            </Button>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
