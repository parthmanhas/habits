
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    request: NextRequest,
    { params }: { params: { habitId: string } }
) {
    try {
        const entries = await db.habitEntry.findMany({
            where: {
                habitId: params.habitId
            },
            select: {
                date: true,
                count: true
            }
        })
        return NextResponse.json(entries)
    } catch (error) {
        console.error(error); 
        return NextResponse.json(
            { error: "Failed to fetch habit entries" },
            { status: 500 }
        )
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { habitId: string } }
) {
    try {
        const { date } = await request.json()

        const existingEntry = await db.habitEntry.findFirst({
            where: {
                habitId: params.habitId,
                date: new Date(date)
            }
        })

        if (existingEntry) {
            // Increment existing entry
            const updated = await db.habitEntry.update({
                where: { id: existingEntry.id },
                data: { count: existingEntry.count + 1 }
            })
            return NextResponse.json(updated)
        }

        // Create new entry
        const entry = await db.habitEntry.create({
            data: {
                habitId: params.habitId,
                date: new Date(date),
                count: 1
            }
        })

        return NextResponse.json(entry)
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create habit entry" },
            { status: 500 }
        )
    }
}
