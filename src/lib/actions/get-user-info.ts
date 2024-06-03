'use server'

import { eq } from 'drizzle-orm'
import { cache } from 'react'
import z from 'zod'
import { createServerAction } from 'zsa'

import { dz } from '../drizzle'
import { users } from '../dz/migrations/schema'

const schema = z.object({
  username: z.string(),
})

export const getPublicUserInfo = createServerAction()
  .input(schema)
  .handler(
    cache(async ({ input: { username } }) => {
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
    }),
  )
