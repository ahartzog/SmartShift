import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmployeeController } from './employee/employee.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      port: 27017,
      //username: 'root',
      //password: 'alllowercasepassword',
      database: 'SmartShift',
      authSource: "admin",
      url: "mongodb+srv://root:alllowercasepassword@cluster0.9kvv5.mongodb.net",
      useNewUrlParser: true,
      ssl: true,
      entities: [Employee],
      synchronize: true,
    }),
  ],
  controllers: [AppController, EmployeeController],
  providers: [AppService],
})
export class AppModule {}
