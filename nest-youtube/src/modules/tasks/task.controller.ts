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

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // 조회
  @Get()
  findAll() {
    this.taskService.selectAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.taskService.selectOne(id);
  }

  // 생성
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateTaskDto) {
    this.taskService.createTask(data);
  }

  // 수정
  @Patch(':id') //일부 데이터만 수정할때 사용
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTaskDto) {
    this.taskService.updateTask(id, data);
  }

  // 삭제
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.taskService.deleteTask(id);
  }
}
