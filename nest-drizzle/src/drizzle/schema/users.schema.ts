import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('Users', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 25 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});
