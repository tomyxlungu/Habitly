import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";

type HabitCardProps = {
  title: string;
  frequency: string;
  completed: boolean;
};

export default function HabitCard({
  title,
  frequency,
  completed,
}: HabitCardProps) {
  return (
    <Card className="mb-3 rounded-2xl p-4">
      <View className="flex-row items-center">
        {/* Completion button */}
        <View
          className={`mr-4 h-7 w-7 items-center justify-center rounded-full border-2 ${
            completed
              ? "border-primary-500 bg-primary-500"
              : "border-outline-300"
          }`}
        >
          {completed && (
            <Text className="text-sm font-bold text-white">
              ✓
            </Text>
          )}
        </View>

        {/* Habit information */}
        <View className="flex-1">
          <Text
            className={`text-base font-semibold ${
              completed
                ? "text-typography-400 line-through"
                : "text-typography-900"
            }`}
          >
            {title}
          </Text>

          <Text className="mt-1 text-sm text-typography-500">
            {frequency}
          </Text>
        </View>
      </View>
    </Card>
  );
}