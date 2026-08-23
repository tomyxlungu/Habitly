import { Pressable, Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import type { Habit } from "@/types/habit";

type HabitCardProps = {
  habit: Habit;
  onToggle: (id: string) => void;
};

export default function HabitCard({
  habit,
  onToggle,
}: HabitCardProps) {
  return (
    <Card className="mb-3 rounded-4xl p-4">
      <View className="flex-row items-center">
        {/* Completion button */}
        <Pressable
          onPress={() => onToggle(habit.id)}
          className={`mr-4 h-7 w-7 items-center justify-center rounded-full border-3 ${
            habit.completed
              ? "border-primary-500 bg-primary-500"
              : "border-outline-300 text-gray-700"
          }`}
        >
          {habit.completed && (
            <Text className="text-sm font-bold text-black">
              ✓
            </Text>
          )}
        </Pressable>

        {/* Habit information */}
        <View className="flex-1">
          <Text
            className={`text-base font-semibold ${
              habit.completed
                ? "text-typography-400 line-through"
                : "text-typography-900"
            }`}
          >
            {habit.title}
          </Text>

          <Text className="mt-1 text-sm text-typography-500">
            {habit.frequency}
          </Text>
        </View>
      </View>
    </Card>
  );
}