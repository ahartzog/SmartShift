import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'auth/jwt-auth.gard';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.findOne(req.user.username);
    if (!user) {
      throw new Error('Did not find user');
    }
    return user;
  }
}
