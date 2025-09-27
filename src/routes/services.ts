import { Router } from 'express';
import { testEmail, testNotification } from '../controllers/servicesController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Endpoint pour tester l'envoi d'email
router.post('/test-email', requireAuth, testEmail);

// Endpoint pour tester l'envoi de notification
router.post('/test-notification', requireAuth, testNotification);

export default router;