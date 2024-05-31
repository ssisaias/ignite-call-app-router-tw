/* eslint-disable camelcase */
import dayjs from 'dayjs'
import { and, eq, gt, lt } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { dz } from '@/lib/drizzle'
import { schedulings } from '@/lib/dz/migrations/schema'
import { prisma } from '@/lib/prisma'

type Params = {
  username: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  const username = context.params.username
  const year = request.nextUrl.searchParams.get('year')
  const month = request.nextUrl.searchParams.get('month')

  if (!year || !month) {
    return NextResponse.json(
      {
        message: 'Year and month are required',
      },
      { status: 400 },
    )
  }

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return NextResponse.json(
      {
        message: 'User not found',
      },
      { status: 404 },
    )
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some((availableWeekDay) => {
      return availableWeekDay.week_day === weekDay
    })
  })

  const startDate = `${year}-${month}-01`
  const startDateMsEpoch = new Date(startDate).getTime()
  const endDate = `${year}-${month}-31`
  const endDateMsEpoch = new Date(endDate).getTime()

  const blockedWeekDatesRaw = await dz
    .select()
    .from(schedulings)
    .where(
      and(
        eq(schedulings.user_id, user.id),
        and(
          gt(schedulings.date, String(startDateMsEpoch)),
          lt(schedulings.date, String(endDateMsEpoch)),
        ),
      ),
    )

  console.log(blockedWeekDatesRaw)

  return NextResponse.json({ blockedWeekDays, blockedWeekDatesRaw })
}
