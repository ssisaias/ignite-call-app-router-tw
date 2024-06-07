'use server'
import { and, Column, eq, gte, lte, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import z from 'zod'
import { createServerAction } from 'zsa'

import { dz } from '../drizzle'
// eslint-disable-next-line camelcase
import { schedulings, user_time_intervals } from '../dz/migrations/schema'
import { prisma } from '../prisma'

const schema = z.object({
  username: z.string(),
  year: z.string(),
  month: z.string(),
})

function getDay(col: Column) {
  return sql<string>`STRFTIME('%d',${col}/1000,'unixepoch')`
}

function getWeekDay(col: Column) {
  return sql<string>`STRFTIME('%w',${col}/1000,'unixepoch')`
}

export const getUserBlockedDates = createServerAction()
  .input(schema)
  .handler(async ({ input: { username, year, month } }) => {
    if (!year || !month) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      return null
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
      .leftJoin(
        UTI,
        and(
          eq(getWeekDay(schedulings.date), UTI.week_day),
          eq(UTI.user_id, user.id),
        ),
      )
      .where(
        and(
          eq(schedulings.user_id, user.id),
          and(
            gte(schedulings.date, String(startDateMsEpoch)),
            lte(schedulings.date, String(endDateMsEpoch)),
          ),
        ),
      )
      .groupBy(({ cDay }) => cDay)
      .having(({ amount, size }) => gte(amount, size))

    const blockedDates = blockedWeekDatesRaw.map(({ cDay }) => Number(cDay))

    return { blockedWeekDays, blockedDates }
  })
