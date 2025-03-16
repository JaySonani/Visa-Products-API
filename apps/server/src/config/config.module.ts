import {
  Module,
  NestModule,
  MiddlewareConsumer,
  Provider,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { HTTPExceptionFilter } from '../exception-fitlers/http.exception-filter';
import { NotFoundExceptionFilter } from '../exception-fitlers/not-found.exception-fitler';
import { PrismaExceptionFilter } from '../exception-fitlers/prisma-exception.filter';
import { SwaggerConfigService } from './swagger.config.service';
import { LoggerMiddleware } from '../middlewares/logger.middleware';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: HTTPExceptionFilter,
      multi: true,
    } as Provider,
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
      multi: true,
    } as Provider,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
      multi: true,
    } as Provider,
    SwaggerConfigService,
  ],
  exports: [],
})
export class ConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
