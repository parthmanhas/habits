import dayjs from "dayjs";
import { db } from "./db";

export async function getHabits(userId: string) {
  const habits = await db.habit.findMany({
    where: {
      userId
    },
    include: {
      entries: true
    }
  });
  
  const habitsWithCompletedToday = habits.map(habit => ({
    ...habit,
    completedToday: habit.entries.some(entry => dayjs(entry.date).isSame(new Date(), 'day'))
  }))
  return habitsWithCompletedToday;
}