import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome(): string {
    return 'Welcome to the Guitar Lessons App API!';
  }
}
