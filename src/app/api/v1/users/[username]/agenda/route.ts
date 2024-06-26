/* eslint-disable camelcase */
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

type Params = {
  username: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  const username = context.params.username
  const date = request.nextUrl.searchParams.get('date')

  if (!date) {
    return NextResponse.json(
      {
        message: 'Date is required',
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

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return NextResponse.json({ availability: [] })
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return NextResponse.json({ availability: [] })
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i
    },
  )

  const blockedTimes = await prisma.scheduling.findMany({
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = !blockedTimes.some((blockedTime) => {
      return dayjs(blockedTime.date).get('hour') === time
    })

    const isTimePast = referenceDate.set('hour', time).isBefore(new Date())

    return isTimeBlocked && !isTimePast
  })

  return NextResponse.json({ availableTimes, possibleTimes })
}
