import { mysqlTable, int, varchar, primaryKey } from 'drizzle-orm/mysql-core';
import { users } from './users.schema';
import { index } from 'drizzle-orm/mysql-core';

export const groups = mysqlTable('Groups', {
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
