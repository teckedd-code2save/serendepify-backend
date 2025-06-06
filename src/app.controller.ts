import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("algorizz/home")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }
}
