import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
      return 'Hello I am an employee, how can I help you?';
  }

  @Get('getGoodbye')
  getGoodbye(): string {
      return 'You can\'t fire me, I QUIT!';
  }
}
