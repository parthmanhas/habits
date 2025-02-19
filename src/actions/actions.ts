'use server'

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { HabitEntry } from "@prisma/client";
import assert from "assert";
export async function updateHabit({ habitId, id, count }: Omit<HabitEntry, 'createdAt' | 'updatedAt' | 'date'>) {
    // Update your database or storage here
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
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
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
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

export async function deleteHabitEntry(id: string) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
    try {
        await db.habitEntry.delete({
            where: { id }
        });
        return true;
    } catch (error) {
        console.error('Error deleting habit entry:', error);
        return false;
    }
}

// create habit
export async function createHabit(title: string) {
    assert(title, 'Title is required');
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
    console.log('Creating habit:', title, session.user.id);
    try {
        const habit = await db.habit.create({
            data: {
                title,
                user: {
                    connect: {
                        id: session.user.id
                    }
                }
            }
        });
        return habit;
    } catch (error) {
        console.error('Error creating habit:', error);
        return null;
    }
}

//delete habit
export async function deleteHabit(habitId: string) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
    try {
        await db.habitEntry.deleteMany({
            where: { habitId: habitId }
        });
        await db.habit.delete({
            where: { id: habitId, userId: session.user.id }
        });
        return true;
    } catch (error) {
        console.error('Error deleting habit:', error);
        return false;
    }
}