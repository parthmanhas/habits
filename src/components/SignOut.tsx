'use client';

import { LogOut, Loader2 } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function SignOut() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={cn(
        "flex items-center gap-2 px-3 py-2",
        "text-white/60 hover:text-white/80",
        "transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed"
      )}
      aria-label="Sign out"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      <span className="text-sm">
        {isLoading ? 'Signing out...' : 'Sign out'}
      </span>
    </button>
  );
}