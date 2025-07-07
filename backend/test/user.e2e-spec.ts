import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../src/features/users/user.module';

describe('User E2E', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/users/profile (GET) should return 401 if not authenticated', () => {
        return request(app.getHttpServer()).get('/users/profile').expect(401);
    });

    // ...more E2E tests for all endpoints and edge cases...
});
