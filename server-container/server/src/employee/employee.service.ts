import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';

import { Employee } from './Employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private EmployeesRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    const test = await this.EmployeesRepository.find();
    console.log('test?', test);
    return test;
  }

  findOne(id: string): Promise<Employee> {
    return this.EmployeesRepository.findOne(id);
  }

  async addOneAlek(): Promise<any> {
    const newEmployee: Employee = {
      _id: new ObjectID(),
      firstName: 'Alek' + Math.floor(Math.random() * 5000),
      lastName: 'Hartzog',
      emailAddress: 'ahartzog@gmail.com',
    };

    const retval = await this.EmployeesRepository.insert(newEmployee);
    return retval;
  }

  async remove(id: string): Promise<void> {
    await this.EmployeesRepository.delete(id);
  }
}
