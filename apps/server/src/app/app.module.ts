import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VisaModule } from '../modules/visa/visa.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    VisaModule,
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
