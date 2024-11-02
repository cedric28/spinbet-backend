// authService.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthService {
    async emailExists(email: string): Promise<boolean> {
        const user = await prisma.user.findUnique({ where: { email } });
        return user !== null;
    }

    async register(data: { name: string; email: string; password: string }) {
        if (await this.emailExists(data.email)) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: { ...data, password: hashedPassword },
        });

        return user;
    }

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY as string);
        return token;
    }
}
