'use server'

import { db } from "@/lib/db";
import { HabitEntry } from "@prisma/client";
export async function updateHabit({ habitId, id, count }: Omit<HabitEntry, 'createdAt' | 'updatedAt' | 'date'>) {
    // Update your database or storage here
    console.log('Updating habit:', id, count);
    try {
        await db.habitEntry.update({
            where: {
                habitId,
                id
            },
            data: {
                count: count,

            }
        });
        return true;
    } catch (error) {
        console.error('Error updating habit:', error);
        return false;
    }
}

//create habit entry
export async function createHabitEntry({ habitId, date, count }: Omit<HabitEntry, 'createdAt' | 'updatedAt' | 'id'>) {
    // Update your database or storage here
    console.log('Creating habit entry:', date, count);
    try {
        await db.habitEntry.create({
            data: {
                habitId,
                date,
                count,
            }
        });
        return true;
    } catch (error) {
        console.error('Error creating habit entry:', error);
        return false;
    }
}