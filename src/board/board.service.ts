import { Injectable, NotFoundException } from '@nestjs/common';
import { createPostDto } from './dto/create-post';
import { updatePostDto } from './dto/update-post';

interface Board {
  id: number;
  title: string;
  content: string;
  author: string;
  major: string;
}
@Injectable()
export class BoardService {
  private boards: Board[] = [
    {
      id: 1,
      title: '첫 번째 게시글 - 제목',
      content: '첫 번째 게시글 - 본문',
      author: '',
      major: '',
    },
    {
      id: 2,
      title: '두 번째 게시글 - 제목',
      content: '두 번째 게시글 - 본문',
      author: '',
      major: '',
    },
    {
      id: 3,
      title: '세 번째 게시글 - 제목',
      content: '세 번째 게시글 - 본문',
      author: '',
      major: '',
    },
  ];
  findAll(): Board[] {
    // return `findAll 호출`;
    return this.boards;
  }

  findOne(id: number): Board {
    // return `게시물 조회 id: ${id}`;
    const board = this.boards.find((board) => board.id == id);

    if (!board) {
      throw new NotFoundException(`ID: ${id}에 해당하는 게시글을 찾을 수 없음`);
    }

    return board;
  }

  create(payload: createPostDto) {
    const newBoard = { id: this.generateId(), ...payload };
    this.boards.push(newBoard);
    return newBoard;
  }

  update(id: number, payload: updatePostDto) {
    const boardIdx = this.boards.findIndex((board) => board.id == id);

    if (boardIdx == -1) {
      throw new NotFoundException(`ID: ${id}에 해당하는 게시글을 찾을 수 없음`);
    }

    this.boards[boardIdx] = { ...this.boards[boardIdx], ...payload };
    return this.boards[boardIdx];
  }

  delete(id: number) {
    const boardIdx = this.boards.findIndex((board) => board.id == id);

    if (boardIdx == -1) {
      throw new NotFoundException(`ID: ${id}에 해당하는 게시글을 찾을 수 없음`);
    }

    this.boards.splice(boardIdx, 1);
    return this.boards;
  }

  generateId() {
    return this.boards.length == 0 ? 1 : Math.max(...this.boards.map((board) => board.id)) + 1;

    // Math.max() 는 전달된 여러 개 숫자 중 가장 큰 값을 반환
    // Math.max()는 배열을 직접 받을 수 없기 때문에 배열이 들어가면 Nan 반환
    // ∴ ... 스프레드 연산자 사용해서 배열을 개별 요소로 변환
  }
}
