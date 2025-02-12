'use client';

import { cn } from '@/app/page';
import { Info } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function InfoButton() {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Information about habit tracker"
            >
                <Info size={20} className="text-white/60" />
            </button>

            {isOpen && (
                <div className={cn(
                    "absolute z-50 p-4 text-sm bg-zinc-900 rounded-lg shadow-lg border border-white/10",
                    "w-[280px] sm:w-64", // Wider on mobile, normal on desktop
                    "right-0 sm:-translate-x-0 sm:-left-28", // Center on mobile, fixed position on desktop
                    "mt-2",
                    "max-w-[calc(100vw-2rem)]" // Prevent overflow on very small screens
                )}>
                    <ul className="space-y-2 text-white/60">
                        <li className="flex gap-2 items-start">
                            <span className="font-semibold">•</span>
                            <span>Press and hold to delete habit entries</span>
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="font-semibold">•</span>
                            <span>Press and hold the delete button to delete habit</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}