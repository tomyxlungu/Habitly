import { useEffect, useState } from "react";
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

import {
  getToday,
  loadHabits,
  resetDailyHabits,
  saveHabits,
} from "@/src/utils/habitStorage";

// --------------------------------------------------
// Default habits
// --------------------------------------------------

const defaultHabits: Habit[] = [
  {
    id: "1",
    title: "Read for 20 minutes",
    frequency: "Daily",
    completed: false,
    completedDates: [],
  },
];

// --------------------------------------------------
// Home Screen
// --------------------------------------------------

export default function HomeScreen() {
  const [habits, setHabits] =
    useState<Habit[]>(defaultHabits);

  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedHabit, setSelectedHabit] =
    useState<Habit | null>(null);

  const [editingHabit, setEditingHabit] =
    useState<Habit | null>(null);

  const [showActionDialog, setShowActionDialog] =
    useState(false);

  // --------------------------------------------------
  // Load habits
  // --------------------------------------------------

  useEffect(() => {
    const loadSavedHabits = async () => {
      try {
        const savedHabits = await loadHabits();

        if (savedHabits.length > 0) {
          // Make sure old saved habits have
          // completedDates.
          const normalizedHabits = savedHabits.map(
            (habit) => ({
              ...habit,
              completedDates:
                habit.completedDates ?? [],
            })
          );

          // Reset today's completion state while
          // preserving all historical dates.
          const updatedHabits =
            resetDailyHabits(normalizedHabits);

          setHabits(updatedHabits);

          // Save the updated state immediately.
          await saveHabits(updatedHabits);
        }
      } catch (error) {
        console.error(
          "Failed to load habits:",
          error
        );
      } finally {
        setIsLoaded(true);
      }
    };

    loadSavedHabits();
  }, []);

  // --------------------------------------------------
  // Save habits
  // --------------------------------------------------

  useEffect(() => {
    if (!isLoaded) return;

    saveHabits(habits);
  }, [habits, isLoaded]);

  // --------------------------------------------------
  // Toggle habit
  // --------------------------------------------------

  const toggleHabit = (id: string) => {
    const today = getToday();

    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        if (habit.id !== id) {
          return habit;
        }

        const completedDates =
          habit.completedDates ?? [];

        const isCompletedToday =
          completedDates.includes(today);

        // ------------------------------------------
        // Uncomplete today's habit
        // ------------------------------------------

        if (isCompletedToday) {
          return {
            ...habit,
            completed: false,
            completedDates:
              completedDates.filter(
                (date) => date !== today
              ),
          };
        }

        // ------------------------------------------
        // Complete today's habit
        // ------------------------------------------

        return {
          ...habit,
          completed: true,
          completedDates: [
            ...completedDates,
            today,
          ],
        };
      })
    );
  };

  // --------------------------------------------------
  // Open habit actions
  // --------------------------------------------------

  const openHabitActions = (habit: Habit) => {
    setSelectedHabit(habit);
    setShowActionDialog(true);
  };

  // --------------------------------------------------
  // Edit habit
  // --------------------------------------------------

  const editHabit = () => {
    if (!selectedHabit) return;

    setEditingHabit(selectedHabit);

    setShowActionDialog(false);
    setSelectedHabit(null);
  };

  // --------------------------------------------------
  // Delete habit
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Completed habits
  // --------------------------------------------------

  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;

  // --------------------------------------------------
  // Add / Edit habit
  // --------------------------------------------------

  const addHabit = (
    title: string,
    frequency: HabitFrequency
  ) => {
    // ----------------------------------------------
    // Editing an existing habit
    // ----------------------------------------------

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

    // ----------------------------------------------
    // Create a new habit
    // ----------------------------------------------

    const newHabit: Habit = {
      id: Date.now().toString(),
      title,
      frequency,
      completed: false,
      completedDates: [],
    };

    setHabits((currentHabits) => [
      ...currentHabits,
      newHabit,
    ]);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <>
      <KeyboardAwareScrollView
        className="flex-1 bg-background-50"
        bottomOffset={50}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <View className="px-5 pt-16">

          {/* Header */}

          <View className="mb-7">
            <Text className="text-sm font-semibold text-primary-500">
              HABITLY
            </Text>

            <Text className="mt-1 text-3xl font-black text-typography-900">
              Hello, Mr. Xlungu
            </Text>

            <Text className="mt-1 text-base font-medium text-typography-500">
              {new Date().toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                }
              )}
            </Text>
          </View>

          {/* Progress */}

          <ProgressCard
            completed={completedHabits}
            total={habits.length}
          />

          {/* Today's Habits */}

          <Text className="mb-3 mt-7 text-xl font-bold text-typography-900">
            Today's Habits
          </Text>

          {/* Habit List */}

          {habits.length === 0 ? (
            <View className="items-center rounded-3xl border border-dashed border-outline-200 bg-background-0 px-5 py-8">
              <Text className="text-base font-bold text-typography-700">
                No habits yet
              </Text>

              <Text className="mt-1 text-center text-sm font-medium text-typography-500">
                Add your first habit below.
              </Text>
            </View>
          ) : (
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={toggleHabit}
                onLongPress={openHabitActions}
              />
            ))
          )}

          {/* Add / Edit Habit */}

          <AddHabit
            onAdd={addHabit}
            editingHabit={editingHabit}
            onCancelEdit={() =>
              setEditingHabit(null)
            }
          />

          <View className="h-8" />
        </View>
      </KeyboardAwareScrollView>

      {/* Habit Actions Dialog */}

      <AlertDialog
        isOpen={showActionDialog}
        onClose={() => {
          setShowActionDialog(false);
          setSelectedHabit(null);
        }}
      >
        <AlertDialogBackdrop />

        <AlertDialogContent className="rounded-3xl">

          <AlertDialogHeader>
            <View>
              <Text className="text-xl font-bold text-typography-900">
                {selectedHabit?.title}
              </Text>

              <Text className="mt-1 text-sm font-medium text-typography-500">
                What would you like to do?
              </Text>
            </View>
          </AlertDialogHeader>

          <AlertDialogBody>

            {/* Edit */}

            <Button
              variant="outline"
              className="mb-3 h-12 rounded-xl"
              onPress={editHabit}
            >
              <ButtonText className="font-bold">
                Edit Habit
              </ButtonText>
            </Button>

            {/* Delete */}

            <Button
              variant="destructive"
              className="h-12 rounded-xl"
              onPress={deleteHabit}
            >
              <ButtonText className="font-bold">
                Delete Habit
              </ButtonText>
            </Button>

          </AlertDialogBody>

          {/* Cancel */}

          <AlertDialogFooter>
            <Button
              variant="ghost"
              className="w-full rounded-xl"
              onPress={() => {
                setShowActionDialog(false);
                setSelectedHabit(null);
              }}
            >
              <ButtonText className="font-bold">
                Cancel
              </ButtonText>
            </Button>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}