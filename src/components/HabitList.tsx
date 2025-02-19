'use client';

import { useState, useMemo } from 'react';
import { ExpandableHabit } from './ExpandableHabit';
import { HabitControls } from './HabitControls';
import dayjs from 'dayjs';
import { ArrowUp } from 'lucide-react';

type Habit = {
    entries: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        count: number;
        habitId: string;
    }[];
    id: string;
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface HabitListProps {
    habits: Habit[];
}

export function HabitList({ habits }: HabitListProps) {
    const [expandedHabits, setExpandedHabits] = useState<Set<string>>(new Set());
    const [sortAscending, setSortAscending] = useState(false);

    const habitsWithCompletedToday = habits.map(habit => ({
        ...habit,
        completedToday: habit.entries.some(entry => 
            dayjs(entry.date).isSame(new Date(), 'day')
        )
    }));

    // Sort habits based on completion and sort direction
    const sortedHabits = useMemo(() => {
        return [...habitsWithCompletedToday].sort((a, b) => {
            if (a.completedToday === b.completedToday) {
                return 0;
            }
            return sortAscending 
                ? (a.completedToday ? -1 : 1)
                : (a.completedToday ? 1 : -1);
        });
    }, [habitsWithCompletedToday, sortAscending]);

    const handleExpandAll = () => {
        setExpandedHabits(new Set(sortedHabits.map(habit => habit.id)));
    };

    const handleCollapseAll = () => {
        setExpandedHabits(new Set());
    };

    const toggleHabit = (habitId: string) => {
        setExpandedHabits(current => {
            const newSet = new Set(current);
            if (newSet.has(habitId)) {
                newSet.delete(habitId);
            } else {
                newSet.add(habitId);
            }
            return newSet;
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <HabitControls
                    onExpandAll={handleExpandAll}
                    onCollapseAll={handleCollapseAll}
                />
                <button
                    onClick={() => setSortAscending(!sortAscending)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm rounded
                             border border-white/20 text-white/80
                             transition-colors duration-200
                             hover:bg-white/5 active:bg-white/10"
                >
                    {sortAscending ? (
                        <>
                            Completed First
                            <ArrowUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            Incomplete First
                            <ArrowUp className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
            <div className="flex flex-col">
                {sortedHabits.map((habit, index) => (
                    <div key={habit.id} className="flex items-center gap-2">
                        <ExpandableHabit
                            habit={habit}
                            index={index}
                            totalHabits={habits.length}
                            isExpanded={expandedHabits.has(habit.id)}
                            onToggle={() => toggleHabit(habit.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}