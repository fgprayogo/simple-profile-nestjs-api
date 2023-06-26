import { BadGatewayException, BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from '../../database/schema/profile.schema';
import mongoose from 'mongoose';

@Injectable()
export class ProfileDao {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: mongoose.Model<Profile>,
  ) {}

  async create(data: any): Promise<Profile> {
    try {
      return await this.profileModel.create(data);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getProfileByUserAndPopulate(user): Promise<Profile> {
    try {
      const userProfile = await this.profileModel
        .findOne({ user })
        .populate([
          {
            path: 'user',
            model: 'User',
          },
          {
            path: 'interests',
            model: 'InterestCategory',
          },
        ])
        .exec();
      if (!userProfile) {
        throw new HttpException({ message: 'user not created profile yet' }, HttpStatus.BAD_REQUEST);
      }
      return userProfile;
    } catch (error) {
      const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(error, status);
    }
  }

  async patchProfileByUser(user, data): Promise<Profile> {
    try {
      return await this.profileModel.findOneAndUpdate({ user }, data, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getProfileByUser(user): Promise<Profile> {
    return await this.profileModel.findOne({ user });
  }
}
