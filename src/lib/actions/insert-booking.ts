'use server'
import dayjs from 'dayjs'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { dz } from '@/lib/drizzle'
import { schedulings, users } from '@/lib/dz/migrations/schema'

import { actionClient } from '../safe-action'

const createSchedulingSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  observations: z.string(),
  date: z.string().datetime(),
})

export const CreateSchedule = actionClient
  .schema(createSchedulingSchema)
  .action(
    async ({ parsedInput: { username, name, email, observations, date } }) => {
      const user = await dz
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1)

      if (!user || user.length === 0) {
        return {
          message: 'User not found',
          status: 404,
        }
      }

      const unixDate = dayjs(date).unix() + '000'

      const schedulingDate = dayjs(date).startOf('hour')

      if (schedulingDate.isBefore(new Date())) {
        return {
          message: 'Invalid date - date is in the past',
          status: 404,
        }
      }

      const conflictingScheduling = await dz
        .select()
        .from(schedulings)
        .where(
          and(
            eq(schedulings.user_id, user[0].id),
            eq(schedulings.date, unixDate),
          ),
        )
        .limit(1)

      if (conflictingScheduling.length > 0) {
        return {
          message: 'Invalid date - date is already scheduled',
          status: 404,
        }
      }

      const row = await dz
        .insert(schedulings)
        .values({
          name,
          email,
          observations,
          date: unixDate,
          user_id: user[0].id,
        })
        .returning()

      return {
        message: 'Scheduling created',
        status: 201,
        data: row,
      }
    },
  )
