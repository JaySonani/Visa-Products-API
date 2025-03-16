import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl } = request;
    const startTime = Date.now();

    response.on('finish', () => {
      const { statusCode } = response;
      if (statusCode === 200 || statusCode === 201) {
        const duration = Date.now() - startTime;
        this.logger.log(
          `${statusCode} ${method} ${originalUrl} - ${duration} ms`
        );
      }
    });

    next();
  }
}
