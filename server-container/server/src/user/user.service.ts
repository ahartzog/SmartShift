import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';

//https://docs.nestjs.com/security/authentication
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UsersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    const retval = await this.UsersRepository.findOne({ username });
    return retval;
  }

  async addUser(user: User): Promise<boolean> {
    await this.UsersRepository.insert(user);
    return true;
  }
}
