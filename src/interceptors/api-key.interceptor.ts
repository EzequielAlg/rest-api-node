import { Injectable, NestInterceptor, ExecutionContext, BadRequestException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const apikey = request.headers['apikey'];

    if (!apikey) {
      throw new BadRequestException({ message: 'No API key found in request' });
    }

    return next.handle();
  }
}

