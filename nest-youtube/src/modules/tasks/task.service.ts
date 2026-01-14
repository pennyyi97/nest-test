import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  // 조회
  selectAll() {}
  selectOne(id: number) {}

  // 생성
  createTask(data: CreateTaskDto) {
    // Entity  기반으로 설계된 테이블 구조에 맞게 매핑한 후 저장
  }

  // 수정
  updateTask(id: number, data: UpdateTaskDto) {}

  // 삭제
  deleteTask(id: number) {}
}
