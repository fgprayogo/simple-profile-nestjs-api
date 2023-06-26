import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { profileStub } from './stubs/profile.stub';
import { ProfileDao } from '../profile.dao';
import { ProfileService } from '../profile.service';
import { createdUserStub } from '../../user/test/stubs/user.stub';
import { AppModule } from '../../../app.module';

describe('ProfileService', () => {
  let userService: UserService;
  let profileDao: ProfileDao;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    userService = module.get<UserService>(UserService);
    profileService = module.get<ProfileService>(ProfileService);
    profileDao = module.get<ProfileDao>(ProfileDao);
    module.close();
  });

  describe('create', () => {
    describe('when login is called', () => {
      test('should return an access token if login is successful', async () => {
        jest.spyOn(profileDao, 'getProfileByUser').mockResolvedValue(null);
        jest.spyOn(profileDao, 'create').mockResolvedValue(profileStub());
        jest.spyOn(userService, 'findByIdAndUpdate').mockResolvedValue(createdUserStub());
        const result = await profileService.create({
          user: createdUserStub(),
          body: profileStub(),
        });
        expect(result).toBeDefined();
        expect(result).toEqual(profileStub());
      });
    });
  });

  describe('patchProfileByUser', () => {
    describe('when login is called', () => {
      test('should return an access token if login is successful', async () => {
        jest.spyOn(profileDao, 'getProfileByUser').mockResolvedValue(profileStub());
        jest.spyOn(profileDao, 'patchProfileByUser').mockResolvedValue(profileStub());
        jest.spyOn(userService, 'findByIdAndUpdate').mockResolvedValue(createdUserStub());

        let payload = {
          _id: '569875e18b85ff8130caee7e',
          name: 'jack the ripper',
          birthDay: '1999-11-20',
          height: 170,
          heightMeasurementUnit: 'cm',
          weight: 80,
          weightMeasurementUnit: 'kg',
          profilePicture: '',
          gender: 'Other',
          horoscope: 'SomeHoroscope',
          zodiac: 'SomeZodiac',
          interests: [],
        };

        const result = await profileService.patchProfileByUser(createdUserStub()._id, payload);
        expect(result).toBeDefined();
        expect(result).toEqual(profileStub());
      });
    });
  });

  describe('create', () => {
    describe('when login is called', () => {
      test('should return an access token if login is successful', async () => {
        jest.spyOn(profileDao, 'getProfileByUserAndPopulate').mockResolvedValue(profileStub());

        const result = await profileService.getProfileByUserAndPopulate({
          user: createdUserStub(),
          body: profileStub(),
        });
        expect(result).toBeDefined();
        expect(result).toEqual(profileStub());
      });
    });
  });
});

describe('register', () => {});
