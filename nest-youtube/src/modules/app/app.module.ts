import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from '../tasks/task.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    // 1. ConfigModule 설정: .env 파일 로드
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 ConfigService 사용 가능
      envFilePath: `.env/${process.env.NODE_ENV || 'development'}.env`,
    }),

    // 2. TypeOrmModule 비동기 설정: ConfigService의 환경 변수 주입
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // ConfigService 인스턴스 주입

      // 실제 DB와 연결하기 위한 설정을 수행하는 팩토리 함수
      useFactory: (config: ConfigService) => ({
        type: config.get<string>('DB_TYPE') as 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),

        // 엔티티 로드 설정
        autoLoadEntities: true,

        // DB 스키마 동기화 (운영시 절대 금지)
        synchronize: config.get('NODE_ENV') == 'development' ? true : false,
      }),
    }),

    TaskModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
