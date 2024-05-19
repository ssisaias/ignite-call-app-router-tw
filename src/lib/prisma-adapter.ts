import type { Adapter } from 'next-auth/adapters'
import { prisma } from './prisma'

function PrismaAdapter(): Adapter {
  return {
    async getUser(id) {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id },
      })
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: user.emailVerified,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUniqueOrThrow({
        where: { email },
      })
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: user.emailVerified,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const user = await prisma.user.findUniqueOrThrow({
        where: { email },
      })
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: user.emailVerified,
      }
    },
  }
}
