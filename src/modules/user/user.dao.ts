import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../database/schema/user.schema';
import { InterestCategory } from '../../database/schema/interest-category.schema';
import { Profile } from '../../database/schema/profile.schema';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,

    @InjectModel(InterestCategory.name)
    private interestCategoryModel: mongoose.Model<InterestCategory>,

    @InjectModel(Profile.name)
    private profileModel: mongoose.Model<Profile>,
  ) {}

  async create(body: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(body);
    } catch (error) {
      throw new BadRequestException({ message: 'Bad request', error });
    }
  }

  async findByIdAndUpdate(id: string, data: any): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, data);
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new BadRequestException({ message: 'email or password wrong' });
      }
      return user;
    } catch (error) {
      const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(error, status);
    }
  }
}
