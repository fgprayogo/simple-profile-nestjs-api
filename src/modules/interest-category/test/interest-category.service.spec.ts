import { Test, TestingModule } from '@nestjs/testing';
import { interestCategoryStub } from './stubs/interes-category.stub';
import { InterestCategoryDao } from '../interest-category.dao';
import { InterestCategoryService } from '../interest-category.service';
import { AppModule } from '../../../app.module';

describe('AuthService', () => {
  let interestCategoryService: InterestCategoryService;
  let interestCategoryDao: InterestCategoryDao;

  beforeEach(async () => {
    const interestCategoryDaoMock = {
      create: jest.fn().mockResolvedValue(interestCategoryStub()),
      findAll: jest.fn().mockResolvedValue([interestCategoryStub()]),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(InterestCategoryDao)
      .useValue(interestCategoryDaoMock)
      .compile();

    interestCategoryService = module.get<InterestCategoryService>(InterestCategoryService);
    interestCategoryDao = module.get<InterestCategoryDao>(InterestCategoryDao);
    module.close();
  });

  describe('create', () => {
    describe('when login is called', () => {
      test('should return an access token if login is successful', async () => {
        const result = await interestCategoryService.create(interestCategoryStub());
        expect(result).toBeDefined();
        expect(result).toEqual(interestCategoryStub());
      });
    });
  });

  describe('find', () => {
    describe('when login is called', () => {
      test('should return an access token if login is successful', async () => {
        const result = await interestCategoryService.findAll();
        expect(result).toBeDefined();
        expect(result).toEqual([interestCategoryStub()]);
      });
    });
  });
});

describe('register', () => {});
