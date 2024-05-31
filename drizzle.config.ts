import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/lib/dz/schema.ts',
  out: './src/lib/dz/migrations',
  dbCredentials: {
    url: './prisma/dev.db',
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
})
