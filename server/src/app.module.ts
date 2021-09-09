import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'employee/employee.entity';
import { EmployeeModule } from 'employee/employee.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const validationSchema = Joi.object({
  DATABASE_URL: Joi.string(),
  DATABASE_NAME: Joi.string(),
  JWT_SECRET_TOKEN: Joi.string(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      port: 27017,
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
