import { Router } from 'express';
import { processPayment } from '../controllers/paymentController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Traiter le paiement d'une commande (utilisateur connecté)
router.post('/', requireAuth, processPayment);

export default router;