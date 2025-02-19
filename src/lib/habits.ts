import dayjs from "dayjs";
import { db } from "./db";

export async function getHabits(userId: string) {
  const today = dayjs().format('YYYY-MM-DD');
  const habits = await db.habit.findMany({
    where: {
      userId
    },
    include: {
      entries: true
    }
  });
  return habits.map(habit => ({
    ...habit,
    completedToday: habit.entries.some(entry =>
      dayjs(entry.date).format('YYYY-MM-DD') === today && entry.count > 0
    ),
  }));
}