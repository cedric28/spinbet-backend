"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParticipation = void 0;
const joi_1 = __importDefault(require("joi"));
const validateParticipation = (data) => {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().min(2).max(50).required(),
        lastName: joi_1.default.string().min(2).max(50).required(),
        percentage: joi_1.default.number().integer().min(0).max(100).required(),
        userId: joi_1.default.number().integer().positive().required()
    });
    return schema.validate(data);
};
exports.validateParticipation = validateParticipation;
