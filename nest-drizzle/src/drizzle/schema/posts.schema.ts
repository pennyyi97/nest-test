import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { users } from './users.schema';

export const posts = mysqlTable('posts', {
  id: int().autoincrement().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 255 }).notNull(),
  authorId: int().references(() => users.id),
});
