import { Request, Response } from 'express';
import { ParticipationService } from '../services/participationService';
import logger from '../utils/logger';

const participationService = new ParticipationService();

export const createParticipation = async (req: Request, res: Response): Promise<any> => {
    try {
        const { firstName, lastName, percentage, userId } = req.body;

        // Validation: Check if the percentage is less than or equal to 100
        if (percentage > 100) {
            return res.status(400).send("Percentage must be less than or equal to 100.");
        }

        // Fetch all participations for the userId to calculate the total percentage
        const existingParticipations = await participationService.getAllParticipations(userId);
        const totalPercentage = existingParticipations.reduce((sum, participation) => sum + participation.percentage, 0);

        // Validation: Check if the new total percentage equals 100
        const newTotalPercentage = totalPercentage + percentage;
        if (newTotalPercentage !== 100) {
            return res.status(400).send("Total percentage for all participations must equal 100.");
        }

        // If validations pass, create the participation
        const participation = await participationService.createParticipation({
            firstName,
            lastName,
            percentage,
            userId,
        });

        logger.info(`Participation created with ID: ${participation.id}`);
        return res.status(201).send(participation);
    } catch (err) {
        // Type guard to check if err is an instance of Error
        if (err instanceof Error) {
            logger.error(`Create Participation error: ${err.message}`);
            return res.status(400).send(err.message);
        } else {
            logger.error('Unexpected error during participation creation');
            return res.status(500).send('Internal Server Error');
        }
    }
};

export const getParticipations = async (req: Request, res: Response) : Promise<any> => {
    try {
        const userId = parseInt(req.params.id,10);
        const participations = await participationService.getAllParticipations(userId);
        return res.send(participations);
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`Get Participations error: ${err.message}`);
            return res.status(400).send(err.message);
        } else {
            logger.error('Unexpected error during fetching participations');
            return res.status(500).send('Internal Server Error');
        }
    }
};

export const getParticipationById = async (req: Request, res: Response): Promise<any> => {
    try {
        const participation = await participationService.getParticipationById(req.params.id);
        if (!participation) {
            return res.status(404).send('Participation not found.'); // This line returns a response and does not need to return anything else.
        }
        res.send(participation); // This also returns a response
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`Get Participation by ID error: ${err.message}`);
            return res.status(400).send(err.message); // Send the error message as a response
        } else {
            logger.error('Unexpected error during fetching participations');
            return res.status(500).send('Internal Server Error');
        }
    }
};

export const updateParticipation = async (req: Request, res: Response): Promise<any> => {
    try {
        const { firstName, lastName, percentage } = req.body;
        const updatedParticipation = await participationService.updateParticipation(req.params.id, {
            firstName,
            lastName,
            percentage,
        });
        if (!updatedParticipation) {
            return res.status(404).send('Participation not found.');
        }
        return res.send(updatedParticipation);
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`Update Participation error: ${err.message}`);
            return res.status(400).send(err.message);
        } else {
            logger.error('Unexpected error during participation update');
            return res.status(500).send('Internal Server Error');
        }
    }
};

export const deleteParticipation = async (req: Request, res: Response): Promise<any> => {
    try {
        const deleted = await participationService.deleteParticipation(req.params.id);
        if (!deleted) {
            return res.status(404).send('Participation not found.')
        };
        return res.status(204).send();
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`Delete Participation error: ${err.message}`);
            return res.status(400).send(err.message);
        } else {
            logger.error('Unexpected error during participation deletion');
            return res.status(500).send('Internal Server Error');
        }
    }
};
