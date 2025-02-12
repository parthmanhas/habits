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
  return habits;
}