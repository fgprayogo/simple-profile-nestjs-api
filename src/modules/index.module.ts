import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterestCategorySchema } from '../database/schema/interest-category.schema';
import { ProfileSchema } from '../database/schema/profile.schema';
import { UserSchema } from '../database/schema/user.schema';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { UserDao } from './user/user.dao';
import { ProfileDao } from './profile/profile.dao';
import { InterestCategoryController } from './interest-category/interest-category.controller';
import { InterestCategoryService } from './interest-category/interest-category.service';
import { InterestCategoryDao } from './interest-category/interest-category.dao';
import { ProfilePayloadValidatorUtil } from '../utils/payload-validator/profile-payload-validator.util';
import { ProfilePictureUploaderUtil } from '../utils/image-uploader/profile-picture-uploader.util';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
    MongooseModule.forFeature([{ name: 'InterestCategory', schema: InterestCategorySchema }]),
  ],
  controllers: [AuthController, ProfileController, InterestCategoryController],
  providers: [
    AuthService,
    UserService,
    ProfileService,
    InterestCategoryService,
    UserDao,
    ProfileDao,
    InterestCategoryDao,
    ProfilePayloadValidatorUtil,
    ProfilePictureUploaderUtil,
  ],
})
export class IndexModule {}
