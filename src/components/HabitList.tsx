'use client';

import { useState, useMemo } from 'react';
import { ExpandableHabit } from './ExpandableHabit';
import { HabitControls } from './HabitControls';
import dayjs from 'dayjs';
import { motion } from "framer-motion";

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
            return a.completedToday ? 1 : -1;
        });
    }, [habitsWithCompletedToday]);

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
            <div className="flex justify-center sm:justify-end items-center">
                <HabitControls
                    onExpandAll={handleExpandAll}
                    onCollapseAll={handleCollapseAll}
                />
            </div>
            <div className="flex flex-col">
                {sortedHabits.map((habit, index) => (
                    <motion.div
                        key={habit.id}
                        className="flex items-center gap-2"
                        layout // Enables smooth position animation
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <ExpandableHabit
                            habit={habit}
                            index={index}
                            totalHabits={habits.length}
                            isExpanded={expandedHabits.has(habit.id)}
                            onToggle={() => toggleHabit(habit.id)}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}