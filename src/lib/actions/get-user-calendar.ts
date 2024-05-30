'use server'
import z from 'zod'

import { api } from '../axios'
import { actionClient } from '../safe-action'

const schema = z.object({
  username: z.string(),
  date: z.string(),
})

export interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export const getUserAgenda = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username, date } }) => {
    const response = await api.get<Availability>(`/users/${username}/agenda`, {
      params: {
        date,
      },
    })
    return response.data
  })
