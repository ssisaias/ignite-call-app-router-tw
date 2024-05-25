'use server'

import { prisma } from '../prisma'

export async function getPublicUserInfo(username: string) {
  return await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      bio: true,
      avatar_url: true,
      name: true,
      username: true,
    },
  })
}
