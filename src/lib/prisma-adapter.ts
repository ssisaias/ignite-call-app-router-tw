import type { Adapter } from 'next-auth/adapters'
import { prisma } from './prisma'
import { Prisma } from '@prisma/client'

export function MyPrismaAdapter(): Adapter {
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
      const { user } = await prisma.account.findUniqueOrThrow({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
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

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: { id: user.id! },
        data: {
          name: user?.name ?? '',
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })
      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        avatar_url: prismaUser.avatar_url!,
        emailVerified: prismaUser.emailVerified,
      }
    },

    async deleteUser(id) {
      await prisma.user.delete({
        where: { id },
      })
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      })

      return {
        sessionToken,
        userId,
        expires,
      }
    },

    async getSessionAndUser(sessionToken) {
      const { user, ...session } = await prisma.session.findUniqueOrThrow({
        where: { session_token: sessionToken },
        include: {
          user: true,
        },
      })

      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email!,
          avatar_url: user.avatar_url!,
          emailVerified: user.emailVerified,
        },
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const prismaSession = await prisma.session.update({
        where: { session_token: sessionToken },
        data: {
          expires,
          user_id: userId,
        },
      })
      return {
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
        expires: prismaSession.expires,
      }
    },

    async createVerificationToken({ identifier, expires, token }) {
      const verificationToken = prisma.verificationToken.create({
        data: {
          expires,
          identifier,
          token,
        },
      })
      return verificationToken
    },

    async useVerificationToken({ identifier, token }) {
      try {
        const verificationToken = await prisma.verificationToken.delete({
          where: {
            identifier_token: {
              identifier,
              token,
            },
          },
        })
        return verificationToken
      } catch (error) {
        if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2025')
          return null
        throw error
      }
    },
  }
}
