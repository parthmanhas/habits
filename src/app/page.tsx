import { AddHabit } from "@/components/AddHabit";
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
    <div className="min-h-screen p-8 bg-black">
      <main className="w-full mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white/80 text-center">habit tracker</h1>
        <AddHabit />
        <div className="flex flex-col gap-10">
          {habits.map(habit => 
          <HabitTracker
            key={habit.id}
            title={habit.title}
            habitId={habit.id}
            entries={habit.entries}
          />)}
        </div>
      </main>
    </div>
  );
}
