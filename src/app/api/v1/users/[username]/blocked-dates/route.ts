/* eslint-disable camelcase */
import { and, Column, eq, gt, gte, lt, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { NextRequest, NextResponse } from 'next/server'

import { dz } from '@/lib/drizzle'
import { schedulings, user_time_intervals } from '@/lib/dz/migrations/schema'
import { prisma } from '@/lib/prisma'

type Params = {
  username: string
}

function getDay(col: Column) {
  return sql<string>`STRFTIME('%d',${col}/1000,'unixepoch')`
}

function getWeekDay(col: Column) {
  return sql<string>`STRFTIME('%w',${col}/1000,'unixepoch')`
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

  const UTI = alias(user_time_intervals, 'UTI')
  const blockedWeekDatesRaw = await dz
    .select({
      cDay: getDay(schedulings.date).as('cDay'),
      amount: sql<number>`COUNT(*)`.as('amount'),
      size: sql<string>`(UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60`.as(
        'size',
      ),
    })
    .from(schedulings)
    .leftJoin(UTI, eq(getWeekDay(schedulings.date), UTI.week_day))
    .where(
      and(
        eq(schedulings.user_id, user.id),
        and(
          gt(schedulings.date, String(startDateMsEpoch)),
          lt(schedulings.date, String(endDateMsEpoch)),
        ),
      ),
    )
    .groupBy(({ cDay }) => cDay)
    .having(({ amount, size }) => gte(amount, size))

  const blockedDates = blockedWeekDatesRaw.map(({ cDay }) => Number(cDay))

  return NextResponse.json({ blockedWeekDays, blockedDates })
}
