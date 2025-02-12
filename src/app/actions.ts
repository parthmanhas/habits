'use server'

import { db } from "@/lib/db";
import { HabitEntry } from "@prisma/client";
import assert from "assert";
export async function updateHabit({ habitId, id, count }: Omit<HabitEntry, 'createdAt' | 'updatedAt' | 'date'>) {
    // Update your database or storage here
    console.log('Updating habit:', id, count);
    try {
        const entry = await db.habitEntry.update({
            where: {
                habitId,
                id
            },
            data: {
                count: count,

            }
        });
        return entry;
    } catch (error) {
        console.error('Error updating habit:', error);
        return null;
    }
}

//create habit entry
export async function createHabitEntry({ habitId, date, count }: Omit<HabitEntry, 'createdAt' | 'updatedAt' | 'id'>) {
    // Update your database or storage here
    assert(habitId !== 'placeholder', 'Habit ID is required');
    console.log('Creating habit entry:', date, count);
    try {
        const entry = await db.habitEntry.create({
            data: {
                habitId,
                date,
                count,
            }
        });
        return entry;
    } catch (error) {
        console.error('Error creating habit entry:', error);
        return null;
    }
}