import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('PrismaException');

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    let statusCode;
    let message = exception.message;
    switch (exception.code) {
      // This is for when unique constraint is violated
      case 'P2002':
        statusCode = 400;
        break;
      // This is for when the record is not found
      case 'P2025':
        statusCode = 404;
        message = exception.meta.cause as string;
        break;
      default:
        statusCode = 500;
    }
    this.logger.error(
      `${statusCode} ${request.method} ${request.url}  error: ${exception.message}`
    );

    response.status(statusCode).json({
      error: true,
      statusCode,
      errorDetails: {
        message,
      },
    });
  }
}
