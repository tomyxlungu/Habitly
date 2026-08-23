import { Pressable, Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import type { Habit } from "@/src/types/habit";

type HabitCardProps = {
  habit: Habit;
  onToggle: (id: string) => void;
  onLongPress: (habit: Habit) => void;
};

export default function HabitCard({
  habit,
  onToggle,
  onLongPress,
}: HabitCardProps) {
  // Get today's date in the same format used
  // inside completedDates.
  const today = new Date().toISOString().split("T")[0];

  // Check if this habit has been completed today.
  const completedToday =
    habit.completedDates.includes(today);

  return (
    <Pressable
      onLongPress={() => onLongPress(habit)}
      delayLongPress={500}
      className="active:opacity-80"
    >
      <Card
        className={`mb-3 rounded-3xl border p-4 ${
          completedToday
            ? "border-primary-100 bg-primary-50"
            : "border-outline-100 bg-background-0"
        }`}
      >
        <View className="flex-row items-center">

          {/* Completion button */}
          <Pressable
            onPress={() => onToggle(habit.id)}
            className={`mr-4 h-9 w-9 items-center justify-center rounded-full border-2 ${
              completedToday
                ? "border-primary-500 bg-primary-500"
                : "border-outline-300 bg-background-0"
            }`}
          >
            {completedToday ? (
              <Text className="text-base font-black text-black">
                ✓
              </Text>
            ) : null}
          </Pressable>

          {/* Habit information */}
          <View className="flex-1">

            {/* Habit title */}
            <Text
              numberOfLines={1}
              className={`text-base font-bold ${
                completedToday
                  ? "text-typography-500 line-through"
                  : "text-typography-900"
              }`}
            >
              {habit.title}
            </Text>

            {/* Frequency badge */}
            <View className="mt-2 self-start rounded-lg bg-background-100 px-2.5 py-1">
              <Text className="text-xs font-semibold text-typography-500">
                {habit.frequency}
              </Text>
            </View>

          </View>

          {/* Completed label */}
          {completedToday && (
            <View className="ml-3 rounded-full bg-primary-100 px-2.5 py-1">
              <Text className="text-xs font-bold text-primary-600">
                Done
              </Text>
            </View>
          )}

        </View>
      </Card>
    </Pressable>
  );
}
