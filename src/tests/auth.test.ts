import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clearDatabase() {
    await prisma.participation.deleteMany(); // Clear specific tables
    await prisma.user.deleteMany(); // Clear user table
}

beforeAll(async () => {
    await clearDatabase(); // Clear database before running tests
});

afterAll(async () => {
    await prisma.$disconnect(); // Disconnect Prisma Client
});

describe('User Authentication', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Johnny Doe',
                email: 'johnny@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Successfully register user');
        expect(response.body.data).toHaveProperty('email', 'johnny@example.com');
        expect(response.body.data).toHaveProperty('name', 'Johnny Doe');
    });

    it('should get a valid token', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'johnny@example.com',
                password: 'password123'
            });
        
        // Expect a successful response
        expect(response.status).toBe(200); // Change to 200 for login success
        
        // // Check if the response body contains the token
        expect(response.body.data).toHaveProperty('token'); // Ensure the token is present
        
        // Optionally, you can validate the structure of the token
        const token = response.body.data.token;
        expect(typeof token).toBe('string'); // Token should be a string
        expect(token).not.toBe(''); // Token should not be empty
    });
});
