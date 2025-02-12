"use client";

import { createHabitEntry, updateHabit } from "@/app/actions";
import { cn } from "@/app/page";
import { HabitEntry } from "@prisma/client";
import dayjs from "dayjs";
import { create } from "domain";
import { Sparkles } from "lucide-react";
import { useCallback, useRef } from "react";

export function HabitCell({ id, habitId, date, count }: HabitEntry) {
    const longPressTimer = useRef<NodeJS.Timeout>();

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

    const handleCellClick = () => {
        // if id contains empty then it is a new entry
        if (id.includes('empty')) {
            createHabitEntry({ habitId, date, count: 1 });
        } else {
            updateHabit({ id, habitId, count: (count || 0) + 1 });            

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