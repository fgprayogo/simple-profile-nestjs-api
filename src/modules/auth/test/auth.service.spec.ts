import { HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { createdUserStub } from '../../user/test/stubs/user.stub';
import { User } from 'src/database/schema/user.schema';
import { AppModule } from '../../../app.module';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);

    module.close();
  });

  describe('login', () => {
    describe('when login is called', () => {
      describe('Positif condition', () => {
        let payload: any;
        let user: User;

        beforeEach(async () => {
          user = createdUserStub();
          payload = {
            email: 'a@gmail.com',
            password: 'password',
          };
          jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);
        });

        test('should return an access token if login is successful', async () => {
          const result = await authService.login(payload);
          expect(result).toBeDefined();
        });

        test('should return same decoded data', async () => {
          const result: { access_token: string } = await authService.login(payload);
          const decodedToken: any = jwtService.decode(result.access_token) as User;

          expect(payload.email).toEqual(decodedToken.email);
        });
      });

      describe('negatif', () => {
        test('should throw err if email or password wrong', async () => {
          let user: User = createdUserStub();
          let payload: any = {
            email: 'a@gmail.com',
            password: 'passwor',
          };
          jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);

          jest.spyOn(jwtService, 'signAsync').mockResolvedValue('ajsdniawoaiwdjoiajwd');

          await expect(authService.login(payload)).rejects.toThrowError(new HttpException({ message: 'email or password wrong' }, HttpStatus.BAD_REQUEST));
        });
      });
    });
  });

  describe('register', () => {
    describe('positif', () => {
      test('should return user', async () => {
        jest.spyOn(userService, 'create').mockResolvedValue(createdUserStub());
        const result = await authService.register(createdUserStub());
        expect(result).toEqual(createdUserStub());
      });
    });
    describe('negatif', () => {
      test('Should return error', async () => {
        jest.spyOn(userService, 'create').mockResolvedValue(null);
        try {
          await authService.register(createdUserStub());
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });
});

describe('register', () => {});
