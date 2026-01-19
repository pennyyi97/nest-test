import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { users } from './users.schema';
import { relations } from 'drizzle-orm';
import { comments } from './comments.schema';

export const posts = mysqlTable('posts', {
  id: int().autoincrement().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 255 }).notNull(),
  authorId: int().references(() => users.id),
});

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),

  comments: many(comments),
}));
