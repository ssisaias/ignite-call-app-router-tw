import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeMinutes: z.number(),
      endTimeMinutes: z.number(),
    }),
  ),
})

export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session?.user) return NextResponse.json(null, { status: 401 })

  const reqBody = await req.json()
  const { intervals } = timeIntervalsBodySchema.parse(reqBody)

  await prisma.userTimeInterval.createMany({
    data: intervals.map((interval) => ({
      user_id: session.user!.id!,
      week_day: interval.weekDay,
      time_start_in_minutes: interval.startTimeMinutes,
      time_end_in_minutes: interval.endTimeMinutes,
    })),
  })

  return NextResponse.json(null, { status: 201 })
}
