import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { ObjectID } from 'typeorm';
@Controller('/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees(
    @Query('employeeIds') employeeIds = null as null | string[],
  ): Promise<Employee[]> {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (employeeIds) {
      const employees = await this.employeeService.findByIds(employeeIds);
      return employees;
    } else {
      const employees = await this.employeeService.findAll();
      return employees;
    }
  }

  //https://restfulapi.net/rest-api-design-tutorial-with-example/
  @Get(':id')
  async getOneEmployee(@Param() params: { id: ObjectID }): Promise<Employee> {
    const employee = await this.employeeService.findOne(params.id);
    return employee;
  }
  //How would we get a certain set of employes by ID or role?

  @Post(':_id')
  async upsertOneEmploee(
    @Param() params: { _id: ObjectID },
    @Body() body: Employee,
  ): Promise<Employee> {
    if (params._id !== body._id) {
      throw new Error(
        'Route does not match the body of the user you are trying to update',
      );
    }
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
