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
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clearDatabase(); // Clear database before running tests
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect(); // Disconnect Prisma Client
}));
describe('User Authentication', () => {
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
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
    }));
    it('should get a valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
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
    }));
});
