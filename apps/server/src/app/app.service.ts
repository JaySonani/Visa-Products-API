import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcome(): { message: string } {
    return { message: 'Hello from Sherpa API' };
  }
}
