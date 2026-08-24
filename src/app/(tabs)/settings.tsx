import { Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-background-50 px-5 pt-16">
      <Text className="text-3xl font-black text-typography-900">
        Settings
      </Text>

      <Text className="mt-2 text-base text-typography-500">
        Customize your Habitly experience.
      </Text>
    </View>
  );
}