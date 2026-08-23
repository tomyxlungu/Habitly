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
  loadHabits,
  saveHabits,
} from "@/src/utils/habitStorage";

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

// These are the habits shown the first time
// the user opens Habitly.
const defaultHabits: Habit[] = [
  {
    id: "1",
    title: "Read for 20 minutes",
    frequency: "Daily",
    completedDates: [getToday()],
  },
];

export default function HomeScreen() {
  // Stores all habits displayed on the screen.
  const [habits, setHabits] = useState<Habit[]>(
    defaultHabits
  );

  // Keeps track of whether we've finished loading
  // habits from AsyncStorage.
  const [isLoaded, setIsLoaded] = useState(false);

  // Stores the habit selected during a long press.
  const [selectedHabit, setSelectedHabit] =
    useState<Habit | null>(null);

  // Stores the habit currently being edited.
  const [editingHabit, setEditingHabit] =
    useState<Habit | null>(null);

  // Controls the action dialog.
  const [showActionDialog, setShowActionDialog] =
    useState(false);

  // Load saved habits when the screen opens.
  useEffect(() => {
    const loadSavedHabits = async () => {
      const savedHabits = await loadHabits();

      // If saved habits exist, use them.
      //
      // If there aren't any saved habits yet,
      // keep our default habits.
      if (savedHabits.length > 0) {
        setHabits(savedHabits);
      }

      // Tell the app that loading is finished.
      setIsLoaded(true);
    };

    loadSavedHabits();
  }, []);

  // Save habits whenever the habits state changes.
  //
  // We wait until loading has finished so that
  // the default habits don't overwrite saved data.
  useEffect(() => {
    if (!isLoaded) return;

    saveHabits(habits);
  }, [habits, isLoaded]);

  // Toggle a habit between completed and incomplete.
  const toggleHabit = (id: string) => {
    const today = getToday();

    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        // If this isn't the habit we clicked,
        // leave it unchanged.
        if (habit.id !== id) {
          return habit;
        }

        // Check whether this habit is already
        // completed today.
        const isCompletedToday =
          habit.completedDates.includes(today);

        // If completed today, remove today's date.
        if (isCompletedToday) {
          return {
            ...habit,
            completedDates:
              habit.completedDates.filter(
                (date) => date !== today
              ),
          };
        }

        // Otherwise, add today's date.
        return {
          ...habit,
          completedDates: [
            ...habit.completedDates,
            today,
          ],
        };
      })
    );
  };

  // Open the action dialog when a habit
  // is long pressed.
  const openHabitActions = (habit: Habit) => {
    setSelectedHabit(habit);
    setShowActionDialog(true);
  };

  // Start editing the selected habit.
  const editHabit = () => {
    if (!selectedHabit) return;

    setEditingHabit(selectedHabit);
    setShowActionDialog(false);
    setSelectedHabit(null);
  };

  // Delete the selected habit.
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
  const today = getToday();

  const completedHabits = habits.filter(
    (habit) => habit.completedDates.includes(today)
  ).length;

  // Add a new habit OR update an existing habit.
  const addHabit = (
    title: string,
    frequency: HabitFrequency
  ) => {
    // If we're editing an existing habit,
    // update that habit.
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

    // Otherwise create a new habit.
    const newHabit: Habit = {
      id: Date.now().toString(),
      title,
      frequency,
      completedDates: [],
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
            <Text className="text-sm font-semibold text-primary-500">
              HABITLY
            </Text>

            <Text className="mt-1 text-3xl font-black text-typography-900">
              Hello, Mr. Xlungu
            </Text>

            <Text className="mt-1 text-base font-medium text-typography-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
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

      {/* Habit actions dialog */}
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

              <Text className="mt-1 text-sm text-typography-500">
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
