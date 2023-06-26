import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { InterestCategoryService } from './interest-category.service';
import { CreateInterestCategoryDto } from './dto/interest-category.dto';
import { InterestCategory } from '../../database/schema/interest-category.schema';

@Controller('api/interest-category')
export class InterestCategoryController {
  constructor(private readonly interestCategoryService: InterestCategoryService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateInterestCategoryDto): Promise<InterestCategory> {
    return await this.interestCategoryService.create(body);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<InterestCategory[]> {
    return await this.interestCategoryService.findAll();
  }
}
