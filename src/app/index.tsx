import HabitCard from "@/src/components/HabitCard";
import ProgressCard from "@/src/components/ProgressCard";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background-50">
      <View className="px-5 pt-16 pb-10">

        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-typography-900">
            Hello Mr. Xlungu
          </Text>

          <Text className="mt-1 text-base text-typography-500">
            Thursday, August 20
          </Text>
        </View>

        {/* Progress */}
        <ProgressCard completed={3} total={5} />

        {/* Today's Habits */}
          <Text className="mt-8 mb-4 text-xl font-bold text-typography-900">
            Today's Habits
          </Text>

          <HabitCard
            title="Read for 20 minutes"
            frequency="Daily"
            completed={true}
          />
            <HabitCard
            title="Drink 2L of water"
            frequency="Daily"
            completed={false}
          />

          <HabitCard
            title="Exercise"
            frequency="3 times a week"
            completed={false}
          />
      </View>
    </ScrollView>
  );
}