import { Text, View } from "react-native";

export default function ProgressScreen() {
  return (
    <View className="flex-1 bg-background-50 px-5 pt-16">
      <Text className="text-3xl font-black text-typography-900">
        Progress
      </Text>

      <Text className="mt-2 text-base text-typography-500">
        See how consistently you're building your habits.
      </Text>
    </View>
  );
}