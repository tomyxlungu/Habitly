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
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Card className="rounded-2xl p-5">
      <Text className="text-lg font-semibold text-typography-900">
        Today's Progress
      </Text>

      <View className="mt-4 flex-row items-end">
        <Text className="text-4xl font-bold text-typography-900">
          {completed}
        </Text>

        <Text className="mb-1 ml-2 text-base text-typography-500">
          / {total} habits
        </Text>
      </View>

      <Progress value={percentage} className="mt-5">
        <ProgressFilledTrack />
      </Progress>

      <Text className="mt-2 text-sm text-typography-500">
        {Math.round(percentage)}% completed
      </Text>
    </Card>
  );
}