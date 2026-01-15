import { varchar } from 'drizzle-orm/mysql-core';
import { int } from 'drizzle-orm/mysql-core';
import { serial } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial().primaryKey(),
  name: varchar({ length: 25 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});
