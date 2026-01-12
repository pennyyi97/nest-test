import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { BoardService } from './board.service';

/**
 * 1. 전체 문맥 이해하기
 * 다음 코드는  Controller ==> Service 구조를 가진 전형적은 Nest.js 패턴
 * 즉,
 * - BoardController: 요청(HTTp Request)를 받는 역할
 * - BoardService: 실제 비즈니스 로직(데이터 처리 등)을 담당
 *
 * 컨트롤러는 서비스를 직접 생성하지 않고, Nest가 자동으로 주입해주는 인스턴스를 사용
 * 그 "자동 주입"을 가능하게 하는 게 바로 의존성 주입(Dependency Injection)이고,
 * 그걸 설정하는 게 constructor(private readonly boardService: BoardService) 임
 *
 * 2. constructor()의 역할
 * Nest.js에서 클래스의 생성자는 객체가 생성될 때 실행되며
 * 매개변수로 지정된 의존성(다른 클래스 즉, 서비스 등)을 자동으로 주입
 *
 * BoardService가 @Injectable()로 등록되어 있으면,
 * Nest.js 가 자동으로 그 인스턴스를 만들어 BoardController에 삽입
 */

interface Board {
  id: number;
  title: string;
  content: string;
}

@Controller('board')
export class BoardController {
  /**
   * 구문 분석
   * - constructor(...); 클래스가 생성될 때 생성되는 생성자
   * - private: 매개변수로 받은 값을 클래스 내부의 private 필드로 자동 선언
   * - readonly: 이후에 이 속성을 수정할 수 없도록 일기전용 필드로 설정
   * - boardService: 실제 주입받을 객체의 이름(일반적으로 주입받을 클래스 명과 동일하게 작성)
   * - BoardService: 주입받을 서비스의 타입(Nest.js가 이 타입을 보고 인스턴스를 찾아 주입)
   */
  constructor(private readonly boardService: BoardService) {} //의존성 주입

  @Get()
  findAll(): Board[] {
    return this.boardService.findAll();
    // return `findAll 호출`;
  }

  @Get(':id')
  findOne(@Param('id') id: number): Board {
    return this.boardService.findOne(id);
    // return `게시물 조회 id: ${id}`;
  }

  @Post()
  create(@Body() data: any) {
    return this.boardService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any): Board {
    return this.boardService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Board[] {
    return this.boardService.delete(id);
  }
}
