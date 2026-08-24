import { Tabs } from "expo-router";
import {
    BarChart3,
    Home,
    Settings,
    Target,
} from "lucide-react-native";
import { Platform, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#18181b",
        tabBarInactiveTintColor: "#a1a1aa",

        // The actual native tab bar fills the screen,
        // but its background is transparent.
        tabBarStyle: {
          position: "absolute",

          bottom: Platform.OS === "ios" ? 14 : 12,

          height: 72,

          backgroundColor: "transparent",

          borderTopWidth: 0,

          elevation: 0,

          shadowOpacity: 0,

          paddingHorizontal: 24,
          paddingTop: 6,
          paddingBottom: 6,
        },

        // This creates the actual floating navigation surface.
        tabBarBackground: () => (
          <View
            style={{
              position: "absolute",

              left: 24,
              right: 24,

              top: 0,
              bottom: 0,

              borderRadius: 26,

              backgroundColor: "#ffffff",

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.10,
              shadowRadius: 16,

              elevation: 10,
            }}
          />
        ),

        tabBarItemStyle: {
          flex: 1,
          borderRadius: 18,
          marginHorizontal: 3,
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          marginTop: 2,
        },

        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, focused }) => (
            <Home
              size={22}
              color={color}
              strokeWidth={focused ? 2.6 : 2}
            />
          ),
        }}
      />

      {/* PROGRESS */}
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",

          tabBarIcon: ({ color, focused }) => (
            <Target
              size={22}
              color={color}
              strokeWidth={focused ? 2.6 : 2}
            />
          ),
        }}
      />

      {/* STATISTICS */}
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",

          tabBarIcon: ({ color, focused }) => (
            <BarChart3
              size={22}
              color={color}
              strokeWidth={focused ? 2.6 : 2}
            />
          ),
        }}
      />

      {/* SETTINGS */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",

          tabBarIcon: ({ color, focused }) => (
            <Settings
              size={22}
              color={color}
              strokeWidth={focused ? 2.6 : 2}
            />
          ),
        }}
      />
    </Tabs>
  );
}