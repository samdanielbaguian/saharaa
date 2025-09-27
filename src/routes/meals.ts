import { Router } from 'express';
import { createMeal, getMealsByRestaurant } from '../controllers/mealController';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();

// Ajouter un plat pour un restaurant (admin uniquement)
router.post('/', requireAuth, requireAdmin, createMeal);

// Récupérer les plats d'un restaurant donné
router.get('/restaurant/:restaurantId', getMealsByRestaurant);

export default router;