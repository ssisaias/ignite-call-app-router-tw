/* eslint-disable camelcase */
'use server'
import dayjs from 'dayjs'
import z from 'zod'

import { prisma } from '../prisma'
import { actionClient } from '../safe-action'

const schema = z.object({
  username: z.string(),
  date: z.string(),
})

export interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export const getUserAgenda = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username, date } }) => {
    if (!date) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      return null
    }

    const referenceDate = dayjs(String(date))
    const isPastDate = referenceDate.endOf('day').isBefore(new Date())

    if (isPastDate) {
      return { availability: [] }
    }

    const userAvailability = await prisma.userTimeInterval.findFirst({
      where: {
        user_id: user.id,
        week_day: referenceDate.get('day'),
      },
    })

    if (!userAvailability) {
      return { availability: [] }
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

    return { availableTimes, possibleTimes }
  })
