import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_TOKEN } from 'lib/constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_TOKEN,
      signOptions: {},
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
