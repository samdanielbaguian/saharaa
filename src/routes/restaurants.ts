import { Router } from 'express';
import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from '../controllers/restaurantController';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();

// Créer un restaurant (admin uniquement)
router.post('/', requireAuth, requireAdmin, createRestaurant);

// Liste tous les restaurants
router.get('/', getRestaurants);

// Récupère un restaurant par son id
router.get('/:id', getRestaurantById);

// Met à jour un restaurant (admin uniquement)
router.put('/:id', requireAuth, requireAdmin, updateRestaurant);

// Supprime un restaurant (admin uniquement)
router.delete('/:id', requireAuth, requireAdmin, deleteRestaurant);

export default router;