import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('NotFound');

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();

    const response = context.getResponse<Response>();

    this.logger.error(
      `404 ${request.method} ${request.url}  error: ${exception.message}`
    );

    response.status(404).json({
      error: true,
      statusCode: 404,
      errorDetails: {
        message: `Resource not found`,
        error: exception.message,
      },
    });
  }
}
