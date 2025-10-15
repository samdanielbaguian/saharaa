import { Router } from 'express';
import { getUserNotifications, markAsRead } from '../controllers/notificationController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Récupérer les notifications de l'utilisateur connecté
router.get('/', requireAuth, getUserNotifications);

// Marquer une notification comme lue
router.patch('/:notificationId/read', requireAuth, markAsRead);

export default router;