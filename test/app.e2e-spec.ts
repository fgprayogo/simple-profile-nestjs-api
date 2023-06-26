import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';

let app: INestApplication;
beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

const userData = {
  email: faker.internet.email(),
  password: 'password',
  userName: faker.internet.userName(),
};
let access_token: string;

describe('Auth Controller (e2e)', () => {
  /**
   * Register
   */
  describe('/api/register (POST)', () => {
    it('should return NEW account', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
    });

    it('should return ERROR when duplicate', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Bad request');
    });
  });

  /**
   * Login
   */
  describe('/api/login (POST)', () => {
    it('should return an access token when login is successful', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/login')
        .send(userData)
        .expect(200);

      expect(response.body).toHaveProperty('access_token');
      access_token = response.body.access_token;
    });

    it('should return an ERROR if login credentials wrong', async () => {
      const invalidUserData = {
        username: 'invaliduser',
        password: 'wrongpassword',
      };

      const response = await request(app.getHttpServer())
        .post('/api/login')
        .send(invalidUserData)
        .expect(400);

      expect(response.body).toHaveProperty(
        'message',
        'email or password wrong',
      );
    });
  });
});

describe('Interest Category Controller (e2e)', () => {
  /**
   * Create Interest Category
   */
  describe('/api/interest-category (POST)', () => {
    const interestCategoryData = {
      name: faker.internet.displayName(),
    };
    it('should return NEW category', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/interest-category')
        .send(interestCategoryData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
    });

    it('should return ERROR when duplicate', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/interest-category')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Bad request');
    });
  });

  /**
   * List of Categories
   */
  describe('/api/interest-category (GET)', () => {
    it('should return list of categories', async () => {
      await request(app.getHttpServer())
        .get('/api/interest-category')
        .expect(200);
    });
  });
});

describe('Profile Controller (e2e)', () => {
  /**
   * Create new profile
   */
  let profileData = {
    name: faker.person.fullName(),
    gender: 'Male',
    birthDay: '1999-11-18',
    height: 170,
    heightMeasurementUnit: 'cm',
    weight: 80,
    weightMeasurementUnit: 'kg',
  };
  describe('/api/createProfile (POST)', () => {
    it('should return create new profile', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/createProfile')
        .set('Authorization', `Bearer ${access_token}`)
        .field('name', profileData.name)
        .field('gender', profileData.gender)
        .field('birthDay', profileData.birthDay)
        .field('height', profileData.height)
        .field('heightMeasurementUnit', profileData.heightMeasurementUnit)
        .field('weight', profileData.weight)
        .field('weightMeasurementUnit', profileData.weightMeasurementUnit)
        .expect(201);
      expect(response.body).toHaveProperty('_id');
    });

    it('should return ERROR because of empty data', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/createProfile')
        .set('Authorization', `Bearer ${access_token}`)
        .send({})
        .expect(400);
    });
  });

  /**
   * Get Profile
   */
  describe('/api/getProfile (GET)', () => {
    it('should return user new profile', async () => {
      await request(app.getHttpServer())
        .get('/api/getProfile')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200);
    });
  });

  /**
   * Update Profile
   */
  describe('/api/updateProfile (PATCH)', () => {
    it('should return user profile updated name', async () => {
      const newName = faker.person.fullName();
      const response = await request(app.getHttpServer())
        .patch('/api/updateProfile')
        .set('Authorization', `Bearer ${access_token}`)
        .field('name', newName)
        .expect(200);
      expect(response.body.name).toEqual(newName);
    });
  });
});
