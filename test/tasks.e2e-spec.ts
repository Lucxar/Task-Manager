import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Tasks API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('runs CRUD operations', async () => {
    const res1 = await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Task1', description: 'one' })
      .expect(201);
    const task1 = res1.body;

    const res2 = await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Task2' })
      .expect(201);
    const task2 = res2.body;

    await request(app.getHttpServer())
      .patch(`/tasks/${task1.id}`)
      .send({ isDone: true })
      .expect(200);

    const list = await request(app.getHttpServer())
      .get('/tasks')
      .expect(200);
    expect(list.body.length).toBeGreaterThanOrEqual(2);

    await request(app.getHttpServer())
      .delete(`/tasks/${task2.id}`)
      .expect(200);
  });
});
