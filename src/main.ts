// Nest.js 애플리케이션 인스턴스를 생성하는 데 필요한 유틸리티를 가져옴
import { NestFactory } from '@nestjs/core';

// Swagger 모듈과 문서 설정을 위한 빌더를 가져옴
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// 애플리케이션의 루트 모듈을 가져옴
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

// 비동기 함수로 애플리케이션 초기 설정을 시작
async function bootstrap() {
  // Nest 애플리케이션 인스턴스를 생성
  const app = await NestFactory.create(AppModule);

  // DocumentBuilder를 사용하여 Swagger 문서의 기본 정보를 설정
  const config = new DocumentBuilder()
    // 문서 페이지의 제목을 설정
    .setTitle('Nest.js API 예시')
    // 문서에 대한 간략한 설명을 추가 (문서 상단에 표시)
    .setDescription('Nest.js 를 사용한 백엔드 API 설명')
    // API 버전 설정
    .setVersion('1.0')
    // 문서에서 API들을 그룹화 할 태그를 미리 정의
    .addTag('users')
    // 설정을 완료하고 빌더 객체를 생성
    .build();

  /**
   * 2. Swagger 문서 생성 함수(Factory)
   * SwaggerModule.createDocument()는 애플리케이션의 모든 라우트, DTO 등의 메타데이터를 읽어
   * OpenAPI Specification(OAS) JSON 객체를 생성하는 함수.
   * setup() 함수가 문서 객체 대신 문서를 생성하는 팩토리를 받도록 정의
   */
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  /**
   * 3. Swagger UI 엔드포인트 설정
   * 'api' 경로에 Swagger UI 인터페이스를 설정
   * e.g. http://localhost:3000/api 로 접속하여 문서 확인 가능
   * 두 번째 인자(app)는 Nest 애플리케이션 인스턴스
   * 세 번째 인자(documentFactory)는 위에서 정의한 문서 생성 함수
   */
  SwaggerModule.setup('api', app, documentFactory);

  //전역 필터 등록
  app.useGlobalFilters(new HttpExceptionFilter());

  // 환경 변수 PORT가 있다면 해당 포트를 사용하고, 없으면 기본 포트(4000)로 서버를 실행
  await app.listen(process.env.PORT ?? 4000);
}

// 애플리케이션을 시작하는 함수 호출
bootstrap();
