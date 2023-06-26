import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { createdUserStub, updatedUserStub } from './stubs/user.stub';
import { User } from '../../../database/schema/user.schema';
import { UserDao } from '../user.dao';
import { AppModule } from '../../../app.module';

describe('AuthService', () => {
  let userService: UserService;
  let userDao: UserDao;

  beforeEach(async () => {
    const userDaoMock = {
      create: jest.fn().mockResolvedValue(createdUserStub()),
      findOneByEmail: jest.fn().mockResolvedValue(createdUserStub()),
      findByIdAndUpdate: jest.fn().mockResolvedValue(createdUserStub()),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(UserDao)
      .useValue(userDaoMock)
      .compile();

    userService = module.get<UserService>(UserService);
    userDao = module.get<UserDao>(UserDao);
    module.close();
  });

  describe('create', () => {
    describe('when login is called', () => {
      test('should return an access token if login is successful', async () => {
        const result = await userService.create(createdUserStub());
        expect(result).toBeDefined();
        expect(result).toEqual(createdUserStub());
      });
    });
  });

  describe('findOneByEmail', () => {
    describe('when login is called', () => {
      test('should return an access token if login is successful', async () => {
        let user: User;
        user = createdUserStub();
        const result = await userService.findOneByEmail(createdUserStub().email);
        expect(result).toBeDefined();
        expect(result).toEqual(createdUserStub());
      });
    });
  });

  describe('findByIdAndUpdate', () => {
    describe('when login is called', () => {
      test('should return an access token if login is successful', async () => {
        const result = await userService.findByIdAndUpdate(createdUserStub()._id, { profile: updatedUserStub()._id });
        expect(result).toBeDefined();
        expect(result).toEqual(createdUserStub());
      });
    });
  });
});

describe('register', () => {});
