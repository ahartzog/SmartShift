import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { AppService } from 'app.service';
import { LocalAuthGuard } from 'auth/local-auth-guard';

import { AuthService } from 'auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const user = req.user;
    return this.authService.login(req.user);
  }
}
