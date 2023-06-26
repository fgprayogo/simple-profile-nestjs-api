import { Test, TestingModule } from '@nestjs/testing';
import { interestCategoryStub } from './stubs/interes-category.stub';
import { AppModule } from '../../../app.module';
import { InterestCategoryService } from '../interest-category.service';
import { InterestCategoryController } from '../interest-category.controller';

describe('AuthService', () => {
  let interestCategoryService: InterestCategoryService;
  let interestCategoryController: InterestCategoryController;

  beforeEach(async () => {
    const interestCategoryServiceMock = {
      create: jest.fn().mockResolvedValue(interestCategoryStub()),
      findAll: jest.fn().mockResolvedValue([interestCategoryStub()]),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(InterestCategoryService)
      .useValue(interestCategoryServiceMock)
      .compile();

    interestCategoryService = module.get<InterestCategoryService>(InterestCategoryService);
    interestCategoryController = module.get<InterestCategoryController>(InterestCategoryController);
    module.close();
  });

  describe('create', () => {
    describe('when login is called', () => {
      test('should return an access token if login is successful', async () => {
        const result = await interestCategoryController.create(interestCategoryStub());
        expect(result).toBeDefined();
        expect(result).toEqual(interestCategoryStub());
      });
    });
  });

  describe('find', () => {
    describe('when login is called', () => {
      test('should return an access token if login is successful', async () => {
        const result = await interestCategoryController.findAll();
        expect(result).toBeDefined();
        expect(result).toEqual([interestCategoryStub()]);
      });
    });
  });
});

describe('register', () => {});
