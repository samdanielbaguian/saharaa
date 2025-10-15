import { Router } from 'express';
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
} from '../controllers/orderController';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();

// Créer une commande (utilisateur connecté)
router.post('/', requireAuth, createOrder);

// Récupérer les commandes de l'utilisateur connecté
router.get('/my-orders', requireAuth, getUserOrders);

// Mettre à jour le statut d'une commande (admin uniquement)
router.patch('/:id/status', requireAuth, requireAdmin, updateOrderStatus);

export default router;