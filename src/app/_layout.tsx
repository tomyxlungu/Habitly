import "../../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <GluestackUIProvider mode="light">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </GluestackUIProvider>
    </KeyboardProvider>
  );
}