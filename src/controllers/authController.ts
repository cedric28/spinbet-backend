import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { validateAuthUser, validateRegisterUser } from "../models/auth"
import logger from '../utils/logger';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    try {
        const { error } = validateRegisterUser(req.body);
        if(error) res.status(400).send({ message: error.details[0].message });

        const { name, email, password } = req.body;
        const user = await authService.register({ name, email, password });
        logger.info(`User registered with email: ${user.email}`);
        res.status(201).send({
            message: "Successfully register user",
            data: user
        });
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === 'Email already exists') {
                logger.error(`Registration error: ${err.message}`);
                res.status(409).send({ message:err.message }); // Conflict status for duplicate email
            } else {
                logger.error(`Registration error: ${err.message}`);
                res.status(400).send({ message:err.message});
            }
        } else {
            logger.error('Unexpected error during registration');
            res.status(500).send({ message:'Internal Server Error'});
        }
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { error } = validateAuthUser(req.body);
        if(error) res.status(400).send({ message: error.details[0].message });

        const { email, password } = req.body;
        const token = await authService.login(email, password);
        logger.info(`User logged in with email: ${email}`);
        res.send({ data: {
            token 
        }});
    } catch (err) {
        // Type guard to check if err is an instance of Error
        if (err instanceof Error) {
            logger.error(`Login error: ${err.message}`);
            res.status(400).send({ message:err.message});
        } else {
            logger.error('Unexpected error during login');
            res.status(500).send({ message:'Internal Server Error'});
        }
    }
};
