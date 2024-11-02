import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ParticipationService {
    async createParticipation(data: { firstName: string; lastName: string; percentage: number; userId: number }) {
        return prisma.participation.create({ data });
    }

    async getAllParticipations(userId: number) {
        return prisma.participation.findMany({ where: { userId } });
    }

    async getParticipationById(id: string) {
        return prisma.participation.findUnique({ where: { id: parseInt(id) } });
    }

    async updateParticipation(id: string, data: { firstName: string; lastName: string; percentage: number }) {
        return prisma.participation.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    async deleteParticipation(id: string) {
        return prisma.participation.delete({
            where: { id: parseInt(id) },
        });
    }
}
