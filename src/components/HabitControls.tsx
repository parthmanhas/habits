'use client';

import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitControlsProps {
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export function HabitControls({ onExpandAll, onCollapseAll }: HabitControlsProps) {
  return (
    <div className="flex justify-center gap-2 mb-4">
      <button
        onClick={onExpandAll}
        className={cn(
          "flex items-center px-3 py-1.5 text-sm rounded",
          "border border-white/20 text-white/80",
          "transition-colors duration-200",
          "hover:bg-white/5 active:bg-white/10",
          "focus:outline-none focus:ring-2 focus:ring-white/20"
        )}
      >
        <ChevronDown className="w-4 h-4 mr-1" />
        Expand All
      </button>
      <button
        onClick={onCollapseAll}
        className={cn(
          "flex items-center px-3 py-1.5 text-sm rounded",
          "border border-white/20 text-white/80",
          "transition-colors duration-200",
          "hover:bg-white/5 active:bg-white/10",
          "focus:outline-none focus:ring-2 focus:ring-white/20"
        )}
      >
        <ChevronUp className="w-4 h-4 mr-1" />
        Collapse All
      </button>
    </div>
  );
}