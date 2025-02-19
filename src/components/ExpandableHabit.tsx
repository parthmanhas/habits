'use client';

import { HabitTracker } from './HabitTracker';
import { cn } from '@/lib/utils';
import { CheckCircle2, ChevronDown, ChevronUp, Circle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ExpandableHabitProps {
    habit: {
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
    };
    index: number;
    totalHabits: number;
    isExpanded: boolean;
    onToggle: () => void;
}

export function ExpandableHabit({
    habit,
    index,
    totalHabits,
    isExpanded,
    onToggle
}: ExpandableHabitProps) {
    const [isLocallyCompleted, setIsLocallyCompleted] = useState(habit.completedToday);

    // Sync local state with prop when it changes
    useEffect(() => {
        setIsLocallyCompleted(habit.completedToday);
    }, [habit.completedToday]);

    const handleHabitCellUpdate = (newCount: number) => {
        // Update local completion status optimistically
        setIsLocallyCompleted(newCount > 0);
    };

    const completionIcon = isLocallyCompleted ? (
        <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : (
        <Circle className="w-5 h-5 text-white/20" />
    );

    return (
        <div className={cn(
            "transition-all duration-300 ease-in-out",
            isExpanded ? "h-auto" : "h-20",
            "relative overflow-x-auto"
        )}>
            <div
                className="flex items-center justify-between cursor-pointer p-4 hover:bg-white/5 rounded-t"
                onClick={onToggle}
            >
                <div className='flex items-center gap-2'>
                    {completionIcon}
                    <h2 className="text-xl font-semibold text-white/80">{habit.title}</h2>
                </div>
                {isExpanded ? <ChevronUp className="w-6 h-6 text-white/60" /> : <ChevronDown className="w-6 h-6 text-white/60" />}
            </div>
            <div className={cn(
                "transition-all duration-300 ease-in-out overflow-hidden",
                isExpanded ? "opacity-100" : "opacity-0 h-0"
            )}>
                <HabitTracker
                    title={habit.title}
                    habitId={habit.id}
                    entries={habit.entries}
                    className={cn(
                        "pt-2",
                        index === totalHabits - 1 && "border-none"
                    )} 
                    onHabitCellUpdate={handleHabitCellUpdate}
                />
            </div>
        </div>
    );
}