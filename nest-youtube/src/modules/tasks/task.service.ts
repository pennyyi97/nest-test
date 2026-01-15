import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
  // DTO를 엔티티 객체로 매핑 한 후 실제 DB에 저장
  // SQL : INSERT INTO tasks Values ( title, content, category ...);
  async createTask(data: CreateTaskDto) {
    // Entity  기반으로 설계된 테이블 구조에 맞게 매핑한 후 저장
    // create(): DTO 데이터를 바탕으로 새로운 엔티티 인스턴스를 생성
    // save(): 생성된 엔티티 객체를 실제 DB 테이블에 저장
    const newTask = this.taskRepository.create(data);
    await this.taskRepository.save(newTask);

    return { message: 'task 생성 완료', statusCode: HttpStatus.CREATED };
  }

  // 수정
  // 특정 ID의 데이터를 찾아 payload의 내용으로 변경
  // SQL : UPDATE tasks SET title=?, content = ? WHERE id=?;
  async updateTask(id: number, data: UpdateTaskDto) {
    // 기존 데이터 확인
    // 이미 구현된 selectOne(id)를 호출하여 데이터가 있는지 없는지 먼저 검증
    // 데이터가 없으면 selectOne(id) 내부에서 NotFoundException 발생

    const task = await this.selectOne(id);

    // 데이터 병합
    // Object.assign(대상 객체, 소스객체)을 사용하여 기존 엔티티에 수정된 내용만 덮어씌움
    // data에 없는 속성은 기본값 유지
    Object.assign(task, data);

    // DB에 저장
    // save() 메서드는 엔티티에 primary_key(id)가 포함되어 있으면 새로운 행을 생성하지 않고, 기존 행을 업데이트
    return await this.taskRepository.save(task);
  }

  // 삭제
  // ID를 기준으로 데이터 삭제
  // SQL : DELETE FROM task WHERE id=?;
  async deleteTask(id: number) {
    await this.selectOne(id);

    // delete() : 해당 ID의 데이터 삭제
    await this.taskRepository.delete(id);
  }
}
