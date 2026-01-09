import { Injectable, NotFoundException } from '@nestjs/common';

interface Board {
  id: string;
  title: string;
  content: string;
}
@Injectable()
export class BoardService {
  private boards: Board[] = [
    {
      id: '1',
      title: '첫 번째 게시글 - 제목',
      content: '첫 번째 게시글 - 본문',
    },
    {
      id: '2',
      title: '두 번째 게시글 - 제목',
      content: '두 번째 게시글 - 본문',
    },
    {
      id: '3',
      title: '세 번째 게시글 - 제목',
      content: '세 번째 게시글 - 본문',
    },
  ];
  findAll(): Board[] {
    // return `findAll 호출`;
    return this.boards;
  }

  findOne(id: string): Board {
    // return `게시물 조회 id: ${id}`;
    const board = this.boards.find((board) => board.id == id);

    if (!board) {
      throw new NotFoundException(`ID: ${id}에 해당하는 게시글을 찾을 수 없음`);
    }

    return board;
  }
}
