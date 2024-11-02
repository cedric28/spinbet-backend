import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error: ${err.message} - Route: ${req.originalUrl}`);
    res.status(500).send('Internal Server Error');
};
