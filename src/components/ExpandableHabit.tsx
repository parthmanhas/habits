'use client';

import { HabitTracker } from './HabitTracker';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableHabitProps {
  habit: {
    id: string;
    title: string;
    entries: any[];
  };
  index: number;
  totalHabits: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ExpandableHabit({ 
  habit, 
  index, 
  totalHabits, 
  isExpanded, 
  onToggle 
}: ExpandableHabitProps) {
  return (
    <div className={cn(
      "transition-all duration-300 ease-in-out",
      isExpanded ? "h-auto" : "h-24",
      "relative"
    )}>
      <div 
        className="flex items-center justify-between cursor-pointer p-4 hover:bg-white/5 rounded-t"
        onClick={onToggle}
      >
        <h2 className="text-xl font-semibold text-white/80">{habit.title}</h2>
        {isExpanded ? 
          <ChevronUp className="w-6 h-6 text-white/60" /> : 
          <ChevronDown className="w-6 h-6 text-white/60" />
        }
      </div>
      <div className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden",
        isExpanded ? "opacity-100" : "opacity-0 h-0"
      )}>
        <HabitTracker
          title={habit.title}
          habitId={habit.id}
          entries={habit.entries}
          className={cn(
            "pt-2",
            index === totalHabits - 1 && "border-none"
          )}
        />
      </div>
    </div>
  );
}