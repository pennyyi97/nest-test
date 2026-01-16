import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schema/**.schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: `${process.env.DATABASE_URL}`,
  },
});
