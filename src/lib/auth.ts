import NextAuth from 'next-auth'
import google, { GoogleProfile } from 'next-auth/providers/google'

import { MyPrismaAdapter } from './prisma-adapter'

export const { handlers, signIn, signOut, auth } = NextAuth((req) => ({
  adapter: MyPrismaAdapter({ req }),
  providers: [
    google({
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar',
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: '',
          email: profile.email,
          avatar_url: profile.picture,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (
        !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
      ) {
        return '/register/connect-calendar/?error=permissions'
      }

      return true
    },

    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },
  },
}))
