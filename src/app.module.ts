import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { ClassroomService } from './classroom/classroom.service';
import { ClassroomController } from './classroom/classroom.controller';
import { ClassroomModule } from './classroom/classroom.module';

@Module({
  imports: [BoardModule, ClassroomModule],
  controllers: [AppController, ClassroomController],
  providers: [AppService, ClassroomService],
})
export class AppModule {}
