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
exports.AuthService = void 0;
// authService.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthService {
    emailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { email } });
            return user !== null;
        });
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.emailExists(data.email)) {
                throw new Error('Email already exists');
            }
            const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
            const user = yield prisma.user.create({
                data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
            });
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { email } });
            if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
                throw new Error('Invalid credentials');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY);
            return token;
        });
    }
}
exports.AuthService = AuthService;
