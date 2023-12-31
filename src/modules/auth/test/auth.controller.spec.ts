import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { createdUserStub } from '../../user/test/stubs/user.stub';
import { AuthController } from '../auth.controller';
import { AppModule } from '../../../app.module';

describe('AuthController', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    authController = module.get<AuthController>(AuthController);

    module.close();
  });

  describe('login', () => {
    describe('when login is called', () => {
      test('should return an access token if login is successful', async () => {
        let payload: any = {
          email: 'a@gmail.com',
          password: 'password',
        };
        jest.spyOn(authService, 'login').mockResolvedValue({ access_token: 'ajsdniawoaiwdjoiajwd' });

        const result = await authController.login(payload);

        expect(result).toEqual({
          access_token: 'ajsdniawoaiwdjoiajwd',
        });
      });
    });
  });

  describe('register', () => {
    describe('when register is called', () => {
      test('should return the user', async () => {
        jest.spyOn(authService, 'register').mockResolvedValue(createdUserStub());
        const result = await authController.register(createdUserStub());

        expect(result).toEqual(createdUserStub());
      });
    });
  });
});
