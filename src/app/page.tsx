import { AddHabit } from "@/components/AddHabit";
import { HabitTracker } from "@/components/HabitTracker";
import { InfoButton } from "@/components/InfoButton";
import { SignIn } from "@/components/SignIn";
import { auth } from "@/lib/auth";
import { SignOut } from "@/components/SignOut";
import { getHabits } from "@/lib/habits";
import { cn } from "@/lib/utils";

export default async function Home() {
  // const session = await auth();

  // if (!session?.user) {
  //   return (
  //     <div className="min-h-screen p-8 bg-black">
  //       <main className="w-full mx-auto">
  //         <div className="flex justify-center items-center gap-2 mb-8">
  //           <h1 className="text-3xl font-bold text-white/80">habits</h1>
  //         </div>
  //         <SignIn />
  //       </main>
  //     </div>
  //   );
  // }

  // if (!session.user.id) {
  //   throw new Error('User ID is required');
  // }

  const session = {
    user: {
      id: "cm71x4g360000a8u0i4obrxbd"
    }
  }
  const habits = await getHabits(session.user.id);

  return (
    <div className="min-h-screen p-8 bg-black">
      <main className="w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-white/80">habits</h1>
            <InfoButton />
          </div>
          <SignOut />
        </div>
        <AddHabit session={session} />
        {habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-40 text-white/60">
            <p className="text-lg text-center">No habits tracked yet</p>
            <p className="text-sm text-center">Click the &quot;add new habit&quot; button above to get started</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10 sm:gap-0">
            {habits.map((habit, index) =>
              <HabitTracker
                key={habit.id}
                title={habit.title}
                habitId={habit.id}
                entries={habit.entries}
                className={cn(
                  index === 0 && "sm:pt-[10vh]",
                  index > 0 && "m-auto sm:pt-[25vh] h-[90vh]",
                  index === habits.length - 1 && "border-none"
                )}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
