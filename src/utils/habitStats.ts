import type { Habit } from "@/src/types/habit";

// --------------------------------------------------
// Date helpers
// --------------------------------------------------

export const getDateOffset = (
  daysAgo: number
): string => {
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
// Current streak
// --------------------------------------------------

export const getHabitStreak = (
  habit: Habit
): number => {
  let streak = 0;

  for (let daysAgo = 0; ; daysAgo++) {
    const date = getDateOffset(daysAgo);

    const completed =
      habit.completedDates?.includes(date) ??
      false;

    if (!completed) {
      break;
    }

    streak++;
  }

  return streak;
};

// --------------------------------------------------
// Best streak
// --------------------------------------------------

export const getBestHabitStreak = (
  habit: Habit
): number => {
  const dates = [
    ...(habit.completedDates ?? []),
  ].sort();

  if (dates.length === 0) {
    return 0;
  }

  let bestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const previousDate = new Date(
      `${dates[i - 1]}T00:00:00`
    );

    const currentDate = new Date(
      `${dates[i]}T00:00:00`
    );

    const difference =
      Math.round(
        (currentDate.getTime() -
          previousDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

    if (difference === 1) {
      currentStreak++;

      bestStreak = Math.max(
        bestStreak,
        currentStreak
      );
    } else if (difference > 1) {
      currentStreak = 1;
    }
  }

  return bestStreak;
};

// --------------------------------------------------
// Completion rate
// --------------------------------------------------

export const getHabitCompletionRate = (
  habit: Habit,
  days: number = 30
): number => {
  if (days <= 0) {
    return 0;
  }

  let completedDays = 0;

  for (
    let daysAgo = 0;
    daysAgo < days;
    daysAgo++
  ) {
    const date = getDateOffset(daysAgo);

    if (
      habit.completedDates?.includes(date)
    ) {
      completedDays++;
    }
  }

  return Math.round(
    (completedDays / days) * 100
  );
};

// --------------------------------------------------
// Today's completion
// --------------------------------------------------

export const isHabitCompletedToday = (
  habit: Habit
): boolean => {
  const today = getDateOffset(0);

  return (
    habit.completedDates?.includes(today) ??
    false
  );
};

// --------------------------------------------------
// Weekly activity
// --------------------------------------------------

export type HabitDayActivity = {
  date: string;
  completed: boolean;
};

export const getHabitWeeklyActivity = (
  habit: Habit
): HabitDayActivity[] => {
  return Array.from(
    { length: 7 },
    (_, index) => {
      const daysAgo = 6 - index;
      const date = getDateOffset(daysAgo);

      return {
        date,
        completed:
          habit.completedDates?.includes(
            date
          ) ?? false,
      };
    }
  );
};