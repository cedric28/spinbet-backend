"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: 'logs/combined.log' }),
        new winston_1.default.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
});
exports.default = logger;
