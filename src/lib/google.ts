/* eslint-disable camelcase */
import dayjs from 'dayjs'
import { google } from 'googleapis'

import { prisma } from './prisma'

export async function getGoogleOAuthToken(
  userId: string,
  forceRefresh = false,
) {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      provider: 'google',
      user_id: userId,
    },
  })

  const auth = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
  )

  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : null,
  })

  if (!account.expires_at) {
    return auth
  }

  const shouldTokenBeRefreshed = dayjs(account.expires_at * 1000).isBefore(
    new Date(),
  )

  if (shouldTokenBeRefreshed || forceRefresh) {
    const { credentials } = await auth.refreshAccessToken()
    const {
      access_token,
      expiry_date,
      refresh_token,
      scope,
      id_token,
      token_type,
    } = credentials

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        access_token,
        expires_at: expiry_date ? Math.floor(expiry_date / 1000) : null,
        refresh_token,
        scope,
        id_token,
        token_type,
      },
    })

    auth.setCredentials({
      access_token,
      refresh_token,
      expiry_date,
    })

    return auth
  }
}
