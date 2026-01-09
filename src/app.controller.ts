import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

//'users'로 시작하는 모든 요청을 처리하는 컨트롤러
//e.g. http://localhost:3000/users
@Controller('users')
export class AppController {
  /**
   * [C] Create - POST /users
   * 새로운 사용자 등록
   * e.g. POST /users {"email":"test@test.com", "password":"1234"}
   */
  @Post()
  create(@Body() body: { email: string; password: string }) {
    return `새로운 사용자 생성 : ${body.email}`;
  }

  /**
   * [R] Read - GET /users
   * 전체 사용자 목록 조회
   * e.g. GET /users?page=2
   */
  @Get()
  findAll(@Query('page') page?: number) {
    const currentPage = page || 1;
    return `모든 사용자 조회 (현재 페이지: ${currentPage})`;
  }

  /**
   * [R] Read - GET /users/:id
   * 특정 사용자 조회
   * e.g. GET /users/5
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `사용자 조회 (ID: ${id})`;
  }

  /**
   * [U] Update - PUT /users/:id
   * 사용자 정보 수정
   * e.g. PUT /users/5 { "name": "이몽룡" }
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string }) {
    return `사용자 ${id} 수정 → 이름: ${body.name}`;
  }

  /**
   * [D] Delete - DELETE /users/:id
   * 사용자 삭제
   * e.g. DELETE /users/5
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `사용자 삭제 (ID: ${id})`;
  }
}
