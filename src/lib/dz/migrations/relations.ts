/* eslint-disable camelcase */
import { relations } from 'drizzle-orm/relations'

import {
  accounts,
  schedulings,
  sessions,
  user_time_intervals,
  users,
} from './schema'

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.user_id],
    references: [users.id],
  }),
}))

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  user_time_intervals: many(user_time_intervals),
  schedulings: many(schedulings),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.user_id],
    references: [users.id],
  }),
}))

export const user_time_intervalsRelations = relations(
  user_time_intervals,
  ({ one }) => ({
    user: one(users, {
      fields: [user_time_intervals.user_id],
      references: [users.id],
    }),
  }),
)

export const schedulingsRelations = relations(schedulings, ({ one }) => ({
  user: one(users, {
    fields: [schedulings.user_id],
    references: [users.id],
  }),
}))
