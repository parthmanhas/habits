'use client';

import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';

export function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-20">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-white/80">Welcome to Habit Tracker</h2>
        <p className="text-white/60">Sign in to start tracking your habits</p>
      </div>
      
      <button
        onClick={() => signIn('google')}
        className={cn(
          "flex items-center gap-3 px-6 py-3",
          "bg-white/10 hover:bg-white/20",
          "text-white/80 rounded-lg transition-colors"
        )}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          />
        </svg>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}