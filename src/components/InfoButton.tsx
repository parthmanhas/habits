'use client';

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
                <div className="absolute z-50 w-64 p-4 text-sm bg-zinc-900 rounded-lg shadow-lg -left-28 mt-2 border border-white/10">
                    <ul className="space-y-2 text-white/60">
                        <li>press and hold to delete habit entries</li>
                        <li>press and hold the delete button to delete habit</li>
                    </ul>
                </div>
            )}
        </div>
    );
}