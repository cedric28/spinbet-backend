import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clearDatabase() {
    await prisma.participation.deleteMany(); // Clear specific tables
    await prisma.user.deleteMany(); // Clear user table
}

let token: string;
let userId: number;

beforeAll(async () => {
    await clearDatabase(); // Clear database before running tests
    // Register and login a user to get a token
    const result = await request(app).post('/api/auth/register').send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
    });
    const res = await request(app).post('/api/auth/login').send({
        email: 'jane@example.com',
        password: 'password123',
    });
    userId = result.body.id;
    token = res.body.token;
});

afterAll(async () => {
    await prisma.$disconnect(); // Disconnect Prisma Client
});

describe('Participation API', () => {
    let participationId: number;
    it('should create a participation', async () => {
      
        const res = await request(app)
            .post('/api/participation')
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'John',
                lastName: 'Doe',
                percentage: 20,
                userId
            });
        participationId = res.body.id;
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all participations', async () => {
        const res = await request(app)
            .get('/api/participation')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should update a participation', async () => {
        const res = await request(app)
            .put(`/api/participation/${participationId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'John',
                lastName: 'Smith',
                percentage: 30,
                userId
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.percentage).toEqual(30);
    });

    it('should delete a participation', async () => {
        const res = await request(app)
            .delete(`/api/participation/${participationId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(204);
    });
});
