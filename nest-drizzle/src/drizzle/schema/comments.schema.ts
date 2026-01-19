import { int, varchar, mysqlTable } from 'drizzle-orm/mysql-core';
import { posts } from './posts.schema';
import { users } from './users.schema';

export const comments = mysqlTable('comments', {
  id: int().autoincrement().primaryKey(),
  text: varchar({ length: 255 }).notNull(),
  authorId: int().references(() => users.id),
  postId: int().references(() => posts.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
});
