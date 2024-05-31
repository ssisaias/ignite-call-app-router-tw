'use server'

import { eq } from 'drizzle-orm'
import z from 'zod'

import { dz } from '../drizzle'
import { users } from '../dz/migrations/schema'
// import { prisma } from '../prisma'
import { actionClient } from '../safe-action'

const schema = z.object({
  username: z.string(),
})

export const getPublicUserInfo = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username } }) => {
    return (
      await dz
        .select({
          id: users.id,
          bio: users.bio,
          avatar_url: users.avatar_url,
          name: users.name,
        })
        .from(users)
        .where(eq(users.username, username))
        .limit(1)
    )[0]
  })
