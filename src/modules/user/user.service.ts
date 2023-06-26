import { Injectable } from '@nestjs/common';
import { User } from '../../database/schema/user.schema';
import { UserDao } from './user.dao';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private userDao: UserDao) {}

  async create(body: CreateUserDto): Promise<User> {
    return await this.userDao.create(body);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userDao.findOneByEmail(email);
  }

  async findByIdAndUpdate(id: string, data: { profile: string }): Promise<User> {
    return await this.userDao.findByIdAndUpdate(id, data);
  }
}
