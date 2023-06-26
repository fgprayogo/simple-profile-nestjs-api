import { IsString, IsNotEmpty } from 'class-validator';

export class CreateInterestCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
