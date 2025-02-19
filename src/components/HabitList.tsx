'use client';

import { useState, useMemo } from 'react';
import { ExpandableHabit } from './ExpandableHabit';
import { HabitControls } from './HabitControls';
import dayjs from 'dayjs';

type Habit = {
    completedToday: boolean;
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

    const habitsWithCompletedToday = habits.map(habit => ({
        ...habit,
        completedToday: habit.entries.some(entry => dayjs(entry.date).isSame(new Date(), 'day'))
    }))

    console.log(habitsWithCompletedToday)

    const [expandedHabits, setExpandedHabits] = useState<Set<string>>(new Set());

    // Sort habits with incomplete first using useMemo
    const sortedHabits = useMemo(() => {
        return [...habits].sort((a, b) => {
            if (a.completedToday === b.completedToday) {
                return 0;
            }
            return a.completedToday ? 1 : -1;
        });
    }, [habits]);


    const handleExpandAll = () => {
        setExpandedHabits(new Set(habits.map(habit => habit.id)));
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
            <HabitControls
                onExpandAll={handleExpandAll}
                onCollapseAll={handleCollapseAll}
            />
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