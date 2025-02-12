"use client";

import { createHabitEntry, deleteHabitEntry, updateHabit } from "@/app/actions";
import { cn } from "@/app/page";
import { HabitEntry } from "@prisma/client";
import assert from "assert";
import dayjs from "dayjs";
import { Sparkles } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export function HabitCell({ id: initialId, habitId, date, count: initialCount }: HabitEntry) {
    assert(habitId !== 'placeholder' || habitId, 'Habit ID is required');

    const [count, setCountState] = useState(initialCount);
    const [id, setId] = useState(initialId);
    const timerRef = useRef<NodeJS.Timeout>(null);
    const [isLongPress, setIsLongPress] = useState(false);

    const handleLongPress = useCallback(async () => {
        if (!id.includes('empty')) {
            const deleted = await deleteHabitEntry(id);
            if (deleted) {
                setCountState(0);
                setId(`${dayjs(date).format('YYYY-MM-DD')}-empty`);
            }
        }
    }, [id, date]);

    const startPressTimer = useCallback(() => {
        setIsLongPress(false);
        timerRef.current = setTimeout(() => {
            setIsLongPress(true);
            handleLongPress();
        }, 500); // 500ms for long press
    }, [handleLongPress]);

    const cancelPressTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);

    const handleCellClick = async () => {
        if (isLongPress) {
            setIsLongPress(false);
            return;
        }

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
    };

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
            onMouseDown={startPressTimer}
            onMouseUp={cancelPressTimer}
            onMouseLeave={cancelPressTimer}
            onTouchStart={startPressTimer}
            onTouchEnd={cancelPressTimer}
        >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {count || ''}
            </span>
            {count > 5 && (
                <span className="absolute -top-[6px] -right-[6px] text-yellow-400 text-xs">
                    <Sparkles size={12} fill="yellow" />
                </span>
            )}
        </div>
    );
}