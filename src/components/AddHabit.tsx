import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Input,
    InputField,
} from "@/components/ui/input";

import type {
    Habit,
    HabitFrequency,
} from "@/src/types/habit";

type AddHabitProps = {
  onAdd: (
    title: string,
    frequency: HabitFrequency
  ) => void;

  editingHabit: Habit | null;

  onCancelEdit: () => void;
};

export default function AddHabit({
  onAdd,
  editingHabit,
  onCancelEdit,
}: AddHabitProps) {
  // Stores the habit title typed by the user.
  const [title, setTitle] = useState("");

  // Stores the selected habit frequency.
  const [frequency, setFrequency] =
    useState<HabitFrequency>("Daily");

  // When a habit is selected for editing,
  // load its existing information into the form.
  useEffect(() => {
    if (editingHabit) {
      setTitle(editingHabit.title);
      setFrequency(editingHabit.frequency);
    }
  }, [editingHabit]);

  // Add a new habit or save changes to an existing habit.
  const handleAdd = () => {
    const trimmedTitle = title.trim();

    // Don't create an empty habit.
    if (!trimmedTitle) return;

    // Send the habit information back to HomeScreen.
    onAdd(trimmedTitle, frequency);

    // Reset the form.
    setTitle("");
    setFrequency("Daily");
  };

  // Cancel editing and reset the form.
  const handleCancelEdit = () => {
    setTitle("");
    setFrequency("Daily");
    onCancelEdit();
  };

  return (
    <Card className="mt-5 rounded-3xl p-5">

      {/* Heading */}
      <Text className="text-lg font-black text-typography-900">
        {editingHabit
          ? "Edit habit"
          : "Add a new habit"}
      </Text>

      {/* Description */}
      <Text className="mt-1 text-sm text-typography-500">
        {editingHabit
          ? "Make changes to your habit."
          : "Build something worth repeating."}
      </Text>

      {/* Habit Input */}
      <View className="mt-5">
        <Text className="mb-2 text-sm font-semibold text-typography-700">
          Habit
        </Text>

        <Input className="h-12 rounded-xl">
          <InputField
            placeholder="e.g. Read for 20 minutes"
            value={title}
            onChangeText={setTitle}
          />
        </Input>
      </View>

        
        {/* Frequency Selector */}
        <View className="mt-5">
        <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-typography-700">
            Frequency
            </Text>

            <Text className="text-xs font-medium text-typography-400">
            {frequency}
            </Text>
        </View>

        {/* Segmented Control */}
        <View className="flex-row rounded-2xl border border-outline-200 bg-background-100 p-1.5">

            {/* Daily */}
            <Pressable
            onPress={() => setFrequency("Daily")}
            className={`flex-1 items-center rounded-xl py-3 bg-black ${
                frequency === "Daily"
                ? "bg-primary-500"
                : "bg-transparent"
            }`}
            >
            <Text
                className={`text-sm font-bold ${
                frequency === "Daily"
                    ? "text-white"
                    : "text-typography-600"
                }`}
            >
                Daily
            </Text>

            <Text
                className={`mt-0.5 text-[10px] ${
                frequency === "Daily"
                    ? "text-white/70"
                    : "text-typography-400"
                }`}
            >
                Every day
            </Text>
            </Pressable>

            {/* Weekly */}
            <Pressable
            onPress={() => setFrequency("Weekly")}
            className={`flex-1 items-center rounded-xl py-3 bg-black ${
                frequency === "Weekly"
                ? "bg-primary-500"
                : "bg-transparent"
            }`}
            >
            <Text
                className={`text-sm font-bold ${
                frequency === "Weekly"
                    ? "text-white"
                    : "text-typography-600"
                }`}
            >
                Weekly
            </Text>

            <Text
                className={`mt-0.5 text-[10px] ${
                frequency === "Weekly"
                    ? "text-white/70"
                    : "text-typography-400"
                }`}
            >
                Once a week
            </Text>
            </Pressable>

            {/* Three times a week */}
            <Pressable
            onPress={() => setFrequency("3 times a week")}
            className={`flex-1 items-center rounded-xl py-3 bg-black ${
                frequency === "3 times a week"
                ? "bg-primary-500"
                : "bg-transparent"
            }`}
            >
            <Text
                className={`text-sm font-bold ${
                frequency === "3 times a week"
                    ? "text-white"
                    : "text-typography-600"
                }`}
            >
                3x Week
            </Text>

            <Text
                className={`mt-0.5 text-[10px] ${
                frequency === "3 times a week"
                    ? "text-white/70"
                    : "text-typography-400"
                }`}
            >
                Three times
            </Text>
            </Pressable>

        </View>
        </View>
        

      {/* Add / Save Button */}
      <Button
        className="mt-5 h-12 rounded-xl"
        onPress={handleAdd}
      >
        <ButtonText className="font-bold">
          {editingHabit
            ? "Save Changes"
            : "Add Habit"}
        </ButtonText>
      </Button>

      {/* Cancel Edit */}
      {editingHabit && (
        <Button
          variant="ghost"
          className="mt-2 h-11 rounded-xl"
          onPress={handleCancelEdit}
        >
          <ButtonText className="font-semibold text-typography-500">
            Cancel
          </ButtonText>
        </Button>
      )}

    </Card>
  );
}

