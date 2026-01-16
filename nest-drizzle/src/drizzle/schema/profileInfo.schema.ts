import { mysqlTable, int, json } from 'drizzle-orm/mysql-core';
import { users } from './users.schema';

export const profileInfo = mysqlTable('profileInfo', {
  id: int().autoincrement().primaryKey(),
  metadata: json(),
  userId: int().references(() => users.id),
});
