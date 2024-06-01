import dayjs from 'dayjs'
import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { dz } from '@/lib/drizzle'
import { schedulings, users } from '@/lib/dz/migrations/schema'

type Params = {
  username: string
}

const createSchedulingSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string(),
  date: z.string().datetime(),
})

export async function POST(request: NextRequest, context: { params: Params }) {
  const username = context.params.username

  const user = await dz
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1)

  if (!user || user.length === 0) {
    return NextResponse.json(
      {
        message: 'User not found',
      },
      { status: 404 },
    )
  }

  const { name, email, observations, date } = createSchedulingSchema.parse(
    await request.json(),
  )

  const unixDate = dayjs(date).unix() + '000'

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return NextResponse.json(
      {
        message: 'Invalid date - date is in the past',
      },
      { status: 400 },
    )
  }

  const conflictingScheduling = await dz
    .select()
    .from(schedulings)
    .where(
      and(eq(schedulings.user_id, user[0].id), eq(schedulings.date, unixDate)),
    )
    .limit(1)

  if (conflictingScheduling.length > 0) {
    return NextResponse.json(
      {
        message: 'Invalid date - date is already scheduled',
      },
      { status: 400 },
    )
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

  return NextResponse.json(row)
}
