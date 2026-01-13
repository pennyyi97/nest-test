import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch 데코레이터는 이 필터가 'HttpException' 타입의 에러만 잡겠다는 의미
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 1. 실행 context에서 HTTP 관련 객체를 가져옴
    const response = ctx.getResponse<Response>(); // 2. Express의 Response 객체
    const request = ctx.getRequest<Request>(); // 3. Express의 Request 객체
    const status = exception.getStatus(); //4 예외에서 발생한 상태 코드(e.g. 400, 404)

    // exception에서 message 부분 추출
    const errorResponse = exception.getResponse();
    const message = typeof errorResponse == 'object' ? errorResponse['message'] : errorResponse; // string이거나 object일 수 있어서 분기 처리

    // 5. 원하는 형태로 응답 JSON 조립
    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: status,
      message: message,
    });
  }
}
