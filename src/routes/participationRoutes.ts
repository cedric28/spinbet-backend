// src/routes/participationRoutes.ts
import { Router } from 'express';
import {
    createParticipation,
    getParticipations,
    getParticipationById,
    updateParticipation,
    deleteParticipation,
} from '../controllers/participationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createParticipation);
router.get('/', authMiddleware, getParticipations);
router.get('/:id', authMiddleware, getParticipationById);
router.put('/:id', authMiddleware, updateParticipation);
router.delete('/:id', authMiddleware, deleteParticipation);

export default router;
