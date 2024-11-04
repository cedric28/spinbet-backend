"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterUser = exports.validateAuthUser = void 0;
const joi_1 = __importDefault(require("joi"));
const validateAuthUser = (user) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).max(50).required()
    });
    return schema.validate(user);
};
exports.validateAuthUser = validateAuthUser;
const validateRegisterUser = (user) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(2).max(50).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).max(50).required()
    });
    return schema.validate(user);
};
exports.validateRegisterUser = validateRegisterUser;
