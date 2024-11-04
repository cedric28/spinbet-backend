"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_PRIVATE_KEY || 'your_jwt_secret_key');
        req.user = decoded;
        next(); // Call next() if everything is good
    }
    catch (error) {
        return res.status(400).send('Invalid token.');
    }
};
exports.authMiddleware = authMiddleware;
