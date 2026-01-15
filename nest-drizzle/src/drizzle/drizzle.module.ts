import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2';

export const DRIZZLE = Symbol('drizzle-connection');
import * as schema from './schema';
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseURL = configService.get<string>('DATABASE_URL');
        const pool = createPool({ uri: databaseURL });
        return drizzle(pool, { schema, mode: 'default' }) as MySql2Database<typeof schema>;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
