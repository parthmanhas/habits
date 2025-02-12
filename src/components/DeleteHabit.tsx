'use client';

import { deleteHabit } from '@/app/actions';
import { Trash2 } from 'lucide-react';
import { useState, useCallback, useRef } from 'react';

interface DeleteHabitProps {
    habitId: string;
}

export function DeleteHabit({ habitId }: DeleteHabitProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>(null);

    const handlePressStart = useCallback(() => {
        timerRef.current = setTimeout(async () => {
            try {
                setIsDeleting(true);
                await deleteHabit(habitId);
            } catch (error) {
                console.error('Failed to delete habit:', error);
            } finally {
                setIsDeleting(false);
            }
        }, 1000); // 1 second press to delete
    }, [habitId]);

    const handlePressEnd = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);

    return (
        <button
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            disabled={isDeleting}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Delete habit"
        >
            <Trash2
                size={16}
                className={isDeleting ? 'text-red-500 animate-pulse' : 'text-white/40'}
            />
        </button>
    );
}