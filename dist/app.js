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
exports.connectToDatabase = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
require("express-async-errors");
const requestLogger_1 = require("./middlewares/requestLogger");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const participationRoutes_1 = __importDefault(require("./routes/participationRoutes"));
const client_1 = require("@prisma/client");
const winston_1 = __importDefault(require("winston"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient(); // Initialize Prisma Client
// Winston Logger Setup
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console(),
    ],
});
// Middleware
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(requestLogger_1.requestLogger);
// Routes
app.use('/api/auth', authRoutes_1.default); // Authentication routes
app.use('/api/participation', participationRoutes_1.default); // Participation routes
// Error Handling Middleware
app.use(errorMiddleware_1.errorHandler);
// Connect to Database
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        logger.info('Database connected successfully.');
    }
    catch (error) {
        logger.error('Database connection failed:', error);
        throw error; // Throw error to be caught in server.ts
    }
});
exports.connectToDatabase = connectToDatabase;
// Global error handling for async errors
app.use((err, res) => {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});
exports.default = app; // Export the app instance
