'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

export function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className={cn(
        "flex items-center gap-2 px-3 py-2",
        "text-white/60 hover:text-white/80",
        "transition-colors"
      )}
      aria-label="Sign out"
    >
      <LogOut className="w-4 h-4" />
      <span className="text-sm">Sign out</span>
    </button>
  );
}