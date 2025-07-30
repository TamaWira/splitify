import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data: T) => {
        // if data is already in the format { message, data }, handle it safely
        if (
          typeof data === 'object' &&
          data !== null &&
          'data' in (data as object)
        ) {
          const safeData = data as unknown as {
            message?: string;
            data: unknown;
          };
          return {
            success: true,
            message: safeData.message ?? 'Request successful',
            data: safeData.data as T,
          };
        }

        // fallback if it's raw data
        return {
          success: true,
          message: 'Request successful',
          data,
        };
      }),
    );
  }
}
