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
exports.deleteParticipation = exports.updateParticipation = exports.getParticipationById = exports.getAllParticipationsByUserId = exports.createParticipation = void 0;
const participationService_1 = require("../services/participationService");
const participation_1 = require("../models/participation");
const logger_1 = __importDefault(require("../utils/logger"));
const participationService = new participationService_1.ParticipationService();
const createParticipation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, participation_1.validateParticipation)(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const { firstName, lastName, percentage, userId } = req.body;
        const existingParticipations = yield participationService.getAllParticipationsByUserId(userId);
        const totalPercentage = existingParticipations.reduce((sum, participation) => sum + participation.percentage, 0);
        // Validation: Check if the new total percentage equals 100
        const newTotalPercentage = totalPercentage + percentage;
        if (newTotalPercentage >= 100) {
            return res.status(400).send({ message: "Total percentage for all participations must equal 100." });
        }
        // If validations pass, create the participation
        const participation = yield participationService.createParticipation({
            firstName,
            lastName,
            percentage,
            userId,
        });
        logger_1.default.info(`Participation created with ID: ${participation.id}`);
        return res.status(201).send({
            message: "Successfully create a user",
            data: participation
        });
    }
    catch (err) {
        // Type guard to check if err is an instance of Error
        if (err instanceof Error) {
            logger_1.default.error(`Create Participation error: ${err.message}`);
            return res.status(400).send({ message: err.message });
        }
        else {
            logger_1.default.error('Unexpected error during participation creation');
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
});
exports.createParticipation = createParticipation;
const getAllParticipationsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id, 10);
        const participations = yield participationService.getAllParticipationsByUserId(userId);
        return res.send({
            message: "Successfully retrived a participations",
            data: participations
        });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`Get Participations error: ${err.message}`);
            return res.status(400).send({ message: err.message });
        }
        else {
            logger_1.default.error('Unexpected error during fetching participations');
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
});
exports.getAllParticipationsByUserId = getAllParticipationsByUserId;
const getParticipationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const participation = yield participationService.getParticipationById(req.params.id);
        if (!participation) {
            return res.status(404).send({ message: 'Participation not found.' }); // This line returns a response and does not need to return anything else.
        }
        return res.send({
            message: "Successfully retrived a participation",
            data: participation
        });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`Get Participation by ID error: ${err.message}`);
            return res.status(400).send({ message: err.message }); // Send the error message as a response
        }
        else {
            logger_1.default.error('Unexpected error during fetching participations');
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
});
exports.getParticipationById = getParticipationById;
const updateParticipation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, participation_1.validateParticipation)(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const { firstName, lastName, percentage, userId } = req.body;
        const updatedParticipation = yield participationService.updateParticipation(req.params.id, {
            firstName,
            lastName,
            percentage,
            userId
        });
        if (!updatedParticipation) {
            return res.status(404).send({ message: 'Participation not found.' });
        }
        return res.send({
            message: 'Successfully  update participation',
            data: updatedParticipation
        });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`Update Participation error: ${err.message}`);
            return res.status(400).send({ message: err.message });
        }
        else {
            logger_1.default.error('Unexpected error during participation update');
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
});
exports.updateParticipation = updateParticipation;
const deleteParticipation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield participationService.deleteParticipation(req.params.id);
        if (!deleted) {
            return res.status(404).send({ message: 'Participation not found.' });
        }
        ;
        return res.status(204).send({ message: "Successfully delete participation." });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`Delete Participation error: ${err.message}`);
            return res.status(400).send({ message: err.message });
        }
        else {
            logger_1.default.error('Unexpected error during participation deletion');
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
});
exports.deleteParticipation = deleteParticipation;
