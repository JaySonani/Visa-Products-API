import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HTTPExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HTTPException');

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const statusCode = exception.getStatus();
    this.logger.error(
      `${statusCode} ${request.method} ${request.url}  error: ${exception.message}`
    );

    const errorDetails = exception.getResponse();
    response.status(statusCode).json({
      error: true,
      statusCode,
      errorDetails: {
        message: errorDetails['message'],
        error: errorDetails['error'],
      },
    });
  }
}
