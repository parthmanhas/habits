import { HabitEntry } from "@prisma/client";
import { HabitCell } from "./HabitCell";
import dayjs from "dayjs";
import { Asset } from "next/font/google";
import assert from "assert";

interface HabitTrackerProps {
    title: string;
    habitId: string;
    entries: HabitEntry[];
}

export function HabitTracker({ title = '', habitId, entries = [] }: HabitTrackerProps) {
    assert(title, 'Title is required');
    assert(habitId, 'Habit ID is required');

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
            <h2 className="text-xl font-semibold text-center">{title}</h2>
            <div className="mx-4 sm:mx-0 overflow-auto">
                <div className="flex gap-2 px-4 sm:px-0">
                    {Object.values(getDatesGroupedByMonth()).map((month, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-semibold">{month[0].date.toLocaleDateString('en', { month: 'short' }).toLocaleLowerCase()}</h3>
                            <div className="flex flex-wrap items-justify gap-1">
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
            </div>
        </div>
    );
}