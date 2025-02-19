import dayjs from "dayjs";
import { HabitEntry } from "@prisma/client";

export function isCompletedToday(entries: HabitEntry[]): boolean {
  const today = dayjs().format('YYYY-MM-DD');
  return entries.some(entry => 
    dayjs(entry.date).format('YYYY-MM-DD') === today && entry.count > 0
  );
}