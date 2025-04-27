import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) should return JWT token', async () => {
    const loginDto = {
      email: 'barmiAron@example.com',
      password: 'Asd1234.'
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(201);

    expect(response.body).toHaveProperty('access_token'); // ✅ JWT token returned
  });

  it('/auth/login (POST) should return 401 for invalid credentials', async () => {
    const invalidLoginDto = {
      email: 'wrongEmail@example.com',
      password: 'wrongPassword123'
    };
  
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(invalidLoginDto)
      .expect(401); // Ensure it returns 401 Unauthorized
  
    expect(response.body).toHaveProperty('message', "Invalid credentials");
  });
  
  it('/auth/profile (GET) should return user info', async () => {
    const loginDto = {
      email: 'barmiAron@example.com',
      password: 'Asd1234.'
    };

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(201);

    const token = loginRes.body.access_token;

    const profileRes = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(profileRes.body).toHaveProperty('id');
    expect(profileRes.body).toHaveProperty('email', loginDto.email);
  });

  it('/auth/profile (GET) should return 401 when no token is provided', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .expect(401); // Should return Unauthorized if no token is provided
  
    expect(response.body).toHaveProperty('message', 'Unauthorized');
  });
  
});

