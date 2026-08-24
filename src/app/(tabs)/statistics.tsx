import { useFocusEffect } from "expo-router";
import {
    BarChart3,
    Check,
    Flame,
    ListChecks,
} from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import {
    ScrollView,
    Text,
    View,
} from "react-native";

import { Card } from "@/components/ui/card";
import {
    Progress,
    ProgressFilledTrack,
} from "@/components/ui/progress";

import type { Habit } from "@/src/types/habit";
import {
    getToday,
    loadHabits,
} from "@/src/utils/habitStorage";

// --------------------------------------------------
// Date helpers
// --------------------------------------------------

const getDateOffset = (daysAgo: number) => {
  const date = new Date();

  date.setDate(
    date.getDate() - daysAgo
  );

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// --------------------------------------------------
// Statistics Screen
// --------------------------------------------------

export default function StatisticsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // --------------------------------------------------
  // Load statistics whenever screen is focused
  // --------------------------------------------------

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const loadStatistics = async () => {
        try {
          const savedHabits = await loadHabits();

          if (isMounted) {
            setHabits(savedHabits);
          }
        } catch (error) {
          console.error(
            "Failed to load statistics:",
            error
          );
        } finally {
          if (isMounted) {
            setIsLoaded(true);
          }
        }
      };

      loadStatistics();

      return () => {
        isMounted = false;
      };
    }, [])
  );

  // --------------------------------------------------
  // Today
  // --------------------------------------------------

  const today = getToday();

  const totalHabits = habits.length;

  const completedToday = habits.filter(
    (habit) =>
      habit.completedDates?.includes(today)
  ).length;

  const completionPercentage =
    totalHabits === 0
      ? 0
      : Math.round(
          (completedToday / totalHabits) * 100
        );

  // --------------------------------------------------
  // Weekly activity
  // --------------------------------------------------

  const week = useMemo(() => {
    return Array.from(
      { length: 7 },
      (_, index) => {
        const daysAgo = 6 - index;
        const date = getDateOffset(daysAgo);

        const dateObject = new Date();
        dateObject.setDate(
          dateObject.getDate() - daysAgo
        );

        const completedCount =
          habits.filter((habit) =>
            habit.completedDates?.includes(date)
          ).length;

        const percentage =
          totalHabits === 0
            ? 0
            : Math.round(
                (completedCount / totalHabits) *
                  100
              );

        return {
          date,
          day: dateObject.toLocaleDateString(
            "en-US",
            { weekday: "narrow" }
          ),
          completedCount,
          percentage,
          completed:
            completedCount > 0,
        };
      }
    );
  }, [habits, totalHabits]);

  const completedDays = week.filter(
    (day) => day.completed
  ).length;

  const weeklyCompletion =
    Math.round(
      (completedDays / 7) * 100
    );

  // --------------------------------------------------
  // Current streak
  // --------------------------------------------------

  const currentStreak = useMemo(() => {
    let streak = 0;

    for (let daysAgo = 0; ; daysAgo++) {
      const date = getDateOffset(daysAgo);

      const completed = habits.some(
        (habit) =>
          habit.completedDates?.includes(date)
      );

      if (!completed) {
        break;
      }

      streak++;
    }

    return streak;
  }, [habits]);

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background-50">
        <Text className="text-sm font-medium text-typography-500">
          Loading statistics...
        </Text>
      </View>
    );
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <ScrollView
      className="flex-1 bg-background-50"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-20"
    >
      <View className="px-5 pt-16">

        {/* Header */}

        <View className="mb-6">
          <Text className="text-xs font-bold tracking-wider text-primary-500">
            HABITLY
          </Text>

          <Text className="mt-1 text-3xl font-black text-typography-900">
            Statistics
          </Text>

          <Text className="mt-1 text-sm font-medium text-typography-500">
            Your progress at a glance.
          </Text>
        </View>

        {/* ------------------------------------------------ */}
        {/* TODAY */}
        {/* ------------------------------------------------ */}

        <Card className="rounded-2xl border border-outline-100 bg-background-0 p-4">

          <View className="flex-row items-center justify-between">

            <View>
              <Text className="text-[11px] font-bold tracking-wide text-typography-400">
                TODAY
              </Text>

              <View className="mt-1 flex-row items-baseline">
                <Text className="text-2xl font-black text-typography-900">
                  {completedToday}
                </Text>

                <Text className="ml-1 text-xs font-medium text-typography-500">
                  / {totalHabits}
                </Text>
              </View>
            </View>

            <Text className="text-2xl font-black text-primary-500">
              {completionPercentage}%
            </Text>

          </View>

          <Progress
            value={completionPercentage}
            className="mt-3 h-1"
          >
            <ProgressFilledTrack />
          </Progress>

        </Card>

        {/* ------------------------------------------------ */}
        {/* QUICK STATS */}
        {/* ------------------------------------------------ */}

        <View className="mt-3 flex-row gap-3">

          {/* Habits */}

          <Card className="flex-1 rounded-2xl border border-outline-100 bg-background-0 p-3.5">

            <View className="flex-row items-center">

              <View className="h-7 w-7 items-center justify-center rounded-lg bg-background-100">

                <ListChecks
                  size={15}
                  color="#52525b"
                  strokeWidth={2.3}
                />

              </View>

              <Text className="ml-2 text-[11px] font-bold text-typography-400">
                HABITS
              </Text>

            </View>

            <Text className="mt-2 text-xl font-black text-typography-900">
              {totalHabits}
            </Text>

          </Card>

          {/* Streak */}

          <Card className="flex-1 rounded-2xl border border-outline-100 bg-background-0 p-3.5">

            <View className="flex-row items-center">

              <View className="h-7 w-7 items-center justify-center rounded-lg bg-primary-100">

                <Flame
                  size={15}
                  color="#16a34a"
                  strokeWidth={2.3}
                />

              </View>

              <Text className="ml-2 text-[11px] font-bold text-typography-400">
                STREAK
              </Text>

            </View>

            <Text className="mt-2 text-xl font-black text-primary-500">
              {currentStreak}
            </Text>

          </Card>

        </View>

        {/* ------------------------------------------------ */}
        {/* WEEK */}
        {/* ------------------------------------------------ */}

        <Card className="mt-3 rounded-2xl border border-outline-100 bg-background-0 p-4">

          <View className="flex-row items-center justify-between">

            <View className="flex-row items-center">

              <View className="h-7 w-7 items-center justify-center rounded-lg bg-background-100">

                <BarChart3
                  size={15}
                  color="#52525b"
                  strokeWidth={2.3}
                />

              </View>

              <View className="ml-2">

                <Text className="text-sm font-bold text-typography-900">
                  This week
                </Text>

                <Text className="text-[11px] font-medium text-typography-400">
                  Last 7 days
                </Text>

              </View>

            </View>

            <Text className="text-sm font-black text-primary-500">
              {weeklyCompletion}%
            </Text>

          </View>

          {/* Days */}

          <View className="mt-4 flex-row justify-between">

            {week.map((item) => (
              <View
                key={item.date}
                className="items-center"
              >

                <View
                  className={`h-8 w-8 items-center justify-center rounded-full ${
                    item.completed
                      ? "bg-primary-500"
                      : "bg-background-100"
                  }`}
                >
                  {item.completed && (
                    <Check
                      size={14}
                      color="#000000"
                      strokeWidth={3}
                    />
                  )}
                </View>

                <Text className="mt-1 text-[10px] font-bold text-typography-400">
                  {item.day}
                </Text>

              </View>
            ))}

          </View>

          <Progress
            value={weeklyCompletion}
            className="mt-3 h-1"
          >
            <ProgressFilledTrack />
          </Progress>

        </Card>

        {/* ------------------------------------------------ */}
        {/* HABITS */}
        {/* ------------------------------------------------ */}

        <View className="mb-3 mt-7">

          <Text className="text-lg font-black text-typography-900">
            Your Habits
          </Text>

          <Text className="mt-0.5 text-xs font-medium text-typography-500">
            Today's overview.
          </Text>

        </View>

        {habits.length === 0 ? (
          <Card className="rounded-2xl border border-outline-100 bg-background-0 p-5">

            <Text className="text-center text-sm font-medium text-typography-500">
              No habits yet.
            </Text>

          </Card>
        ) : (
          <Card className="rounded-2xl border border-outline-100 bg-background-0 p-2">

            {habits.map((habit, index) => {

              const completed =
                habit.completedDates?.includes(
                  today
                ) ?? false;

              return (
                <View
                  key={habit.id}
                  className={`flex-row items-center px-2 py-2.5 ${
                    index !== habits.length - 1
                      ? "border-b border-outline-100"
                      : ""
                  }`}
                >

                  {/* Status */}

                  <View
                    className={`mr-3 h-7 w-7 items-center justify-center rounded-full ${
                      completed
                        ? "bg-primary-500"
                        : "border border-outline-300"
                    }`}
                  >
                    {completed && (
                      <Check
                        size={13}
                        color="#000000"
                        strokeWidth={3}
                      />
                    )}
                  </View>

                  {/* Name */}

                  <View className="flex-1">

                    <Text
                      numberOfLines={1}
                      className={`text-sm font-bold ${
                        completed
                          ? "text-typography-500 line-through"
                          : "text-typography-900"
                      }`}
                    >
                      {habit.title}
                    </Text>

                    <Text className="mt-0.5 text-[10px] font-medium text-typography-400">
                      {habit.frequency}
                    </Text>

                  </View>

                  {/* Status */}

                  <Text
                    className={`text-[11px] font-bold ${
                      completed
                        ? "text-primary-600"
                        : "text-typography-400"
                    }`}
                  >
                    {completed
                      ? "Done"
                      : "Pending"}
                  </Text>

                </View>
              );
            })}

          </Card>
        )}

        <View className="h-8" />

      </View>
    </ScrollView>
  );
}
