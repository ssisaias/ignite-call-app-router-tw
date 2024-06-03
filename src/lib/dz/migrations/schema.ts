/* eslint-disable camelcase */
import { sql } from 'drizzle-orm'
import {
  integer,
  numeric,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'

export const _prisma_migrations = sqliteTable('_prisma_migrations', {
  id: text('id').primaryKey().notNull(),
  checksum: text('checksum').notNull(),
  finished_at: numeric('finished_at'),
  migration_name: text('migration_name').notNull(),
  logs: text('logs'),
  rolled_back_at: numeric('rolled_back_at'),
  started_at: numeric('started_at')
    .default(sql`(current_timestamp)`)
    .notNull(),
  applied_steps_count: integer('applied_steps_count').default(0).notNull(),
})

export const users = sqliteTable(
  'users',
  {
    id: text('id')
      .primaryKey()
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    username: text('username').notNull(),
    name: text('name').notNull(),
    created_at: numeric('created_at')
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    updated_at: numeric('updated_at').notNull(),
    avatar_url: text('avatar_url'),
    email: text('email'),
    emailVerified: numeric('emailVerified'),
    bio: text('bio'),
  },
  (table) => {
    return {
      email_key: uniqueIndex('users_email_key').on(table.email),
      username_key: uniqueIndex('users_username_key').on(table.username),
    }
  },
)

export const accounts = sqliteTable(
  'accounts',
  {
    id: text('id')
      .primaryKey()
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    user_id: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    provider_account_id: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
    createdAt: numeric('createdAt')
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    updatedAt: numeric('updatedAt').notNull(),
  },
  (table) => {
    return {
      provider_provider_account_id_key: uniqueIndex(
        'accounts_provider_provider_account_id_key',
      ).on(table.provider, table.provider_account_id),
    }
  },
)

export const sessions = sqliteTable(
  'sessions',
  {
    id: text('id')
      .primaryKey()
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    session_token: text('session_token').notNull(),
    user_id: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    expires: numeric('expires').notNull(),
    createdAt: numeric('createdAt')
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    updatedAt: numeric('updatedAt').notNull(),
  },
  (table) => {
    return {
      session_token_key: uniqueIndex('sessions_session_token_key').on(
        table.session_token,
      ),
    }
  },
)

export const VerificationToken = sqliteTable(
  'VerificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: numeric('expires').notNull(),
  },
  (table) => {
    return {
      identifier_token_key: uniqueIndex(
        'VerificationToken_identifier_token_key',
      ).on(table.identifier, table.token),
    }
  },
)

export const user_time_intervals = sqliteTable('user_time_intervals', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  week_day: integer('week_day').notNull(),
  time_start_in_minutes: integer('time_start_in_minutes').notNull(),
  time_end_in_minutes: integer('time_end_in_minutes').notNull(),
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
})

export const schedulings = sqliteTable('schedulings', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  date: numeric('date').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  observations: text('observations'),
  created_at: numeric('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
})
