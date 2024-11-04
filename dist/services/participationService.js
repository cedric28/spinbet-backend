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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ParticipationService {
    createParticipation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.participation.create({ data });
        });
    }
    getAllParticipationsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.participation.findMany({ where: { userId }, orderBy: {
                    percentage: 'desc', // 'desc' for descending order
                } });
        });
    }
    getParticipationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.participation.findUnique({ where: { id: parseInt(id) } });
        });
    }
    updateParticipation(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.participation.update({
                where: { id: parseInt(id) },
                data,
            });
        });
    }
    deleteParticipation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.participation.delete({
                where: { id: parseInt(id) },
            });
        });
    }
}
exports.ParticipationService = ParticipationService;
