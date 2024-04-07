import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const response = {
          statusCode: HttpStatus.OK,
          data: data,
        };
        const responseStatusCode = context.switchToHttp().getResponse().statusCode;
        if (responseStatusCode !== HttpStatus.OK) {
          response.statusCode = responseStatusCode;
        }

        return response;
      }),
    );
  }
}
