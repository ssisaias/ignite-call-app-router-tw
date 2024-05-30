'use server'
import z from 'zod'

import { prisma } from '../prisma'
import { actionClient } from '../safe-action'

const schema = z.object({
  username: z.string(),
  year: z.string(),
  month: z.string(),
})

interface BlockedDates {
  blockedWeekDays: number[]
}

export const getUserBlockedDates = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username, year, month } }) => {
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

    return { blockedWeekDays }
  })
