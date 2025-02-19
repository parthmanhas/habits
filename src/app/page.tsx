import { AddHabit } from "@/components/AddHabit";
import { InfoButton } from "@/components/InfoButton";
import { SignIn } from "@/components/SignIn";
import { auth } from "@/lib/auth";
import { SignOut } from "@/components/SignOut";
import { getHabits } from "@/lib/habits";
import { HabitList } from "@/components/HabitList";
import { isCompletedToday } from "@/lib/habitUtils";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="min-h-screen p-8 bg-black">
        <main className="w-full mx-auto">
          <div className="flex justify-center items-center gap-2 mb-8">
            <h1 className="text-3xl font-bold text-white/80">habits</h1>
          </div>
          <SignIn />
        </main>
      </div>
    );
  }

  if (!session.user.id) {
    throw new Error('User ID is required');
  }
  const habits = await getHabits(session.user.id);

  const habitsWithStatus = habits
    .map(habit => ({
      ...habit,
      completedToday: isCompletedToday(habit.entries)
    }))
    .sort((a, b) => {
      if (a.completedToday === b.completedToday) {
        return 0;
      }
      return a.completedToday ? 1 : -1;
    });

  return (
    <div className="min-h-screen p-8 bg-black">
      <main className="w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-white/80">habits</h1>
            <InfoButton />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>Today:</span>
              <span className="text-white/80">
                {habitsWithStatus.filter(h => h.completedToday).length}/{habits.length}
              </span>
              completed
            </div>
            <SignOut />
          </div>
        </div>
        <AddHabit />
        {habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-40 text-white/60">
            <p className="text-lg text-center">No habits tracked yet</p>
            <p className="text-sm text-center">Click the &quot;add new habit&quot; button above to get started</p>
          </div>
        ) : (
          <HabitList habits={habitsWithStatus} />
        )}
      </main>
    </div>
  );
}
