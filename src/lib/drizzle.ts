import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

import * as schema from './dz/migrations/schema'

const sqlite = new Database('./prisma/dev.db')
export const dz = drizzle(sqlite, { schema })
