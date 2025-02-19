'use client';

import { useState } from 'react';
import { ExpandableHabit } from './ExpandableHabit';
import { HabitControls } from './HabitControls';

interface Habit {
  id: string;
  title: string;
  entries: any[];
}

interface HabitListProps {
  habits: Habit[];
}

export function HabitList({ habits }: HabitListProps) {
  const [expandedHabits, setExpandedHabits] = useState<Set<string>>(
    new Set([habits[0]?.id])
  );

  const handleExpandAll = () => {
    setExpandedHabits(new Set(habits.map(habit => habit.id)));
  };

  const handleCollapseAll = () => {
    setExpandedHabits(new Set());
  };

  const toggleHabit = (habitId: string) => {
    setExpandedHabits(current => {
      const newSet = new Set(current);
      if (newSet.has(habitId)) {
        newSet.delete(habitId);
      } else {
        newSet.add(habitId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      <HabitControls 
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />
      <div className="flex flex-col gap-4">
        {habits.map((habit, index) => (
          <ExpandableHabit
            key={habit.id}
            habit={habit}
            index={index}
            totalHabits={habits.length}
            isExpanded={expandedHabits.has(habit.id)}
            onToggle={() => toggleHabit(habit.id)}
          />
        ))}
      </div>
    </div>
  );
}