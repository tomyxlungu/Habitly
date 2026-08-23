import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import {
  Progress,
  ProgressFilledTrack,
} from "@/components/ui/progress";

type ProgressCardProps = {
  completed: number;
  total: number;
};

export default function ProgressCard({
  completed,
  total,
}: ProgressCardProps) {
  // Calculate the completion percentage.
  const percentage =
    total > 0 ? (completed / total) * 100 : 0;

  const roundedPercentage = Math.round(percentage);

  // Choose an encouraging message based on progress.
  const getMessage = () => {
    if (total === 0) {
      return "Add your first habit to get started.";
    }

    if (roundedPercentage === 100) {
      return "Amazing! You completed everything today.";
    }

    if (roundedPercentage >= 75) {
      return "Almost there. Keep going!";
    }

    if (roundedPercentage >= 50) {
      return "You're halfway there. Keep it up!";
    }

    if (roundedPercentage > 0) {
      return "Good start. Keep building momentum.";
    }

    return "Ready to build a better day?";
  };

  return (
    <Card className="rounded-[28px] p-5">

      {/* Header */}
      <View className="flex-row items-start justify-between">

        <View>
          <Text className="text-lg font-black text-typography-900">
            Today's Progress
          </Text>

          <Text className="mt-1 text-sm text-typography-500">
            Keep your streak alive.
          </Text>
        </View>

        {/* Percentage */}
        <View className="items-end">
          <Text className="text-2xl font-black text-primary-500">
            {roundedPercentage}%
          </Text>

          <Text className="text-xs font-medium text-typography-400">
            complete
          </Text>
        </View>

      </View>

      {/* Completed habits */}
      <View className="mt-6 flex-row items-end">

        <Text className="text-4xl font-black text-typography-900">
          {completed}
        </Text>

        <Text className="mb-1.5 ml-2 text-base font-medium text-typography-500">
          / {total} habits
        </Text>

      </View>

      {/* Progress bar */}
      <Progress
        value={percentage}
        className="mt-4 h-3 overflow-hidden rounded-full"
      >
        <ProgressFilledTrack className="rounded-full" />
      </Progress>

      {/* Message */}
      <View className="mt-4 rounded-2xl bg-background-100 px-4 py-3">
        <Text className="text-sm font-semibold text-typography-600">
          {getMessage()}
        </Text>
      </View>

    </Card>
  );
}

