import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { validateAuthUser, validateRegisterUser } from "../models/auth"
import logger from '../utils/logger';

const authService = new AuthService();

export const register = async (req: Request, res: Response): Promise<any>  => {
    try {
        const { error } = validateRegisterUser(req.body);
        if(error) return res.status(400).send({ message: error.details[0].message });

        const { name, email, password } = req.body;
        const user = await authService.register({ name, email, password });
        logger.info(`User registered with email: ${user.email}`);
        return res.status(201).send({
            message: "Successfully register user",
            data: user
        });
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === 'Email already exists') {
                logger.error(`Registration error: ${err.message}`);
                return res.status(409).send({ message:err.message }); // Conflict status for duplicate email
            } else {
                logger.error(`Registration error: ${err.message}`);
                return res.status(400).send({ message:err.message});
            }
        } else {
            logger.error('Unexpected error during registration');
            return res.status(500).send({ message:'Internal Server Error'});
        }
    }
};

export const login = async (req: Request, res: Response): Promise<any>  => {
    try {
        const { error } = validateAuthUser(req.body);
        if(error) return res.status(400).send({ message: error.details[0].message });

        const { email, password } = req.body;
        const token = await authService.login(email, password);
        logger.info(`User logged in with email: ${email}`);
        return res.send({ 
            data: {
                token 
            }
        });
    } catch (err) {
        // Type guard to check if err is an instance of Error
        if (err instanceof Error) {
            logger.error(`Login error: ${err.message}`);
            return res.status(400).send({ message:err.message});
        } else {
            logger.error('Unexpected error during login');
            return res.status(500).send({ message:'Internal Server Error'});
        }
    }
};
