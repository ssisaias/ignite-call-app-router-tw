/* eslint-disable camelcase */
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = {
  username: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  const session = await auth()

  if (!session?.user) return NextResponse.json(null, { status: 401 })

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
    return !blockedTimes.some((blockedTime) => {
      return dayjs(blockedTime.date).get('hour') === time
    })
  })

  return NextResponse.json({ availableTimes, possibleTimes })
}
