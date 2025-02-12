import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const habits = await db.habit.findMany({
            include: {
                entries: {
                    select: {
                        date: true,
                        count: true
                    },
                    orderBy: {
                        date: 'desc'
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(habits)
    } catch (error) {
        console.error('Failed to fetch habits:', error)
        return NextResponse.json(
            { error: "Failed to fetch habits" },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const { title } = await request.json()
        
        if (!title || typeof title !== 'string') {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            )
        }

        const habit = await db.habit.create({
            data: { title },
            include: {
                entries: true
            }
        })

        return NextResponse.json(habit)
    } catch (error) {
        console.error('Failed to create habit:', error)
        return NextResponse.json(
            { error: "Failed to create habit" },
            { status: 500 }
        )
    }
}
