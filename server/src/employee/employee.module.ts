import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './employee.entity';
import { EmployeeGateway } from './employee.gateway';
@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeService, EmployeeGateway],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
