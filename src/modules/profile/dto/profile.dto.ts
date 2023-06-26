import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

const Gender = ['Male', 'Female', 'Other'];

export class CreateOrPatchProfileDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsIn(Gender)
  @IsOptional()
  @IsNotEmpty()
  gender: string;

  @IsOptional()
  @IsNotEmpty()
  birthDay: string;

  @IsOptional()
  @IsNotEmpty()
  height: number;

  @IsOptional()
  @IsNotEmpty()
  heightMeasurementUnit: string;

  @IsOptional()
  @IsNotEmpty()
  weight: number;

  @IsOptional()
  @IsNotEmpty()
  weightMeasurementUnit: string;

  @IsOptional()
  @IsNotEmpty()
  profilePicture: string;

  @IsOptional()
  @IsNotEmpty()
  interests: string[];
}
