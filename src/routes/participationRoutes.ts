// src/routes/participationRoutes.ts
import { Router } from 'express';
import {
    createParticipation,
    getParticipationById,
    getAllParticipationsByUserId,
    updateParticipation,
    deleteParticipation,
} from '../controllers/participationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createParticipation);
router.get('/user/:id', authMiddleware, getAllParticipationsByUserId);
router.get('/:id', authMiddleware, getParticipationById);
router.put('/:id', authMiddleware, updateParticipation);
router.delete('/:id', authMiddleware, deleteParticipation);

export default router;
