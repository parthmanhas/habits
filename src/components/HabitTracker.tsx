import { HabitEntry } from "@prisma/client";
import { HabitCell } from "./HabitCell";
import dayjs from "dayjs";
import assert from "assert";
import { DeleteHabit } from "./DeleteHabit";
import { cn } from "@/lib/utils";

interface HabitTrackerProps {
    title: string;
    habitId: string;
    entries: HabitEntry[];
}

export function HabitTracker({ title = '', habitId, entries = [] }: HabitTrackerProps) {
    assert(title, 'Title is required');
    assert(habitId, 'Habit ID is required');

    function getMonthGroups() {
        const months = Object.values(getDatesGroupedByMonth());
        const groups = [];

        for (let i = 0; i < months.length; i += 3) {
            groups.push(months.slice(i, i + 3));
        }

        return groups;
    }

    function getDatesGroupedByMonth(): Record<number, HabitEntry[]> {
        const currentYear = new Date().getFullYear();
        const datesGroupedByMonth: Record<number, HabitEntry[]> = {};

        // Create a map of existing entries for quick lookup
        const entryMap = new Map(
            entries.map(entry => [
                dayjs(entry.date).format('YYYY-MM-DD'),
                entry
            ])
        );

        for (let month = 0; month < 12; month++) {
            const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
            const habitEntries: HabitEntry[] = [];

            for (let day = 1; day <= daysInMonth; day++) {
                const currentDate = new Date(currentYear, month, day);
                const dateKey = dayjs(currentDate).format('YYYY-MM-DD');

                // Look up existing entry or create a new one
                const existingEntry = entryMap.get(dateKey);
                const habitEntry: HabitEntry = existingEntry || {
                    id: `${dateKey}-empty`,
                    date: currentDate,
                    count: 0,
                    habitId,
                    createdAt: currentDate,
                    updatedAt: currentDate
                };

                habitEntries.push(habitEntry);
            }

            datesGroupedByMonth[month] = habitEntries;
        }

        return datesGroupedByMonth;
    }

    return (
        <div className="space-y-4 w-full text-white/80 border-white/20 border-b pb-10">
            <div className="flex justify-center gap-2 items-center">
                <h2 className="text-xl font-semibold text-center">{title}</h2>
                <DeleteHabit habitId={habitId} />
            </div>
            <div className="mx-4 sm:mx-0 overflow-x-auto snap-x snap-mandatory sm:snap-none scrollbar py-5 ">
                <div className="flex gap-4 sm:before:hidden sm:after:hidden before:content-[''] before:flex-[0_0_50%] after:content-[''] after:flex-[0_0_50%]">
                    {getMonthGroups().map((group, groupIndex) => (
                        <div
                            key={groupIndex}
                            className={cn(
                                "flex mx-10 sm:mx-0 flex-col sm:flex-row snap-center sm:snap-none gap-4",
                            )}>
                            {group.map((month, monthIndex) => (
                                <div key={monthIndex} className="flex-1 min-w-[200px]">
                                    <h3 className="text- text-center font-semibold mb-2">
                                        {month[0].date.toLocaleDateString('en', { month: 'short' }).toLocaleLowerCase()}
                                    </h3>
                                    <div className="flex flex-wrap gap-1">
                                        {month.map((data, index) => (
                                            <HabitCell
                                                key={index}
                                                {...data}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}