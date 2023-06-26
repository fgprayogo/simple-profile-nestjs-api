import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Optional,
  Res,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { join } from 'path';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrPatchProfileDto } from './dto/profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, existsSync } from 'fs';
import { Response } from 'express';

@Controller('api')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('createProfile')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('profilePicture'))
  async create(
    @Request() req,
    @Body() body: CreateOrPatchProfileDto,
    @UploadedFile()
    @Optional()
    file: Express.Multer.File,
  ) {
    return await this.profileService.create(req, file);
  }

  @Get('getProfile')
  @HttpCode(200)
  async getProfile(@Request() req) {
    return await this.profileService.getProfileByUserAndPopulate(req);
  }

  @Patch('updateProfile')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('profilePicture'))
  async patchProfileByUser(
    @Request() req: any,
    @Body() body: CreateOrPatchProfileDto,
    @UploadedFile()
    @Optional()
    file: Express.Multer.File,
  ) {
    return await this.profileService.patchProfileByUser(req.user._id, body, file);
  }

  @Get('profilePicture')
  @HttpCode(200)
  async getUserProfilePhoto(@Res() res: Response, @Request() req): Promise<void> {
    const imageLocation = join(process.cwd(), 'images', `${req.user._id}.png`);
    if (!existsSync(imageLocation)) {
      throw new BadRequestException("you don't have profilePicture");
    }
    res.setHeader('Content-Type', 'image/png');

    const fileStream = createReadStream(imageLocation);
    fileStream.pipe(res);
  }
}
