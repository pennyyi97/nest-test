import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto, UpdateTaskDto } from './dto';

import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  // 조회
  // DB의 모든 데이터를 배열 형태로 조회
  // SQL : SELECT * FROM tasks;
  async selectAll(): Promise<TaskEntity[]> {
    // find()는 조건 없이 호출하면 전체 데이터 조회
    return await this.taskRepository.find();
  }

  // 특정 ID를 가진 데이터를 찾고, 없으면 404 에러 반환
  // SQL : SELECT * FROM WHERE id=?;
  async selectOne(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`ID 값이 ${id}인 업무를 찾을 수 없음`);
    }
    return task;
  }

  // 생성
  createTask(data: CreateTaskDto) {
    // Entity  기반으로 설계된 테이블 구조에 맞게 매핑한 후 저장
  }

  // 수정
  updateTask(id: number, data: UpdateTaskDto) {}

  // 삭제
  deleteTask(id: number) {}
}
