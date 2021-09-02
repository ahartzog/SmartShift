import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmployeeController } from './employee/employee.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee/employee.entity';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      port: 27017,
      //host: 'localhost',
      //username: 'root',
      //password: 'alllowercasepassword',
      database: 'SmartShift',
      authSource: 'admin',
      url: 'mongodb+srv://root:alllowercasepassword@cluster0.9kvv5.mongodb.net',
      useNewUrlParser: true,
      ssl: true,
      entities: [Employee],
      synchronize: true,
    }),
    EmployeeModule,
  ],
  controllers: [AppController, EmployeeController],
  providers: [AppService],
})
export class AppModule {}