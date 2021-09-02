import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Note that we are using ObjectId from Mongo, NOT TypeOrm
import { ObjectId } from 'mongodb';
import { Employee } from './Employee.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private EmployeesRepository: Repository<Employee>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.EmployeesRepository.find();
  }

  findOne(id: string): Promise<Employee> {
    return this.EmployeesRepository.findOne(id);
  }

  async addOneAlek(): Promise<any> {
    const newEmployee: Employee = {
      _id: new ObjectId(),
      firstName: 'Alek',
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
