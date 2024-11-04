"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/participationRoutes.ts
const express_1 = require("express");
const participationController_1 = require("../controllers/participationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.authMiddleware, participationController_1.createParticipation);
router.get('/user/:id', authMiddleware_1.authMiddleware, participationController_1.getAllParticipationsByUserId);
router.get('/:id', authMiddleware_1.authMiddleware, participationController_1.getParticipationById);
router.put('/:id', authMiddleware_1.authMiddleware, participationController_1.updateParticipation);
router.delete('/:id', authMiddleware_1.authMiddleware, participationController_1.deleteParticipation);
exports.default = router;
