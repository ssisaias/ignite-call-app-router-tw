import { defineConfig } from 'drizzle-kit'

const mode = process.env.MODE || 'dev'
const dbUrl = process.env.TURSO_DATABASE_URL ?? ''
const authToken = process.env.TURSO_AUTH_TOKEN ?? ''

const credentials = {
  url: mode === 'dev' ? 'file:./prisma/dev.db' : dbUrl,
  authToken: mode === 'dev' ? '' : authToken,
}

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/lib/dz/migrations/schema.ts',
  out: './src/lib/dz/migrations',
  dbCredentials: credentials,
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
})
