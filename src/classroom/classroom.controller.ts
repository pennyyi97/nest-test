import { Controller, Get, Post } from '@nestjs/common';

@Controller('classroom')
export class ClassroomController {
  @Get()
  findAll() {}

  @Post()
  create() {}
}
