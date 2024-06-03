'use server'
import { AxiosError } from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import { and, eq } from 'drizzle-orm'
// eslint-disable-next-line camelcase
import { calendar_v3, google } from 'googleapis'
import { z } from 'zod'
import { createServerAction } from 'zsa'

import { dz } from '@/lib/drizzle'
import { schedulings, users } from '@/lib/dz/migrations/schema'

import { getGoogleOAuthToken } from '../google'

const createSchedulingSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  observations: z.string(),
  date: z.string().datetime(),
})

async function insertIntoCalendar(
  // eslint-disable-next-line camelcase
  calendarRef: calendar_v3.Calendar,
  reqId: string,
  schedulingDate: Dayjs,
  observations: string,
  email: string,
  displayName: string,
) {
  await calendarRef.events
    .insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Ignite Call: ${displayName}`,
        description: observations,
        start: {
          dateTime: schedulingDate.format(),
        },
        end: {
          dateTime: schedulingDate.add(1, 'hour').format(),
        },
        attendees: [{ email, displayName }],
        conferenceData: {
          createRequest: {
            requestId: reqId,
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
    })
    .catch((err) => {
      throw err
    })
}

export const CreateSchedule = createServerAction()
  .input(createSchedulingSchema)
  .handler(async ({ input: { username, name, email, observations, date } }) => {
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

    const calendar = google.calendar({
      version: 'v3',
      auth: await getGoogleOAuthToken(user[0].id),
    })

    try {
      await insertIntoCalendar(
        calendar,
        row[0].id,
        schedulingDate,
        observations,
        email,
        name,
      )
    } catch (err: unknown) {
      console.error(err)

      const error = err as Error | AxiosError | { status: number }

      if (!('status' in error)) throw error

      if (error.status === 401) {
        const newCalendar = google.calendar({
          version: 'v3',
          auth: await getGoogleOAuthToken(user[0].id, true),
        })
        await insertIntoCalendar(
          newCalendar,
          row[0].id,
          schedulingDate,
          observations,
          email,
          name,
        )
      }
    }

    return {
      message: 'Scheduling created',
      status: 201,
      data: row,
    }
  })
