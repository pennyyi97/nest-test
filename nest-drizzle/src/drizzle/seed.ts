import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import 'dotenv/config';
import * as schema from './schema/schema';
import { faker } from '@faker-js/faker';
import { createPool } from 'mysql2/promise';

const pool = createPool({ uri: process.env.DATABASE_URL });
const db = drizzle(pool, { schema, mode: 'default' }) as MySql2Database<typeof schema>;

async function main() {
  const userIds = await Promise.all(
    Array(50)
      .fill('')
      .map(async () => {
        const user = await db
          .insert(schema.users)
          .values({
            name: faker.person.firstName() + ' ' + faker.person.lastName(),
            age: Math.floor(Math.random() * (60 - 20)) + 20,
            email: faker.internet.email(),
            password: '1234',
          })
          .$returningId();
        return user[0].id;
      }),
  );

  const postIds = await Promise.all(
    Array(50)
      .fill('')
      .map(async () => {
        const post = await db
          .insert(schema.posts)
          .values({
            title: faker.lorem.paragraph(),
            content: faker.lorem.paragraph(),
            authorId: faker.helpers.arrayElement(userIds),
          })
          .$returningId();
        return post[0].id;
      }),
  );
  await Promise.all(
    Array(50)
      .fill('')
      .map(async () => {
        const comment = await db
          .insert(schema.comments)
          .values({
            text: faker.lorem.paragraph(),
            authorId: faker.helpers.arrayElement(userIds),
            postId: faker.helpers.arrayElement(postIds),
          })
          .$returningId();
        return comment[0].id;
      }),
  );

  const insertedGroups = await db
    .insert(schema.groups)
    .values([{ name: 'JS' }, { name: 'TS' }])
    .$returningId();

  const groupIds = insertedGroups.map((group) => group.id);

  await Promise.all(
    userIds.map(async (userId) => {
      return await db
        .insert(schema.usersToGroups)
        .values({
          userId,
          groupId: faker.helpers.arrayElement(groupIds),
        })
        .$returningId();
    }),
  );
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
