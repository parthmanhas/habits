import { cn } from "@/app/page";
import dayjs from "dayjs";
import { Sparkles } from "lucide-react";

type HabitEntry = {
    date: string;
    count: number;
};

interface HabitTrackerProps {
    title: string;
    entries: HabitEntry[]
}

export function HabitTracker({ title, entries }: HabitTrackerProps) {

    function getDatesGroupedByMonth(): Record<number, Date[]> {
        const currentYear = new Date().getFullYear();
        const datesGroupedByMonth: Record<number, Date[]> = {};

        for (let month = 0; month < 12; month++) {
            const daysInMonth = new Date(currentYear, month + 1, 0).getDate(); // Get the number of days in the current month
            const dates: Date[] = [];

            for (let day = 1; day <= daysInMonth; day++) {
                dates.push(new Date(currentYear, month, day)); // Create date for each day in the month
            }

            datesGroupedByMonth[month] = dates;
        }

        return datesGroupedByMonth;
    }

    const habitData: Record<string, number> = entries.reduce((acc: Record<string, number>, entry) => {
        acc[entry.date] = entry.count;
        return acc;
    }, {});

    return (
        <div className="space-y-4 w-full text-white/80 border-white/20 border-b pb-10">
            <h2 className="text-xl font-semibold text-center">{title}</h2>
            <div className="mx-4 sm:mx-0 overflow-auto">
                <div className="flex gap-2 px-4 sm:px-0">
                    {Object.values(getDatesGroupedByMonth()).map((month, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-semibold">{month[0].toLocaleDateString('en', { month: 'short' }).toLocaleLowerCase()}</h3>
                            <div className="flex flex-wrap items-justify gap-1">
                                {month.map((date, index) => (
                                    <div key={index} className={cn(
                                        "relative cursor-pointer p-2 border border-white/50 rounded hover:bg-gray-100/80 text-xs",
                                        habitData[date.toISOString().split('T')[0]] === 0 && dayjs(date).isSame(new Date(), 'day') && "bg-yellow-500",
                                        habitData[date.toISOString().split('T')[0]] === 1 && "bg-green-500",
                                        habitData[date.toISOString().split('T')[0]] === 2 && "bg-green-600",
                                        habitData[date.toISOString().split('T')[0]] === 3 && "bg-green-700",
                                        habitData[date.toISOString().split('T')[0]] === 4 && "bg-green-800",
                                        habitData[date.toISOString().split('T')[0]] === 5 && "bg-green-900",
                                        habitData[date.toISOString().split('T')[0]] > 5 && "bg-red-500",
                                    )}>
                                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{habitData[date.toISOString().split('T')[0]]}</span>
                                        {habitData[date.toISOString().split('T')[0]] > 5 && (
                                            <span className="absolute -top-1 -right-1 text-yellow-400 text-xs"><Sparkles size={12} fill="yellow" /></span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}