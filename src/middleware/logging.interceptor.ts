import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body } = req;

    return next.handle().pipe(
      tap({
        next: (data) => {
          Logger.verbose(
            `${method.toUpperCase()} ${statusCode} ${originalUrl} ${JSON.stringify(
              params,
            )} ${JSON.stringify(query)} ${JSON.stringify(
              body,
            )} : ${JSON.stringify(data)}`,
          );
        },
        error: (err) =>
          Logger.error(
            `${method.toUpperCase()} ${
              err.status
            } ${originalUrl} ${JSON.stringify(params)} ${JSON.stringify(
              query,
            )} ${JSON.stringify(body)} : ${JSON.stringify(err.message)}`,
          ),
      }),
    );
  }
}
