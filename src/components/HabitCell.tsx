"use client";

import { createHabitEntry, updateHabit } from "@/app/actions";
import { cn } from "@/app/page";
import { HabitEntry } from "@prisma/client";
import assert from "assert";
import dayjs from "dayjs";
import { Sparkles } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export function HabitCell({ id: initialId, habitId, date, count: initialCount }: HabitEntry) {
    assert(habitId !== 'placeholder' || habitId, 'Habit ID is required');
    const longPressTimer = useRef<NodeJS.Timeout>();

    const [count, setCountState] = useState(initialCount);
    const [id, setId] = useState(initialId);

    const handleMouseDown = useCallback(() => {
        longPressTimer.current = setTimeout(() => {
            updateHabit({ id, habitId, count: 0 });
        }, 500); // 500ms for long press
    }, [habitId, id]);

    const handleMouseUp = useCallback(() => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            updateHabit({ id, habitId, count: (count || 0) + 1 });
        }
    }, [count, habitId, id]);

    const handleMouseLeave = useCallback(() => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
        }
    }, []);

    const handleCellClick = async () => {
        const isNewEntry = id.includes('empty');
        const updatedEntry = isNewEntry
            ? await createHabitEntry({ habitId, date, count: 1 })
            : await updateHabit({ id, habitId, count: (count || 0) + 1 });

        if (updatedEntry) {
            setCountState(updatedEntry.count);
            if (isNewEntry) {
                setId(updatedEntry.id);
            }
        }
    }

    return (
        <div
            className={cn(
                "relative cursor-pointer p-2 border border-white/50 rounded hover:bg-gray-100/80 text-xs",
                count === 0 && dayjs(date).isSame(new Date(), 'day') && "bg-yellow-500",
                count === 1 && "bg-green-500",
                count === 2 && "bg-green-600",
                count === 3 && "bg-green-700",
                count === 4 && "bg-green-800",
                count === 5 && "bg-green-900",
                count > 5 && "bg-red-500",
            )}
            onClick={handleCellClick}
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onMouseLeave={handleMouseLeave}
        // onTouchStart={handleMouseDown}
        // onTouchEnd={handleMouseUp}
        >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {count || ''}
            </span>
            {count > 5 && (
                <span className="absolute -top-1 -right-1 text-yellow-400 text-xs">
                    <Sparkles size={12} fill="yellow" />
                </span>
            )}
        </div>
    );
}