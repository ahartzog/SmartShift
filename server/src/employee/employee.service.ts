import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID, In } from 'typeorm';

import { Employee } from './employee.entity';

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

  findOne(id: ObjectID): Promise<Employee> {
    return this.EmployeesRepository.findOne(id);
  }

  //This filler example does not work, and using the In function provided by typeorm does not work
  //Link to how it SHOULD work --> https://github.com/typeorm/typeorm/issues/1239#issuecomment-431796732
  async findByIds(ids: string[]): Promise<Employee[]> {
    const employees = await this.EmployeesRepository.find({
      _id: '613129d9cbfcf0b0bf181e69',
    });

    return employees;
  }

  async upsertOne(employee: Employee): Promise<Employee> {
    const retval = await this.EmployeesRepository.save(employee);
    return retval;
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
