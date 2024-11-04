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
exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const auth_1 = require("../models/auth");
const logger_1 = __importDefault(require("../utils/logger"));
const authService = new authService_1.AuthService();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, auth_1.validateRegisterUser)(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const { name, email, password } = req.body;
        const user = yield authService.register({ name, email, password });
        logger_1.default.info(`User registered with email: ${user.email}`);
        return res.status(201).send({
            message: "Successfully register user",
            data: user
        });
    }
    catch (err) {
        if (err instanceof Error) {
            if (err.message === 'Email already exists') {
                logger_1.default.error(`Registration error: ${err.message}`);
                return res.status(409).send({ message: err.message }); // Conflict status for duplicate email
            }
            else {
                logger_1.default.error(`Registration error: ${err.message}`);
                return res.status(400).send({ message: err.message });
            }
        }
        else {
            logger_1.default.error('Unexpected error during registration');
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, auth_1.validateAuthUser)(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const { email, password } = req.body;
        const token = yield authService.login(email, password);
        logger_1.default.info(`User logged in with email: ${email}`);
        return res.send({
            data: {
                token
            }
        });
    }
    catch (err) {
        // Type guard to check if err is an instance of Error
        if (err instanceof Error) {
            logger_1.default.error(`Login error: ${err.message}`);
            return res.status(400).send({ message: err.message });
        }
        else {
            logger_1.default.error('Unexpected error during login');
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
});
exports.login = login;
