import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, InputField } from "@/components/ui/input";

import type { HabitFrequency } from "@/src/types/habit";

type AddHabitProps = {
  onAdd: (title: string, frequency: HabitFrequency) => void;
};

export default function AddHabit({ onAdd }: AddHabitProps) {
  // Stores the habit title typed by the user.
  const [title, setTitle] = useState("");

  // Stores the selected habit frequency.
  const [frequency, setFrequency] =
    useState<HabitFrequency>("Daily");

  // Runs when the user presses "Add Habit".
  const handleAdd = () => {
    const trimmedTitle = title.trim();

    // Don't create an empty habit.
    if (!trimmedTitle) return;

    // Send both values back to HomeScreen.
    onAdd(trimmedTitle, frequency);

    // Reset the form.
    setTitle("");
    setFrequency("Daily");
  };

  return (
    <Card className="mt-5 rounded-3xl p-5">
      {/* Heading */}
      <Text className="text-lg font-black text-typography-900">
        Add a new habit
      </Text>

      <Text className="mt-1 text-sm text-typography-500">
        Build something worth repeating.
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
        <Text className="mb-2 text-sm font-semibold text-typography-700">
          Frequency
        </Text>

        {/* Segmented Control */}
        <View className="flex-row rounded-2xl bg-background-100 p-1">
          <Pressable
            onPress={() => setFrequency("Daily")}
            className={`flex-1 rounded-xl py-3 ${
              frequency === "Daily"
                ? "bg-primary"
                : "bg-transparent"
            }`}
          >
            <Text
              className={`text-center text-sm font-semibold ${
                frequency === "Daily"
                  ? "text-white"
                  : "text-typography-600"
              }`}
            >
              Daily
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setFrequency("Weekly")}
            className={`flex-1 rounded-xl py-3 ${
              frequency === "Weekly"
                ? "bg-primary"
                : "bg-transparent"
            }`}
          >
            <Text
              className={`text-center text-sm font-semibold ${
                frequency === "Weekly"
                  ? "text-white"
                  : "text-typography-600"
              }`}
            >
              Weekly
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setFrequency("3 times a week")}
            className={`flex-1 rounded-xl py-3 ${
              frequency === "3 times a week"
                ? "bg-primary"
                : "bg-transparent"
            }`}
          >
            <Text
              className={`text-center text-sm font-semibold ${
                frequency === "3 times a week"
                  ? "text-white"
                  : "text-typography-600"
              }`}
            >
              3x Week
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Add Button */}
      <Button
        className="mt-5 h-12 rounded-xl"
        onPress={handleAdd}
      >
        <ButtonText className="font-bold">
          Add Habit
        </ButtonText>
      </Button>
    </Card>
  );
}