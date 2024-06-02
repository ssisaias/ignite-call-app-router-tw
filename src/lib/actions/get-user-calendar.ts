/* eslint-disable camelcase */
'use server'
import dayjs from 'dayjs'
import { and, eq, gte, lte } from 'drizzle-orm'
import z from 'zod'

import { dz } from '../drizzle'
import { schedulings, user_time_intervals } from '../dz/migrations/schema'
import { actionClient } from '../safe-action'
import { getPublicUserInfo } from './get-user-info'

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

    const user = await getPublicUserInfo({ username })

    if (!user) {
      return null
    }

    const referenceDate = dayjs(String(date))
    const isPastDate = referenceDate.endOf('day').isBefore(new Date())

    if (isPastDate) {
      return { availability: [] }
    }

    const userAvailability = await dz
      .select()
      .from(user_time_intervals)
      .where(
        and(
          eq(user_time_intervals.user_id, user.data?.id ?? ''),
          eq(user_time_intervals.week_day, referenceDate.get('day')),
        ),
      )

    if (!userAvailability) {
      return { availability: [] }
    }

    const { time_start_in_minutes, time_end_in_minutes } = userAvailability[0]

    const startHour = time_start_in_minutes / 60
    const endHour = time_end_in_minutes / 60

    const possibleTimes = Array.from({ length: endHour - startHour }).map(
      (_, i) => {
        return startHour + i
      },
    )

    const blockedTimes = await dz
      .select()
      .from(schedulings)
      .where(
        and(
          gte(
            schedulings.date,
            String(referenceDate.set('hour', startHour).toDate().getTime()),
          ),
          lte(
            schedulings.date,
            String(referenceDate.set('hour', endHour).toDate().getTime()),
          ),
        ),
      )

    const availableTimes = possibleTimes.filter((time) => {
      return !blockedTimes.some((blockedTime) => {
        return dayjs(blockedTime.date).get('hour') === time
      })
    })

    return { availableTimes, possibleTimes }
  })
