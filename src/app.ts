import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import 'express-async-errors';
import { requestLogger } from './middlewares/requestLogger';
import { errorHandler } from './middlewares/errorMiddleware';
import authRoutes from './routes/authRoutes';
import participationRoutes from './routes/participationRoutes';
import { PrismaClient } from '@prisma/client';
import winston from 'winston';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient(); // Initialize Prisma Client

// Winston Logger Setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use('/api/auth', authRoutes);          // Authentication routes
app.use('/api/participation', participationRoutes); // Participation routes

// Error Handling Middleware
app.use(errorHandler);

// Connect to Database
export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        logger.info('Database connected successfully.');
    } catch (error) {
        logger.error('Database connection failed:', error);
        throw error; // Throw error to be caught in server.ts
    }
};

// Global error handling for async errors
app.use((err, res) => {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app; // Export the app instance
