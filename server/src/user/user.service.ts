import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
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

  addAlek = async () => {
    const alek: User = {
      _id: new ObjectID(),
      firstName: 'Alek',
      username: 'ahartzog',
      password: 'cats',
      lastName: 'Hartzog',
      emailAddress: 'ahartzog@gmail.com',
      roles: [],
    };

    await this.addUser(alek);
  };

  async addUser(user: User): Promise<boolean> {
    await this.UsersRepository.insert(user);
    return true;
  }
}
