import { Injectable, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerConfigService {
  setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Sherpa Backend API')
      .setDescription('Documentation for Visa Product API')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }
}
