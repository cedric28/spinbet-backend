// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: { id: number; name: string }; // Adjust based on your User object
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): any => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'your_jwt_secret_key');
        req.user = decoded as { id: number; name: string }; 
        next(); // Call next() if everything is good
    } catch (error) {
        return res.status(400).send('Invalid token.');
    }
};

export { authMiddleware };
