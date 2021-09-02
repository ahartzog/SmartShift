
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './Employee.entity';

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

  async remove(id: string): Promise<void> {
    await this.EmployeesRepository.delete(id);
  }
}