"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function clearDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.participation.deleteMany(); // Clear specific tables
        yield prisma.user.deleteMany(); // Clear user table
    });
}
let token;
let userId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clearDatabase(); // Clear database before running tests
    // Register and login a user to get a token
    const result = yield (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
    });
    const res = yield (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({
        email: 'jane@example.com',
        password: 'password123',
    });
    userId = result.body.data.id;
    token = res.body.data.token;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect(); // Disconnect Prisma Client
}));
describe('Participation API', () => {
    let participationId;
    it('should create a participation', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/participation')
            .set('Authorization', `Bearer ${token}`)
            .send({
            firstName: 'John',
            lastName: 'Doe',
            percentage: 20,
            userId
        });
        console.log('hotdog', res.body);
        participationId = res.body.data.id;
        expect(res.status).toEqual(201);
        expect(res.body.data).toHaveProperty('id');
    }));
    it('should get all participations', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/participation/user/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(200);
        expect(res.body.data).toBeInstanceOf(Array);
    }));
    it('should update a participation', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/participation/${participationId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            firstName: 'John',
            lastName: 'Smith',
            percentage: 30,
            userId
        });
        expect(res.status).toEqual(200);
        expect(res.body.data.percentage).toEqual(30);
    }));
    it('should delete a participation', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/participation/${participationId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(204);
    }));
});
