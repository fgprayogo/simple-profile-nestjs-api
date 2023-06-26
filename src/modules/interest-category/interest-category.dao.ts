import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { InterestCategory } from '../../database/schema/interest-category.schema';

@Injectable()
export class InterestCategoryDao {
  constructor(
    @InjectModel(InterestCategory.name)
    private interestCategoryModel: mongoose.Model<InterestCategory>,
  ) {}

  async create(data: any) {
    try {
      return await this.interestCategoryModel.create(data);
    } catch (error) {
      throw new BadRequestException('Bad request', error);
    }
  }

  async findAll() {
    return await this.interestCategoryModel.find();
  }
}
