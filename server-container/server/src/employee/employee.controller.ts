import { Controller, Get } from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Controller('/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get('getAllEmployees')
  async getAllEmployees(): Promise<Employee[]> {
    const employees = await this.employeeService.findAll();

    await new Promise((resolve) => setTimeout(resolve, 3000));
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

  // @Get('getEmployee')
  // async getEmployee(employeeId: ObjectId): Promise<string> {
  //   const employee = await this.employeeService.find();
  //   return 'Hello I am an employee, how can I help you?';
  // }

  @Get('addAlekAgain')
  async addAlekAgain(): Promise<Employee> {
    const fullOne = await this.employeeService.addOneAlek();
    console.log('fullone?', fullOne);
    return fullOne;
  }
}
