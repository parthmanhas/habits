'use client';

import { useState } from 'react';
import { ExpandableHabit } from './ExpandableHabit';
import { HabitControls } from './HabitControls';

type HabitsWithStatus = {
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
}[]

interface HabitListProps {
    habits: HabitsWithStatus;
}

export function HabitList({ habits }: HabitListProps) {
    const [expandedHabits, setExpandedHabits] = useState<Set<string>>(
        new Set([habits[0]?.id])
    );

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
                {habits.map((habit, index) => (
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