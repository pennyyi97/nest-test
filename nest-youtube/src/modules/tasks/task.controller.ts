import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TaskEntity } from './entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // 조회
  @Get()
  findAll(): Promise<TaskEntity[]> {
    return this.taskService.selectAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.taskService.selectOne(id);
  }

  // 생성
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateTaskDto) {
    return this.taskService.createTask(data);
  }

  // 수정
  @Patch(':id') //일부 데이터만 수정할때 사용
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTaskDto): Promise<TaskEntity> {
    return this.taskService.updateTask(id, data);
  }

  // 삭제
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }
}
