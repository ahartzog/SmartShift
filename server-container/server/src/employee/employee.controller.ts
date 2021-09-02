import { Controller, Get } from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Controller('/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get('getAllEmployees')
  async getAllEmployees(): Promise<Employee[]> {
    const test = 5;
    const employees = await this.employeeService.findAll();
    return employees;
  }

  @Get()
  getHello(): string {
    return 'Hello I am an employee, how can I help you?';
  }

  @Get('getGoodbye')
  getGoodbye(): string {
    return "You can't fire me, I QUIT!";
  }

  @Get('addAlekAgain')
  async addAlekAgain(): Promise<Employee> {
    const fullOne = await this.employeeService.addOneAlek();
    console.log('fullone?', fullOne);
    return fullOne;
  }
}
