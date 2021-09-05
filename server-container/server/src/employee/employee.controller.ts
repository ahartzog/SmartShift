import { Controller, Get, Param, Post, Patch, Put, Body } from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Controller('/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    const employees = await this.employeeService.findAll();

    await new Promise((resolve) => setTimeout(resolve, 3000));
    return employees;
  }

  //https://restfulapi.net/rest-api-design-tutorial-with-example/
  @Get(':id')
  async getOneEmployee(@Param() params: { id: string }): Promise<Employee> {
    const employee = await this.employeeService.findOne(params.id);
    return employee;
  }

  @Post(':id')
  async updateOneEmployee(
    @Param() params,
    @Body() body: Employee,
  ): Promise<Employee> {
    const employee = await this.employeeService.upsertOne(body);
    return employee;
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
