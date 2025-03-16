import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from './config/config.service';
import { SwaggerConfigService } from './config/swagger.config.service';
import { GLOBAL_API_PREFIX } from './consts/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_API_PREFIX);

  // setup swagger for documentation
  const swaggerConfigService = app.get(SwaggerConfigService);
  swaggerConfigService.setupSwagger(app);

  // setup config service
  const configService = app.get(ConfigService);
  const port = configService.port;

  await app.listen(port);
  Logger.log(
    `Sherpa backend is running on: http://localhost:${port}/${GLOBAL_API_PREFIX}`
  );
  Logger.log(
    `API docs available at: http://localhost:${port}/api-docs`
  );

}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
});
