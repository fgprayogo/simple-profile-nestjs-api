import { Injectable } from '@nestjs/common';
import { InterestCategoryDao } from './interest-category.dao';
import { CreateInterestCategoryDto } from './dto/interest-category.dto';
import { InterestCategory } from '../../database/schema/interest-category.schema';

@Injectable()
export class InterestCategoryService {
  constructor(private interestCategoryDao: InterestCategoryDao) {}
  async create(body: CreateInterestCategoryDto): Promise<InterestCategory> {
    return await this.interestCategoryDao.create(body);
  }

  async findAll(): Promise<InterestCategory[]> {
    return await this.interestCategoryDao.findAll();
  }
}
