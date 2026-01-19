import { relations } from 'drizzle-orm';
import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { comments } from './comments.schema';
import { posts } from './posts.schema';
import { profileInfo } from './profileInfo.schema';
import { usersToGroups } from './groups.schema';

export const users = mysqlTable('users', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  comments: many(comments),
  posts: many(posts),
  profile: one(profileInfo),
  usersToGroups: many(usersToGroups),
}));
