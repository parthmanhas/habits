import { HabitTracker } from "@/components/HabitTracker";

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function Home() {
  return (
    <div className="grid grid-col-12 min-h-screen p-8 bg-black">
      <main className="lg:col-span-10 mx-auto">
        <h1 className="text-3xl font-bold mb-8">Habit Tracker</h1>
        <div className="flex flex-col gap-10">
          <HabitTracker title="meditation" />
        </div>
      </main>
    </div>
  );
}
