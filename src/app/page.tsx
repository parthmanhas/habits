import { HabitTracker } from "@/components/HabitTracker";
import { db } from "@/lib/db";

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//get all habits from db include entries
export async function getHabits() {
  const habits = await db.habit.findMany({
    include: {
      entries: true
    }
  });
  return habits;
}

export default async function Home() {
  const habits = await getHabits();
  return (
    <div className="grid grid-col-12 min-h-screen p-8 bg-black">
      <main className="lg:col-span-10 mx-auto">
        <h1 className="text-3xl font-bold mb-8">Habit Tracker</h1>
        <div className="flex flex-col gap-10">
          {habits.map(habit => 
          <HabitTracker
            title={habit.title}
            habitId={habit.id}
            entries={habit.entries}
          />)}
        </div>
      </main>
    </div>
  );
}
