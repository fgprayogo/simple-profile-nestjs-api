import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ProfileDao } from './profile.dao';
import { CreateOrPatchProfileDto } from './dto/profile.dto';
import { CalendarChinese } from 'date-chinese';
import { getSign } from 'horoscope';
import * as moment from 'moment';
import { ProfilePayloadValidatorUtil } from '../../utils/payload-validator/profile-payload-validator.util';
import { ProfilePictureUploaderUtil } from '../../utils/image-uploader/profile-picture-uploader.util';
import { Profile } from '../../database/schema/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    private userService: UserService,
    private profileDao: ProfileDao,
    private profilePayloadValidatorUtil: ProfilePayloadValidatorUtil,
    private profilePictureUploaderUtil: ProfilePictureUploaderUtil,
  ) {}

  async create(req, profilePicture?: Express.Multer.File): Promise<Profile> {
    const user = await this.profileDao.getProfileByUser(req.user._id);
    if (user) {
      throw new BadRequestException('the user already has a profile. use patch endpoint to update');
    }

    if (profilePicture) {
      req.body['profilePicture'] = await this.profilePictureUploaderUtil.upload(profilePicture, req.user._id);
    } else {
      await this.profilePayloadValidatorUtil.createOrUpdateValidator(req.body);
    }

    let body = req.body;
    body['user'] = req.user._id;
    if (body.birthDay) {
      const year = moment(body.birthDay).year();
      const month = moment(body.birthDay).month() + 1;
      const day = moment(body.birthDay).date();
      body['zodiac'] = await this.calculateZodiac(year, month, day);
      body['horoscope'] = await getSign({ month, day });
    }
    const profile = await this.profileDao.create(body);
    await this.userService.findByIdAndUpdate(req.user._id, {
      profile: profile._id,
    });
    return profile;
  }

  async getProfileByUserAndPopulate(req) {
    return await this.profileDao.getProfileByUserAndPopulate(req.user._id);
  }

  async patchProfileByUser(id: string, body: CreateOrPatchProfileDto, profilePicture?: Express.Multer.File): Promise<Profile> {
    const user = await this.profileDao.getProfileByUser(id);
    if (!user) {
      throw new BadRequestException('the user not have a profile. use create endpoint to create a profile');
    }

    if (profilePicture) {
      body['profilePicture'] = await this.profilePictureUploaderUtil.upload(profilePicture, id);
    } else {
      await this.profilePayloadValidatorUtil.createOrUpdateValidator(body);
    }

    if (body.birthDay) {
      const year = moment(body.birthDay).year();
      const month = moment(body.birthDay).month() + 1;
      const day = moment(body.birthDay).date();
      body['zodiac'] = await this.calculateZodiac(year, month, day);
      body['horoscope'] = await getSign({ month, day });
    }
    return await this.profileDao.patchProfileByUser(id, body);
  }

  private async calculateZodiac(year, month, day) {
    let cal = new CalendarChinese();

    cal.fromGregorian(year, month, day);

    let [chineseCycle, chineseYear, chineseMonth, chineseLeap, chineseDay] = cal.get();

    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

    let zodiacIndex: number = chineseYear - 1;

    if (chineseYear > 12) {
      zodiacIndex = (chineseYear % 12) - 1;
    }

    return zodiacSigns[zodiacIndex];
  }
}
