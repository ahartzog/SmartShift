import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmployeeController } from './employee/employee.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, EmployeeController],
  providers: [AppService],
})
export class AppModule {}
