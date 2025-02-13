"use client";

import { createHabitEntry, deleteHabitEntry, updateHabit } from "@/actions/actions";
import { cn } from "@/lib/utils";
import { HabitEntry } from "@prisma/client";
import assert from "assert";
import dayjs from "dayjs";
import { Sparkles } from "lucide-react";
import { useCallback, useRef, useState, useTransition } from "react";

export function HabitCell({ id: initialId, habitId, date, count: initialCount }: HabitEntry) {
    assert(habitId !== 'placeholder' || habitId, 'Habit ID is required');

    const [count, setCount] = useState(initialCount);
    const [id, setId] = useState(initialId);
    const timerRef = useRef<NodeJS.Timeout>(null);
    const [isLongPress, setIsLongPress] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleLongPress = useCallback(async () => {
        if (!id.includes('empty')) {
            // Optimistically update UI
            const previousCount = count;
            const previousId = id;
            setCount(0);
            setId(`${dayjs(date).format('YYYY-MM-DD')}-empty`);

            // Update server in transition
            startTransition(async () => {
                try {
                    const deleted = await deleteHabitEntry(id);
                    if (!deleted) {
                        // Revert on failure
                        setCount(previousCount);
                        setId(previousId);
                    }
                } catch (error) {
                    // Revert on error
                    setCount(previousCount);
                    setId(previousId);
                    console.error('Failed to delete entry:', error);
                }
            });
        }
    }, [id, date, count]);

    const handleCellClick = () => {
        if (isLongPress || isPending) {
            setIsLongPress(false);
            return;
        }

        if(dayjs(date).isAfter(new Date(), 'day')) {
            return;
        }

        const isNewEntry = id.includes('empty');
        const newCount = (count || 0) + 1;
        
        // Optimistically update UI
        setCount(newCount);
        
        // Update server in transition
        startTransition(async () => {
            try {
                const updatedEntry = isNewEntry
                    ? await createHabitEntry({ habitId, date, count: 1 })
                    : await updateHabit({ id, habitId, count: newCount });

                if (updatedEntry) {
                    if (isNewEntry) {
                        setId(updatedEntry.id);
                    }
                } else {
                    // Revert on failure
                    setCount(count);
                }
            } catch (error) {
                // Revert on error
                setCount(count);
                console.error('Failed to update entry:', error);
            }
        });
    };

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

    return (
        <div
            className={cn(
                "h-6 w-6 relative cursor-pointer border border-white/50 rounded sm:hover:bg-gray-100/80 text-xs",
                "transition-all duration-200",
                count === 0 && dayjs(date).isSame(new Date(), 'day') && "bg-yellow-500",
                count === 1 && "bg-green-500",
                count === 2 && "bg-green-600",
                count === 3 && "bg-green-700",
                count === 4 && "bg-green-800",
                count === 5 && "bg-green-900",
                count > 5 && "bg-red-500",
            )}
            onClick={handleCellClick}
            onMouseDown={!isPending ? startPressTimer : undefined}
            onMouseUp={!isPending ? cancelPressTimer : undefined}
            onMouseLeave={!isPending ? cancelPressTimer : undefined}
            onTouchStart={!isPending ? startPressTimer : undefined}
            onTouchEnd={!isPending ? cancelPressTimer : undefined}
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