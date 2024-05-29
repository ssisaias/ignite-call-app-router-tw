'use server'

import z from 'zod'

import { prisma } from '../prisma'
import { actionClient } from '../safe-action'

const schema = z.object({
  username: z.string(),
})

export const getPublicUserInfo = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username } }) => {
    return await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        bio: true,
        avatar_url: true,
        name: true,
      },
    })
  })
