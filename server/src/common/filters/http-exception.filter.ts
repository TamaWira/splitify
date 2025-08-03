import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface HttpExceptionResponse {
  message: string | string[];
  statusCode?: number;
  error?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as string | HttpExceptionResponse;
      message = typeof res === 'string' ? res : (res.message ?? message);

      // Log HttpException details (warn or error based on status)
      if (status >= 500) {
        this.logger.error(
          `HTTP ${status} Error: ${request.method} ${request.url}`,
          JSON.stringify(res),
        );
      } else {
        this.logger.warn(
          `HTTP ${status} Response: ${request.method} ${request.url}`,
          JSON.stringify(res),
        );
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      // Log unhandled runtime errors (stack trace)
      this.logger.error(
        `Unhandled Error: ${request.method} ${request.url}`,
        exception.stack,
      );
    } else {
      this.logger.error(
        `Unknown Exception: ${request.method} ${request.url}`,
        `${exception}`,
      );
    }

    response.status(status).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
