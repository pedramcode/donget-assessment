import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/group (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/group')
      .send({ name: 'test group' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('test group');
  });

  it('/group (GET)', async () => {
    const res = await request(app.getHttpServer()).get(
      '/group?page=1&limit=10',
    );
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/expences (POST)', async () => {
    // First create a group
    const groupRes = await request(app.getHttpServer())
      .post('/group')
      .send({ name: 'group for expence' });
    const groupId = groupRes.body.id;
    const res = await request(app.getHttpServer()).post('/expences').send({
      groupId,
      paidBy: 'user1',
      amount: 100,
      desc: 'test expence',
    });
    expect(res.status).toBe(201);
    expect(res.body.amount).toBe(100);
  });

  // ...more integration tests for update, delete, settlement, etc.

  afterAll(async () => {
    await app.close();
  });
});
