import { createClient } from '@libsql/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { PrismaClient } from '@prisma/client'

const mode = process.env.MODE ?? 'dev'

let adapter = null
if (mode === 'prod') {
  console.log('PrismaClient is in prod mode')
  const libsql = createClient({
    url: process.env.TURSO_DATABASE_URL ?? '',
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  adapter = new PrismaLibSQL(libsql)
} else {
  console.log('PrismaClient is in dev mode')
}

export const prisma = new PrismaClient({
  /* log: ['query'], */
  adapter,
})
