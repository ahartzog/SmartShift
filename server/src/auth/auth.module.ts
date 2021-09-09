import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { EnvConfig } from 'lib/constants';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    //ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvConfig>) => {
        return {
          secret: config.get('JWT_SECRET_TOKEN'),
          signOptions: {},
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
