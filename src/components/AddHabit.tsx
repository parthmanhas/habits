'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { createHabit } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Session } from 'next-auth';
import assert from 'assert';

export function AddHabit({ session }: { session: Session }) {

    assert(session, 'Session is required');
    assert(session.user, 'User is required');
    assert(session.user.id, 'User ID is required');

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        if (!session.user?.id) {
            console.error('User ID is required');
            return;
        };
        await createHabit(title, session.user.id);
        setTitle('');
        setIsOpen(false);
    }

    return (
        <div className="w-full max-w-md mx-auto flex justify-center pb-5">
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
                    "flex flex-col sm:flex-row gap-2",
                    "w-[90vw] sm:w-auto max-w-md px-4 sm:px-0"
                )}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="enter habit name..."
                        className={cn(
                            "flex-1 px-3 py-2 bg-white/10 rounded",
                            "text-white/80 text-base sm:text-lg",
                            "placeholder:text-white/40",
                            "focus:outline-none focus:ring-2 focus:ring-white/20"
                        )}
                        autoFocus
                    />
                    <div className="flex gap-2 sm:flex-shrink-0">
                        <button
                            type="submit"
                            className={cn(
                                "flex-1 sm:flex-initial px-4 py-2",
                                "bg-white/10 rounded text-white/80",
                                "hover:bg-white/20 transition-colors",
                                "text-base sm:text-lg"
                            )}
                        >
                            add
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "flex-1 sm:flex-initial px-4 py-2",
                                "bg-white/10 rounded text-white/80",
                                "hover:bg-white/20 transition-colors",
                                "text-base sm:text-lg"
                            )}
                        >
                            cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}