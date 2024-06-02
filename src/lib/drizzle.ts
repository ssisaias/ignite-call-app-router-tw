import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

const mode = process.env.MODE ?? 'dev'

let db
if (mode === 'dev') {
  console.log('Drizzle is in dev mode')
  const turso = createClient({
    url: process.env.DZ_DATABASE_URL!,
  })
  db = drizzle(turso, { logger: true })
} else {
  console.log('Drizzle is in prod mode')
  const turso = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  db = drizzle(turso)
}

export const dz = db
