'use client';

import { useState } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';
import { createHabit } from '@/actions/actions';
import { cn } from '@/lib/utils';

export function AddHabit() {

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim()) {
            setError('Please enter a habit name');
            return;
        }
        try {
            setIsLoading(true);
            await createHabit(title);
            setTitle('');
            setError('');
            setIsOpen(false);
        } catch (error) {
            setError('Failed to create habit');
            console.error('Failed to create habit:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md mx-auto flex flex-col items-center pb-5">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className={cn(
                        "flex items-center gap-2 text-white/80 hover:text-white",
                        "text-base sm:text-xl transition-colors"
                    )}
                >
                    <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>add new habit</span>
                </button>
            ) : (
                <form onSubmit={handleSubmit} className={cn(
                    "flex flex-col gap-2 w-full",
                    "w-[90vw] sm:w-auto max-w-md px-4 sm:px-0"
                )}>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setError('');
                            }}
                            placeholder="enter habit name..."
                            className={cn(
                                "flex-1 px-3 py-2 bg-white/10 rounded",
                                "text-white/80 text-base sm:text-lg",
                                "placeholder:text-white/40",
                                "focus:outline-none focus:ring-2",
                                error ? "ring-2 ring-red-500/50" : "focus:ring-white/20",
                                isLoading && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={isLoading}
                            autoFocus
                        />
                        <div className="flex gap-2 sm:flex-shrink-0">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    "flex items-center justify-center gap-2",
                                    "flex-1 sm:flex-initial px-4 py-2",
                                    "bg-white/10 rounded text-white/80",
                                    "hover:bg-white/20 transition-colors",
                                    "text-base sm:text-lg",
                                    "disabled:opacity-50 disabled:cursor-not-allowed"
                                )}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>adding...</span>
                                    </>
                                ) : (
                                    <span>add</span>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                disabled={isLoading}
                                className={cn(
                                    "flex-1 sm:flex-initial px-4 py-2",
                                    "bg-white/10 rounded text-white/80",
                                    "hover:bg-white/20 transition-colors",
                                    "text-base sm:text-lg",
                                    "disabled:opacity-50 disabled:cursor-not-allowed"
                                )}
                            >
                                cancel
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
            )}
        </div>
    );
}