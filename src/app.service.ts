import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return 'Algorizz. Rizzing the world, Algorithmically!';
  }
}
