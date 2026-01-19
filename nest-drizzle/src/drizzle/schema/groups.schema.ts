import { mysqlTable, int, varchar, primaryKey } from 'drizzle-orm/mysql-core';
import { users } from './users.schema';
import { index } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const groups = mysqlTable('groups', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});

// Join 테이블
export const usersToGroups = mysqlTable(
  'UsersToGroups',
  {
    userId: int().references(() => users.id),
    groupId: int().references(() => groups.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.groupId] }),
    userIdIndex: index('userIdIndex').on(table.userId),
  }),
);

export const usersToGroupRelations = relations(usersToGroups, ({ one }) => ({
  user: one(users, {
    fields: [usersToGroups.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
}));
