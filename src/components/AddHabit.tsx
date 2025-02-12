'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { createHabit } from '@/app/actions';

export function AddHabit() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await createHabit(title);
        setTitle('');
    }

    return (
        <div className="w-full max-w-md mx-auto flex justify-center pb-5 text-xl">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 text-white/80 hover:text-white"
                >
                    <PlusCircle size={20} />
                    <span>add new habit</span>
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="enter habit name..."
                        className="flex-1 px-3 py-2 bg-white/10 rounded text-white/80"
                        autoFocus
                    />
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-white/10 rounded text-white/80 hover:bg-white/20"
                    >
                        add
                    </button>
                    <button 
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-white/10 rounded text-white/80 hover:bg-white/20"
                    >
                        cancel
                    </button>
                </form>
            )}
        </div>
    );
}