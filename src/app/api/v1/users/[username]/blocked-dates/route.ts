/* eslint-disable camelcase */
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

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

  return NextResponse.json({ blockedWeekDays })
}
