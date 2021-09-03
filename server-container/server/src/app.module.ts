import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmployeeController } from 'employee/employee.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'employee/employee.entity';
import { EmployeeModule } from 'employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

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
      retryAttempts: 3,
      autoLoadEntities: true,
      entities: [Employee],
      synchronize: true,
    }),
    EmployeeModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
